/**
 * Javascript document : Elsist IOStatus
 * 
 * @programmer Gianluca Raftacco
 */
 
/**
 * Importazioni
 */

import { read_variables_file, try_json, jsdate_to_logsdate } from './sfw191a000';
import { menu_active, nav_burger } from './utils';
import notie from '../../node_modules/notie';
import ClipBoard from 'clipboard';

// Menu functions.

menu_active();
document.addEventListener('DOMContentLoaded', nav_burger() );

// ClipBoard JS init.

var clipboard = new ClipBoard('.copy-button');
clipboard.on('success', function(e) { e.clearSelection(); });

// Variabile url sito remoto.

var remote_error_url;

/**
 * Dichiarazione variabili per l'app
 */

var first_loop = true;
var semaforo = false;

/**
 * Lettura oggetti DOM
 */

var text_area = document.getElementById("logs-box");
var start_button = document.getElementById("start-button");
var clear_button = document.getElementById("clear-button");

start_button.addEventListener('click', function(){ loop(); } );
clear_button.addEventListener('click', function(){ text_area.innerHTML = ''; } );


/**
* Inizio esecuzione
*/
start_page();

/**
* Funzione start_page( page_data )
*/
async function start_page() {

	// Lettura variabili.

	remote_error_url = await read_variables_file( 'remote_error_url' );

	if ( remote_error_url == false ) {
		notie.alert( { type: 'error', stay: true, text: 'Error in variables.json file !', position: 'top' } );
		throw new Error("Error in variables.json file !");
	}

	// Start funzionamento.

	read_logs();
	loop();
}


/**
 * Funzione start_loop()
 * 
 * Funzione che inizia il loop di letture solo se ancora non iniziate
 */
function loop() {

	// Se il loop è gia attivo.

	if ( window._els_interval ) {
		clearInterval( window._els_interval ); window._els_interval = false;
		//start_button.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' style='height: 25px; fill:#ffffff;' viewBox='0 0 512 512'><title>Play</title><path d='M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/></svg>";
		start_button.classList.remove( 'is-success' );
		start_button.classList.add( 'has-background-grey-lighter' );
	} else {
		window._els_interval = setInterval(function(){ read_logs(); }, 2000);
		//start_button.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' style='height: 25px; fill:#ffffff;' viewBox='0 0 512 512'><title>Pause</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M176 96h16v320h-16zM320 96h16v320h-16z'/></svg>";
		start_button.classList.remove( 'has-background-grey-lighter' );
		start_button.classList.add( 'is-success' );
	}

}

/**
 * Funzione read_logs()
 * 
 * Funzione di lettura logs dal sistema.
 * 
 * Type: 0 warning, 1 Error, 2 Eventi
 * {"Logs":[{"Time":514558780235579394,"Type":163132354,"Code":374,"Descr":"Unit 'C' mounted ELS_FAT_32"},{"Time":514558823185252354,"Type":163132602,"Code":374,"Descr":"Unit 'C' check ok"},{"Time":21479131447296002,"Type":163117665,"Code":374,"Descr":"System power on"},{"Time":514558578372116482,"Type":163117665,"Code":374,"Descr":"Starting Op. System SFW198D03A"},{"Time":514563152512286721,"Type":163117668,"Code":374,"Descr":"Load error:4"},{"Time":514562937763921921,"Type":163117668,"Code":374,"Descr":"PLCLoad, ApplID:0x00000000 [4]"},{"Time":514558784530546690,"Type":163119777,"Code":374,"Descr":"Unit 'D' mounted ELS_FAT_32"},{"Time":514558827480219650,"Type":163121292,"Code":374,"Descr":"Unit 'D' check ok"},{"Time":514543095015014401,"Type":163121406,"Code":374,"Descr":"Wrong bootloader: error 101"},{"Time":514558793120481282,"Type":163121413,"Code":374,"Descr":"Unit 'F' mounted ELS_FAT_32"},{"Time":514558836070154242,"Type":163123921,"Code":374,"Descr":"Unit 'F' check ok"},{"Time":514550439409090561,"Type":163435689,"Code":374,"Descr":"Wrong ARG:Rnd"}]}
 */
function read_logs(){

	// Controllo semaforo.

	if ( semaforo ) return;
	semaforo = true;

	// Oggetto richiesta.

    const XHR = new XMLHttpRequest();

    let urlEncodedDataPairs = [];
    let urlEncodedData = "";

	// Corpo richiesta.
	
	urlEncodedDataPairs.push( encodeURIComponent( 'FCT' ) + '=' + encodeURIComponent( 'Syslog' ) );
	
	// Nella prima richiesta chiedo tutti i log, una volta eseguita questa chiedo solo i nuovi.

    if ( first_loop ) urlEncodedDataPairs.push( encodeURIComponent( 'GetNextLog' ) + '=' + encodeURIComponent( 0 ) );
    else urlEncodedDataPairs.push( encodeURIComponent( 'GetNextLog' ) + '=' + encodeURIComponent( 1 ) );
	first_loop = false;

	// XHR parameters.

	XHR.open( 'POST', '/SysCgi/DataMng.cgi' );	
	XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded;charset=utf-8' );

	// Log.

	console.log("Data send:");
	console.log(urlEncodedDataPairs);

	// Combine the pairs into a single string and replace all %-encoded spaces to the '+' character; matches the behaviour of browser form submissions.
	
    urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

	// Cosa faccio in caso di errore.
	
    XHR.addEventListener( 'error', function(event) {
		clearInterval( window._els_interval );
		notie.alert( { type: 'error', stay: true, text: 'Error in POST ! Please reload the page.', position: 'top' } );
		return;
	} );
	
	// Cosa faccio in caso di successo.

	XHR.addEventListener( 'load', function(event) {
		check_print_logs( XHR.readyState, XHR.status, XHR.responseText );
	} );

	// Finally, send our data.
	
    XHR.send( urlEncodedData );

}

/**
 * Funzione check_print_logs( readystate, status, response )
 * 
 * La funzione di controllo, stampa e formattazione dei log.
 *
 * @param int readystate intero che rappresenta il ready state della chiamata.
 * @param int status stato della risposta.
 * @param string response stringa di risposta.
 */
function check_print_logs( readystate, status, response ){

	// Controllo che la risposta sia JSON, se non lo è fermo e do errore.

	var response = try_json( response );
	if ( ! response ) {
		clearInterval( window._els_interval );
		notie.alert( { type: 'error', stay: true, text: 'Response is not JSON ! Please reload the page.', position: 'top' } );
		return;
	}

	// Se il codice di risposta è diverso da 4 allora non faccio nulla. Mentre se ho 4 e non ho 200 come codice di risposta errore.

	if ( 4 != readystate ) return;
	else if (4 != readystate && 200 != status){
		clearInterval( window._els_interval );
		notie.alert( { type: 'error', stay: true, text: 'Error in response ! Please reload the page.', position: 'top' } );
		return;
	}

	// Loop sui log ritornati.

	response.Logs.forEach( function (element, index) {

		// Formattazione Data,ora log.

		let log_datetime = new Date(0); // The 0 there is the key, which sets the date to the epoch
		log_datetime = jsdate_to_logsdate( element.Time );

		// Test stilizzazoone errori.
		// Type: 0 warning, 1 Error, 2 Eventi

		let log_class;
		let log_icon;
		switch ( element.Type ) {
			case 0:
				log_class = 'has-text-warning logs-warning';
				log_icon = '<svg xmlns="http://www.w3.org/2000/svg" with="15" height="15" viewBox="0 0 512 512"><title>Warning</title><path d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="50"/><path d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="50"/><path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z" fill="currentColor"/></svg>';
				break;
			case 1:
				log_class = 'has-text-danger logs-danger';
				log_icon = '<svg xmlns="http://www.w3.org/2000/svg" with="15" height="15" viewBox="0 0 512 512"><title>Close</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="50" d="M368 368L144 144M368 144L144 368"/></svg>';
				break;
			case 2:
				log_class = 'has-text-success logs-success';
				log_icon = '<svg xmlns="http://www.w3.org/2000/svg" with="15" height="15" viewBox="0 0 512 512"><title>Flag</title><path d="M80 464V68.14a8 8 0 014-6.9C91.81 56.66 112.92 48 160 48c64 0 145 48 192 48a199.53 199.53 0 0077.23-15.77 2 2 0 012.77 1.85v219.36a4 4 0 01-2.39 3.65C421.37 308.7 392.33 320 352 320c-48 0-128-32-192-32s-80 16-80 16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="50"/></svg>';
				break;
			default:
				log_class = 'has-text-dark';
				log_icon = '<svg xmlns="http://www.w3.org/2000/svg" with="15" height="15" viewBox="0 0 512 512"><title>Warning</title><path d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="50"/><path d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="50"/><path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z" fill="currentColor"/></svg>';
		}

		// Pulizia log vecchi.

		if ( text_area.childNodes.length >= 500 ) {
			for (var i = 0; i < 200; i++) {
				if (text_area.childNodes[i].tagName == "SPAN") text_area.childNodes[i].remove();        
			}
		}

		// Controllo se ho uno user program error.

		const regex_userprogramerror = /User program error:([0-9]+$)/g; // Espressione per capire se ho uno user program error.
		const regex_geterrornumber = /[^User program error:]*$/g; // Espressione regolare per leggere il numero.

		if ( element.Descr.match(regex_userprogramerror) ) {
			var usererrornumber = element.Descr.match(regex_geterrornumber);
			var svg = '<svg xmlns="http://www.w3.org/2000/svg" with="15" height="15" viewBox="0 0 512 512"><title>Open</title><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48M336 64h112v112M224 288L440 72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="50"/></svg>';
			var error_url = ' <a href="' + remote_error_url + usererrornumber[0] + '" target="_blank">' + svg + '</a></span>';
			var log_html  = '<span style="vertical-align:middle;" class="is-block ' + log_class + '">' + log_icon + ' ' + log_datetime + ' [' + element.Sfw + '][' + element.Code + '] ' + element.Descr + error_url + '</span>';
		} else {
			var log_html = '<span style="vertical-align:middle;" class="is-block ' + log_class + '">' + log_icon + ' ' + log_datetime + ' [' + element.Sfw + '][' + element.Code + '] ' + element.Descr + '</span>';
		}

		// Stampa logs

		if ( text_area.scrollTop + text_area.offsetHeight >= text_area.scrollHeight ) {
			text_area.innerHTML += log_html;
			text_area.scrollTop = text_area.scrollHeight;
		} else text_area.innerHTML += log_html;


	});

	semaforo = false;
}