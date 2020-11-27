/**
 * Javascript document : Elsist IOStatus
 * 
 * @programmer Gianluca Raftacco
 */
 
/**
 * Importazioni
 */

import { try_json } from './sfw191a000';
import { menu_active, nav_burger } from './utils';
import notie from '../../node_modules/notie';


// Menu functions.

menu_active();
document.addEventListener('DOMContentLoaded', nav_burger() );

/**
 * Dichiarazione variabili per l'app
 */

var first_loop = true;
var semaforo = false;

/**
 * Inizio funzioni logs
 */

read_logs();
window._els_interval = setInterval(function(){ read_logs(); }, 1000);

/**
 * Funzione inizio logs
 * 
 * Type: 0 warning, 1 Error, 2 Eventi
 * 
 * {"Logs":[{"Time":514558780235579394,"Type":163132354,"Code":374,"Descr":"Unit 'C' mounted ELS_FAT_32"},{"Time":514558823185252354,"Type":163132602,"Code":374,"Descr":"Unit 'C' check ok"},{"Time":21479131447296002,"Type":163117665,"Code":374,"Descr":"System power on"},{"Time":514558578372116482,"Type":163117665,"Code":374,"Descr":"Starting Op. System SFW198D03A"},{"Time":514563152512286721,"Type":163117668,"Code":374,"Descr":"Load error:4"},{"Time":514562937763921921,"Type":163117668,"Code":374,"Descr":"PLCLoad, ApplID:0x00000000 [4]"},{"Time":514558784530546690,"Type":163119777,"Code":374,"Descr":"Unit 'D' mounted ELS_FAT_32"},{"Time":514558827480219650,"Type":163121292,"Code":374,"Descr":"Unit 'D' check ok"},{"Time":514543095015014401,"Type":163121406,"Code":374,"Descr":"Wrong bootloader: error 101"},{"Time":514558793120481282,"Type":163121413,"Code":374,"Descr":"Unit 'F' mounted ELS_FAT_32"},{"Time":514558836070154242,"Type":163123921,"Code":374,"Descr":"Unit 'F' check ok"},{"Time":514550439409090561,"Type":163435689,"Code":374,"Descr":"Wrong ARG:Rnd"}]}
 */

function read_logs(){

	// Var data.

    var logs = {};

	// Oggetto richiesta.

    const XHR = new XMLHttpRequest();

    let urlEncodedDataPairs = [];
    let urlEncodedData = "";

	// Corpo richiesta.
	
	urlEncodedDataPairs.push( encodeURIComponent( 'FCT' ) + '=' + encodeURIComponent( 'Syslog' ) );
	
	// Nella prima richiesta chiedo tutti i log, una volta eseguita questa chiedo solo i nuovi.

    if ( first_loop ) urlEncodedDataPairs.push( encodeURIComponent( 'GetNextLog' ) + '=' + encodeURIComponent( 0 ) );
    else urlEncodedDataPairs.push( encodeURIComponent( 'GetNextLog' ) + '=' + encodeURIComponent( 1 ) );

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


function check_print_logs( readystate, status, response ){

	// Leggo elemento dom.

	var text_area = document.getElementById("logs-box");

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

	response.Logs.forEach( function (element, index) {
		if ( text_area.scrollTop + text_area.offsetHeight >= text_area.scrollHeight ) {

			// Test stilizzazoone errori.
		
			text_area.innerHTML += '<span>[' + element.Code + '] ' + element.Descr + '</span></br>';
			text_area.scrollTop = text_area.scrollHeight;

		} else text_area.innerHTML += '[' + element.Code + '] ' + element.Descr + '</br>';
	});

}