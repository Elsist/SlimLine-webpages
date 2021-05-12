/**
 * Javascript document : Elsist IOStatus
 * 
 * @programmer Gianluca Raftacco
 */
 
/**
 * Importazioni
 */

import { menu_active, nav_burger } from './utils';
import { read_variables_file, try_json } from './sfw191a000';
import notie from '../../node_modules/notie';

// Menu functions.

menu_active();
document.addEventListener('DOMContentLoaded', nav_burger() );

// Start log.

console.log("%cElsist SRL - Hello ! You can debug comunication by setting 'debug_mode=true;'", "background: #009933; color: #fff; padding: 5px 5px; font-weight: bold;");

/**
* Dichiarazione variabili di funzionamento logico
*/

// Array con dati schede

var cards = [];

// Variabile con IO schede letta da dati configurazione.

var card_ios;

// VVariabili SVG.

const svgns = "http://www.w3.org/2000/svg";
const svg = document.getElementById("io_map");

/**
* Dichiarazione variabili per l'app
*/

var semaforo = false;

// Array con oggetti grafici schede

var cards_draw = [];

// Array con oggetti grafici sistema in stop

var stop_draw = null;

/**
* Dichiarazione stili grafici e di layout
*/

// Stili dei leds

const ledsize = 20;
const led_on_color = '#ff0000';
const led_off_color = '#6d6d6d';
const led_v_space = 2;
const led_o_space = 2;

// Stili del box della scheda 

const card_box_color = '#cdd1d3';
const card_box_padding = 10;
const card_spacing = 80;

/**
* Inizio esecuzione
*/
start_page();

/**
* Funzione start_page( page_data )
*/
async function start_page() {

	// Lettura variabili.

	card_ios = await read_variables_file( 'cards' );

	if ( card_ios == false ) {
		notie.alert( { type: 'error', stay: true, text: 'Error in variables.json file !', position: 'top' } );
		throw new Error("Error in variables.json file !");
	}

	// Start funzionamento.

	read_infos("IOStatus.htm");
	window._els_interval = setInterval(function(){ read_infos( "IOStatus.htm"); }, 2000);

}
/**
* Funzione read_infos( page_data )
* 
* Funzione che comunica in lettura con il PLC, chiama la system_update ogni lettura con successo.
* 
* @param string page_data 
*/
function read_infos( page_data ) {

	// Variabile semaforica.

	if ( semaforo == true ) return;

	semaforo = true;
	
	// Oggetto richiesta

	const XHR = new XMLHttpRequest();

	/**
	* Creo variabile random per generare ad ogni richiesta un valore diverso in
	* modo da evitare che il browser avendo sempre la stessa richiesta usi la
	* cache e non la invii. Alternativa a questo è di utilizzare il metodo POST
	* che non viene mai memorizzato in cache.
	*/

	//var Rnd=Math.random();

	// Invio richiesta allo script php su server di gestione. Il nome metodo "GET" in maiuscolo, alcuni browser sono case sensitive.

	if (XHR != null) {
		//XHR.open('GET', page_data+'?Rnd='+escape(Rnd), true);
		XHR.open('GET', page_data, true);
		XHR.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

		// Definisco funzione di gestione risposta ed invio richiesta. Nel send occorre sempre specificare "null".

		XHR.onreadystatechange = function () { system_update( XHR.readyState, XHR.responseText ); };
		XHR.send(null);
	}
}

/**
* Funzione system_update( status, response )
* 
* Funzione di aggiornamento struttura dati del sistema.
* Chiamerà la draw_card o update_card a seconda in di in che punto dell'esecuzione mi trovo.
* 
* @param int status stato della risposta.
* @param string response stringa di risposta. 
*/
function system_update( status, response ) {

	// Test iniziali

	if ( 4 != status ) {
		return;
	}
	
	// Variabile semaforica.

	semaforo = false;

	var response = try_json( response );
	if ( !response ) {
		clearInterval( window._els_interval );
		notie.alert( { type: 'error', stay: true, text: 'Response is not JSON ! Please reload the page.', position: 'top' } );
		return;
	}

	// Log iniziale

	console.log( response );

	// Se il plc è fermo mi metto nello stato di attesa.

	if ( response.OSID_PLC_STATUS == 0 ) {
		waiting_windows();
		return;
	}
	
	/**
	* {
	* "OSID_PLC_STATUS" : 1,
	* "OSID_PLC_NAME_ALL" : ["","PCB124B000","","","","","","","","","","","","","","","MPS054A110"],
	* "OSID_PLC_DO_ALL" : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OSID_PLC_DI_ALL" : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	* "WEBID_ERROR" : "0"
	* }
	*/
	
	var i = 0;

	response.OSID_PLC_NAME_ALL.forEach( function (element, index) {

		if ( element == "" ) return;

		cards[ i ] = {};
		cards[ i ].code = element;
		cards[ i ].do = response.OSID_PLC_DO_ALL[ index ];
		cards[ i ].di = response.OSID_PLC_DI_ALL[ index ];
		
		cards[ i ].address = index.toString().toUpperCase().padStart(2, 0); // Indirizzo in decimale.

		// Controllo tipo scheda in tabella

		cards[ i ].max_di = 32;
		cards[ i ].max_do = 32;

		for (let e = 0; e < card_ios.length; e++) {
			if( cards[ i ].code.match(card_ios[e].regex) ){
				cards[ i ].max_di = card_ios[e].input;
				cards[ i ].max_do = card_ios[e].output;
			}
		}

		i ++;
	});

	// Sposto la CPU in prima posisione nell'array.

	cards.splice(0, 0, cards.pop());
	cards[ 0 ].address = "CPU";

	// Disegno il sistema.

	if ( Object.keys(cards_draw).length == 0 ) {
		for ( var key in cards ) {
			draw_card( cards[ key ] );
		}
	}
	else {
		for ( var key in cards ) {
			update_card( cards[ key ] );
		}
	}

}

/**
* Funzione di visualizzazione waiting
*
* Questa funzione rimuove tutte le schede se disegnate 
* e se non ancora disegnato presenta gli oggetti di attesa.
*/
function waiting_windows(){

	// Controllo se ho già disegnato la voce di stop. Se si esco.

	if ( cards_draw.lenght == 0 ) return;
	
	svg.innerHTML = '';
	cards_draw = []; // Svuoto array

	// Disegno informazioni di sistema stoppato

	var card_address = document.createElementNS(svgns, "text");
	card_address.setAttribute("x", 0);
	card_address.setAttribute("y", 0 );
	card_address.setAttribute("style", 'font-size: 16px; font-weight: bold;');
	card_address.textContent = 'SYSTEM IS NOT RUNNING';
	svg.appendChild(card_address);
	
}

/**
* Funzione di aggiornamento led schede
*
* Questa funzione aggiornerà i led delle schede già disegnate a video cancellando i led e ridisegnandoli
* del colore corretto.
* Questa funzione deve essere chiamata solo con schedere già disegnate.
* 
* @param object card_obj oggetto scheda connessa. card_name (nome scheda), input (valore degli input), output(valore degli output).
*/
function update_card( card_obj ) {
	
	/* Aggiunta leds Inputs */

	for (var i = 0; i < card_obj.max_di; i++) {
		
		var led = document.getElementById(card_obj.address + '_inputled_' + i);

		// Calcolo stato

		if ( (card_obj.di&Math.pow(2, i)) != 0 ) led.setAttribute("fill", led_on_color);
		else led.setAttribute("fill", led_off_color );

	}

	/* Aggiunta leds Outputs */

	for (var i = 0; i < card_obj.max_do; i++) {
		
		var led = document.getElementById(card_obj.address + '_outputled_' + i);

		// Calcolo stato

		if ( (card_obj.di&Math.pow(2, i)) != 0 ) led.setAttribute("fill", led_on_color);
		else led.setAttribute("fill", led_off_color );
	}
	
}

/**
* Funzione di disegno della scheda
*
* Questa funzione disegnerà a video la scheda passata per nome.
* Il numero di input e output della scheda verrà letto dalla tabella con riferimento il codice passato.
* 
* @param obj card_obj oggetto alla scheda connessa. (nome scheda), input (valore degli input), output(valore degli output)
*/
function draw_card( card_obj ) {

	var group = document.createElementNS("http://www.w3.org/2000/svg","g");

	// Rimuovo grafiche di stato in stop

	if ( stop_draw != null ){
		stop_draw.destroy();
		stop_draw = null;
	}

	// Calcolo dimensioni e spazi

	var address_v_offset = card_box_padding*2;
	var code_v_offset = 15;
	var led_v_offset = 15;
	var heading_v_offset = 15;

	var card_o_offset = Object.keys(cards_draw).length * card_spacing;

	var card_box_width = card_box_padding*2 + (ledsize*2) + (led_o_space);

	// La altezza massima è calcolata sul massimo numero di input o output più gli altri elementi! [Math.max(card_obj.max_di, card_obj.max_do)]

	var card_box_height = ( (ledsize+led_v_space)*Math.max(card_obj.max_di, card_obj.max_do) ) + address_v_offset + code_v_offset + heading_v_offset + led_v_offset + card_box_padding;

	// Disegno del box della scheda

	var cardbox = document.createElementNS(svgns, "rect");
	cardbox.setAttribute("x", card_o_offset);
	cardbox.setAttribute("y", "0");
	cardbox.setAttribute("width", card_box_width);
	cardbox.setAttribute("height", card_box_height);
	cardbox.setAttribute("fill", card_box_color);
	group.appendChild(cardbox);

	cards_draw.push(cardbox);

	// Indirizzo scheda

	var card_address = document.createElementNS(svgns, "text");
	card_address.setAttribute("x", card_o_offset + card_box_width / 2);
	card_address.setAttribute("y", address_v_offset );
	card_address.setAttribute("dominant-baseline", "central");
	card_address.setAttribute("text-anchor", 'middle');
	card_address.setAttribute("style", 'font-size: 10px; font-weight: bold;');
	card_address.textContent = card_obj.address;
	group.appendChild(card_address);

	// Codice scheda

	var card_code = document.createElementNS(svgns, "text");
	card_code.setAttribute("x", card_o_offset + card_box_width / 2);
	card_code.setAttribute("y", address_v_offset + code_v_offset);
	card_code.setAttribute("dominant-baseline", "central");
	card_code.setAttribute("text-anchor", 'middle');
	card_code.setAttribute("style", 'font-size: 10px;');
	card_code.textContent = card_obj.code;
	group.appendChild(card_code);

	// Scritta "I" input

	var heading_i = document.createElementNS(svgns, "text");
	heading_i.setAttribute("x", 0 + ledsize/2 +(card_box_padding) + card_o_offset);
	heading_i.setAttribute("y", (address_v_offset + code_v_offset) + heading_v_offset);
	heading_i.setAttribute("dominant-baseline", "central");
	heading_i.setAttribute("text-anchor", 'middle');
	heading_i.setAttribute("style", 'font-size: 10px;');
	heading_i.textContent = 'I';
	group.appendChild(heading_i);

	// Scritta "O" output

	var heading_o = document.createElementNS(svgns, "text");
	heading_o.setAttribute("x", ( 0 + ledsize/2 +(card_box_padding) + card_o_offset ) + led_o_space + ledsize);
	heading_o.setAttribute("y", (address_v_offset + code_v_offset) + heading_v_offset);
	heading_o.setAttribute("dominant-baseline", "central");
	heading_o.setAttribute("text-anchor", 'middle');
	heading_o.setAttribute("style", 'font-size: 10px;');
	heading_o.textContent = 'O';
	group.appendChild(heading_o);
	
	// Led degli input

	var start_y = (address_v_offset + code_v_offset) + heading_v_offset;

	for (var i = 0, y = start_y + led_v_offset; i < card_obj.max_di; i++, y = y + 20 + led_v_space) {
		
		// Disegno led

		var input_led = document.createElementNS(svgns, "rect");
		input_led.setAttribute("id", card_obj.address + '_inputled_' + i);
		input_led.setAttribute("x", (card_box_padding) + card_o_offset );
		input_led.setAttribute("y", y);
		input_led.setAttribute("width", ledsize);
		input_led.setAttribute("height", ledsize);
		if ( (card_obj.di&Math.pow(2, i)) != 0 ) input_led.setAttribute("fill", led_on_color);
		else input_led.setAttribute("fill", led_off_color );
		group.appendChild(input_led);

		// Aggiunta del numero sul led
		
		var text = document.createElementNS(svgns, "text");
		text.setAttribute("x", (card_box_padding) + card_o_offset + ledsize/2);
		text.setAttribute("y", y + ledsize/2);
		text.setAttribute("dominant-baseline", "central");
		text.setAttribute("text-anchor", 'middle');
		text.setAttribute("style", 'font-size: 10px;');
		text.textContent = i;
		group.appendChild(text);
	}

	/* Aggiunta leds Outputs */

	for (var i = 0, y = start_y + led_v_offset; i < card_obj.max_do; i++, y = y +20 + led_v_space) {
	
		// Disegno led

		var output_led = document.createElementNS(svgns, "rect");
		output_led.setAttribute("id", card_obj.address + '_outputled_' + i);
		output_led.setAttribute("x", ledsize + led_o_space + (card_box_padding) + card_o_offset );
		output_led.setAttribute("y", y);
		output_led.setAttribute("width", ledsize);
		output_led.setAttribute("height", ledsize);
		if ( (card_obj.di&Math.pow(2, i)) != 0 ) output_led.setAttribute("fill", led_on_color);
		else output_led.setAttribute("fill", led_off_color );
		group.appendChild(output_led);

		// Aggiunta del numero sul led
		
		var text = document.createElementNS(svgns, "text");
		text.setAttribute("x", ledsize + led_o_space + (card_box_padding) + card_o_offset + ledsize/2);
		text.setAttribute("y", y + ledsize/2);
		text.setAttribute("dominant-baseline", "central");
		text.setAttribute("text-anchor", 'middle');
		text.setAttribute("style", 'font-size: 10px;');
		text.textContent = i;
		group.appendChild(text);

	}
	svg.appendChild(group);
}
