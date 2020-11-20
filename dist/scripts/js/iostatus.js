/**
 * Javascript document : Elsist IOStatus
 * 
 * @programmer Gianluca Raftacco
 */

console.log("%cElsist SRL - Hello ! You can debug comunication by setting 'debug_mode=true;'", "background: #009933; color: #fff; padding: 5px 5px; font-weight: bold;");

/**
 * Dichiarazione variabili di funzionamento logico
 */

// Array con dati schede

var cards = [];

/**
 * Dichiarazione variabili per l'app
 */

// Array con oggetti grafici schede

var cards_draw = [];

// Array con oggetti grafici sistema in stop

var stop_draw = null;

// Dichiarazione variabili di Pixi

let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}
PIXI.utils.sayHello(type)

const app = new PIXI.Application({
	transparent: true,
	height: 800,
	width: 1500,
});

document.getElementById("e-pixi").appendChild(app.view);

/**
 * Dichiarazione stili grafici e di layout
 */

// Stili dei leds

const ledsize = 20;
const led_on_color = '0xff0000';
const led_off_color = '0x6d6d6d';
const led_v_space = 2;
const led_o_space = 2;

const led_text_style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: '#fff', // gradient
    wordWrapWidth: 440,
});

// Stili del box della scheda 

const card_box_color = '0xcdd1d3';
const card_box_padding = 20;
const card_spacing = 80;

// Stili di intestazione indirizzo scheda

const address_text_style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: '#000', // gradient
    wordWrapWidth: 440,
});

// Stili di intestazione Codice scheda

const code_text_style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: '#000', // gradient
    wordWrapWidth: 440,
});

// Stili di intestazione IO

const heading_text_style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: '#000', // gradient
    wordWrapWidth: 440,
});

// Stili testo di stop

const stop_text_style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: '#898989', // gradient
    wordWrapWidth: 440,
});

/**
 * Dichiarazione schede
 */

var card_ios =[	{Name:"MPS054****", Regex: "MPS054([A-Z0-9]{4})", Input:2, Output:2},
				{Name:"MPS055****", Regex: "MPS055([A-Z0-9]{4})", Input:0, Output:0},
				{Name:"PCB122****", Regex: "PCB122([A-Z0-9]{4})", Input:12, Output:8},
				{Name:"PCB124*000", Regex: "PCB124([A-Z]{1})000", Input:16, Output:16},
				{Name:"PCB124*100", Regex: "PCB124([A-Z]{1})100", Input:16, Output:16},
				{Name:"PCB124*200", Regex: "PCB124([A-Z]{1})200", Input:16, Output:24},
				{Name:"PCB124*300", Regex: "PCB124([A-Z]{1})300", Input:24, Output:8},
				{Name:"PCB124*400", Regex: "PCB124([A-Z]{1})400", Input:32, Output:8},
				{Name:"PCB124*500", Regex: "PCB124([A-Z]{1})500", Input:24, Output:24},
				{Name:"PCB124*600", Regex: "PCB124([A-Z]{1})600", Input:32, Output:16},
				{Name:"PCB126****", Regex: "PCB126([A-Z0-9]{4})", Input:0, Output:0},
			 	{Name:"PCB129****", Regex: "PCB129([A-Z0-9]{4})", Input:16, Output:8},			 
];


/**
 * Inizio esecuzione
 */

// Imposto l'interval sulla funzione che leggerà gli io delle schede, la funzione viese eseguita solo se il sistema è stato composto e non è occupato

// var system_clock = setInterval( function(){ if (in_socket == false) system_loop(); }, 1000);

// Loop interno di pixi

app.ticker.add(() => {
});


read_infos( "IOStatus.htm" , true );



function read_infos( page_data, draw_cards ) {
    
    // Oggetto richiesta

    const XHR = new XMLHttpRequest();

    /**
     * Creo variabile random per generare ad ogni richiesta un valore diverso in
     * modo da evitare che il browser avendo sempre la stessa richiesta usi la
     * cache e non la invii. Alternativa a questo è di utilizzare il metodo POST
     * che non viene mai memorizzato in cache.
    */

    var Rnd=Math.random();

    // Invio richiesta allo script php su server di gestione. Il nome metodo "GET" in maiuscolo, alcuni browser sono case sensitive.

    if (XHR != null) {
        XHR.open('GET', page_data+'?Rnd='+escape(Rnd), true);
        XHR.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

        // Definisco funzione di gestione risposta ed invio richiesta. Nel send occorre sempre specificare "null".

        XHR.onreadystatechange = function () { system_update( XHR.readyState, XHR.responseText, draw_cards ); };
        XHR.send(null);
    }
}


function system_update( status, response, draw_cards ) {

	// Test iniziali

    if ( 4 != status ) return;

	var response = try_json( response );
	if (!response) location.reload();

	// Log iniziale

	console.log( response );

	/**
	 * {
	 * "OSID_PLC_STATUS" : 1,
	 * "OSID_PLC_NAME_ALL" : ["","PCB124B000","","","","","","","","","","","","","","","MPS054A110"],
	 * "OSID_PLC_DO_ALL" : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OSID_PLC_DI_ALL" : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 * "WEBID_ERROR" : "0"
	 * }
	 */

	response.OSID_PLC_NAME_ALL.forEach( function (element, index) {

		if ( element == "" ) return;

		cards[ element ] = {};
		cards[ element ].code = element;
		cards[ element ].di = response.OSID_PLC_DO_ALL[ index ];
		cards[ element ].do = response.OSID_PLC_DI_ALL[ index ];
		cards[ element ].address = "16#" + index.toString().padStart(2, 0);


		// Controllo tipo scheda in tabella

		cards[ element ].max_di = 32;
		cards[ element ].max_do = 32;

		for (var i = 0; i < card_ios.length; i++) {
			if( cards[ element ].code.match(card_ios[i].Regex) ){
				cards[ element ].max_di = card_ios[i].Input;
				cards[ element ].max_do = card_ios[i].Output;
			}
		}

		if ( draw_cards ) draw_card( cards[ element ] );

	});

	console.log( cards );	
}


function system_loop(){


	for (var key in cards) {
		var card_name = key.split("_").pop();
		var_name = "OSID_PLC_DI_"+card_name;
		dialog_question.AJAXGet[var_name]=[] ;
		dialog_question.AJAXGet[var_name].push("val");
	}
	
	for (var key in cards) {
		var card_name = key.split("_").pop();
		var_name = "OSID_PLC_DO_"+card_name;
		dialog_question.AJAXGet[var_name]=[] ;
		dialog_question.AJAXGet[var_name].push("val");
	}

	
	try{
		
		// Attendo che il PLC mi risponda alla prima domanda ovvero quali moduli ha collegati a lui

		
		// Se il sistema è ready allora posso continuare tutto

		if ( dialog_response.AJAXGet["OSID_PLC_STATUS"].hasOwnProperty("val") && dialog_response.AJAXGet["OSID_PLC_STATUS"].val == 1 ){
			
			// Il sistema prima non era pronto ma ora lo è , 

			if ( is_ready == false ){
				is_ready = true;
				in_socket = false;
				system_composition();
				return;
			}
		}

		// Se il sistema non è pronto chiamo la waiting_windows() e esco dalla funzione

		else{
			is_ready = false;
			in_socket = false;
			waiting_windows();
			return;
		}

		// Rimuovo lo status dalla risposta

		delete dialog_response.AJAXGet["OSID_PLC_STATUS"];

		for (var Key in dialog_response.AJAXGet) 
		{
			if ( dialog_response.AJAXGet[Key].hasOwnProperty("val") ){
				var card_name = Key.split("_").pop();
				if ( Key.includes("OSID_PLC_DI_") )	cards[ card_name ].di = dialog_response.AJAXGet[Key].val;
				if ( Key.includes("OSID_PLC_DO_") )	cards[ card_name ].do = dialog_response.AJAXGet[Key].val;
			}
		}
		
		for (var arrayIndex in cards) {
  			update_card(cards[arrayIndex]);
		}
		
	}
	
	catch(err){
		console.log("Promise broken: "+err.message);
	}

	in_socket = false;
}


function try_json( json_string ) {
    try {
        var o = JSON.parse(json_string);
        if (o && typeof o === "object") { return o; }
    }
    catch (e) { }
    return false;
};





/**
 * Funzione di visualizzazione waiting
 *
 * Questa funzione aggiornerà rimuove tutte le schede se disegnate 
 * e se non ancora disegnato presenta gli oggetti di attesa.
 */

function waiting_windows(){

	console.log("%cExtra Large Yellow Text with Red Background", "background: red; color: yellow; font-size: x-large");	// Stampa per debug

	for ( var arrayIndex in cards_draw ) {
		cards_draw[arrayIndex].destroy();
		system_composed = false; // Il sistema non è piu composto
	}
	
	// Svuoto array

	cards_draw = [];

	// Disegno informazioni di sistema stoppato

	if (stop_draw == null){
		stop_draw = new PIXI.Text("System is not RUNNING", stop_text_style);
		stop_draw.anchor.set(0.0);
		stop_draw.position = {x: 0, y: 0};
		app.stage.addChild(stop_draw);
	}

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

	if(debug_mode) console.log("update_card(card_obj) / Aggiorno tutte le schede a video !"); // Stampa per debug
	 
	/* Aggiunta leds Inputs */

	for (var i = 0; i < card_obj.max_di; i++) {
		
		// Leggo vecchia posizione
		
		old_position_x = cards_draw[card_obj.name].getChildByName("input_led_"+i).position.x;
		old_position_y = cards_draw[card_obj.name].getChildByName("input_led_"+i).position.y;
		
		// Rimuovo il led
		
		cards_draw[card_obj.name].removeChild(cards_draw[card_obj.name].getChildByName("input_led_"+i));
		
		// Nuovo oggetto led

		var input_led = new PIXI.Graphics();
		input_led.name = "input_led_"+i;

		// Calcolo stato

		if ( (card_obj.di&Math.pow(2, i)) != 0 ) input_led.beginFill(led_on_color);
		else input_led.beginFill(led_off_color);	
		
		// Disegno nuovo led

		input_led.drawRect(0, 0, ledsize, ledsize);
		input_led.endFill();
		input_led.position = {x: old_position_x, y: old_position_y};
		cards_draw[card_obj.name].addChild(input_led);

	}

	/* Aggiunta leds Outputs */

	for (var i = 0; i < card_obj.max_do; i++) {
		
		// Leggo vecchia posizione

		old_position_x = cards_draw[card_obj.name].getChildByName("output_led_"+i).position.x;
		old_position_y = cards_draw[card_obj.name].getChildByName("output_led_"+i).position.y;

		// Rimuovo il led

		cards_draw[card_obj.name].removeChild(cards_draw[card_obj.name].getChildByName("output_led_"+i));

		// Nuovo oggetto led

		var output_led = new PIXI.Graphics();
		output_led.name = "output_led_"+i;

		// Calcolo stato

		if ( (card_obj.do&Math.pow(2, i)) != 0 ) output_led.beginFill(led_on_color);
		else output_led.beginFill(led_off_color);	

		// Disegno nuovo led

		output_led.drawRect(0, 0, ledsize, ledsize);
		output_led.endFill();
		output_led.position = {x: old_position_x, y: old_position_y};
		cards_draw[card_obj.name].addChild(output_led);
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

	// Rimuovo grafiche di stato in stop

	if (stop_draw != null){
		stop_draw.destroy();
		stop_draw = null;
	}

	// Calcolo dimensioni e spazi

	var address_v_offset = 10;
	var code_v_offset = 15;
	var led_v_offset = 15;
	var heading_v_offset = 15;

	var card_o_offset = Object.keys(cards_draw).length * card_spacing;

	var card_box_width = card_box_padding + (ledsize*2) + (led_o_space*2);

	// La altezza massima è calcolata sul massimo numero di input o output più gli altri elementi! [Math.max(card_obj.max_di, card_obj.max_do)]
	var card_box_height = ( (ledsize+led_v_space)*Math.max(card_obj.max_di, card_obj.max_do) ) + address_text_style.fontSize  + code_text_style.fontSize + heading_text_style.fontSize + card_box_padding;

	// Imposto il nome della variabile come il nome della CPU

	cards_draw[card_obj.name] = new PIXI.Container();
	cards_draw[card_obj.name].sortableChildren = true;
	app.stage.addChild( cards_draw[card_obj.name] );

	// Disegno del box della scheda

	var card_box = new PIXI.Graphics();
	card_box.beginFill(card_box_color);
	card_box.drawRect(0, 0, card_box_width, card_box_height);
	card_box.endFill();
	card_box.position = {x: card_o_offset, y: 0};
	card_box.zIndex = -10;
	cards_draw[card_obj.name].addChild(card_box);	 

	// Indirizzo scheda

	var card_address = new PIXI.Text(card_obj.address, address_text_style);
	card_address.anchor.set(0.5);
	card_address.position = {x: card_box.position.x + card_box_width / 2, y: address_v_offset};
	cards_draw[card_obj.name].addChild(card_address)

	// Codice scheda

	var card_code = new PIXI.Text(card_obj.code, code_text_style);
	card_code.anchor.set(0.5);
	card_code.position = {x: card_box.position.x + card_box_width / 2, y: card_address.position.y + code_v_offset };
	cards_draw[card_obj.name].addChild(card_code)

	// Scritta "I" input

	var heading_i = new PIXI.Text("I", heading_text_style);
	heading_i.anchor.set(0.5);
	heading_i.position = {x: 0 + ledsize/2 +(card_box_padding/2) + card_o_offset, y: card_code.position.y + heading_v_offset};
	cards_draw[card_obj.name].addChild(heading_i)

	// Scritta "O" output

	var heading_o = new PIXI.Text("O", heading_text_style);
	heading_o.anchor.set(0.5);
	heading_o.position = {x: heading_i.position.x + led_o_space + ledsize, y: card_code.position.y + heading_v_offset};
	cards_draw[card_obj.name].addChild(heading_o)
	 
	// Led degli input

	for (var i = 0, y = heading_i.position.y + led_v_offset; i < card_obj.max_di; i++, y = y +20 + led_v_space) {

		// Oggetto led

		var input_led = new PIXI.Graphics();
		input_led.name = "input_led_"+i;

		// Calcolo stato

		if ( (card_obj.di&Math.pow(2, i)) != 0 ) input_led.beginFill(led_on_color);
		else input_led.beginFill(led_off_color);	
		
		// Disegno led

		input_led.drawRect(0, 0, ledsize, ledsize);
		input_led.endFill();
		input_led.position = {x: (card_box_padding/2) + card_o_offset, y: y};
		input_led.zIndex = 0;

		// Aggiunta del led alla scheda

		cards_draw[card_obj.name].addChild(input_led);

		// Aggiunta del numero sul led

		var text = new PIXI.Text(i, led_text_style);
		text.anchor.set(0.5);
		text.position = {x: input_led.position.x + ledsize/2, y: input_led.position.y + ledsize/2};
		text.zIndex = 10;
		cards_draw[card_obj.name].addChild(text);

	}

	/* Aggiunta leds Outputs */

	for (var i = 0, y = heading_i.position.y + led_v_offset; i < card_obj.max_do; i++, y = y +20 + led_v_space) {

		// Oggetto led

		var output_led = new PIXI.Graphics();
		output_led.name = "output_led_"+i;

		// Calcolo stato

		if ( (card_obj.do&Math.pow(2, i)) != 0 ) output_led.beginFill(led_on_color);
		else output_led.beginFill(led_off_color);	

		// Disegno led

		output_led.drawRect(0, 0, ledsize, ledsize);
		output_led.endFill();
		output_led.position = {x: ledsize + led_o_space + (card_box_padding/2) + card_o_offset, y: y};
		output_led.zIndex = 0;

		// Aggiunta del led alla scheda

		cards_draw[card_obj.name].addChild(output_led);

		// Aggiunta del numero sul led

		var text = new PIXI.Text(i, led_text_style);
		text.anchor.set(0.5);
		text.position = {x:output_led.position.x + ledsize/2, y: output_led.position.y + ledsize/2};
		text.zIndex = 10;
		cards_draw[card_obj.name].addChild(text);

	}	
}