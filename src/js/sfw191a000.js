/**
 * SFW191A020
 * 
 * Le seguenti funzioni gestiscono lo standard AJAX "Asynchronous Java and XML",
 * con esse viene gestito lo scambio dinamico di dati con le pagine web.
 *
 * La funzione "read_data" eseguita ciclicamente invia le richieste al
 * server eseguendo lo script "AJAXMng.php".
 *
 * La funzione "AJAXHandleRsp" viene eseguita ad ogni cambiamento di stato della
 * richiesta AJAX. Nella funzione si controlla lo stato per determinare se
 * operazione terminata e per gestire stringa di risposta ricevuta dal server.
 */

// Messaggio di benvenuto.

console.log("%c Welcome to SlimLine webpages ! ","color: #303030; font-family:monospace; background-color:#009933; font-size: 14px; font-weight:bold;");

import notie from 'notie';
// Inizializzazione variabili.

export var data_page = window.location.pathname.split('/')[2].split(".")[0] + '.htm';
var fct_address; // Funzione da eseguire per valorizzazione elementi DOM.
var semaforo; // Variabile semaforica.

/**
 * Funzione read_data(page_data, fct)
 * 
 * Questa funzione invia la richiesta AJAX al server. Viene richiesta la pagina
 * definita in "Page".
 *
 * @param string page_data pagina sulla quale inviare le richieste (.htm).
 * @param function fct nome della funzione da eseguire al callback.
 */
export function read_data( page_data, fct ) {
    
    // Oggetto richiesta

    const XHR = new XMLHttpRequest();
    fct_address = fct;

    // Test semaforo

    if (semaforo) return;
    semaforo = true;

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

        XHR.onreadystatechange = function () { check_function( XHR.readyState, XHR.responseText, false ); };
        XHR.send(null);
    }
}

/**
 * Funzione sendData( form_element, data_page )
 * 
 * Funzione di invio dati del form, questa funzione prende in input dove mandare il form,
 * ovvero la pagina valori (.htm) e l'oggetto dom del form. da questo oggetto,
 * la funzione stessa potrà accedere a tutti gli input del form e leggerne i valori per costruire il corpo del POST.
 */
export function send_data( form_element, data_page, fct ) {

    fct_address = fct;

    // Var data.
    var data = {};

    // Loop per tutti gli oggetti del form.
    
    var i;
    for (i = 0; i < form_element.length ;i++) {
      data[form_element.elements[i].name] = form_element.elements[i].value;
    }
    console.log("data_page:" + data_page);


    const XHR = new XMLHttpRequest();

    let urlEncodedData = "",
        urlEncodedDataPairs = [],
        name;

    // Turn the data object into an array of URL-encoded key/value pairs.
    for( name in data ) {
        urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( data[name] ) );
    }

    // Combine the pairs into a single string and replace all %-encoded spaces to 
    // the '+' character; matches the behaviour of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

    // Define what happens on successful data submission
    XHR.addEventListener( 'load', function(event) {
        check_function( XHR.readyState, XHR.responseText, true );
    } );

    // Define what happens in case of error
    XHR.addEventListener( 'error', function(event) {
        alert( 'Oops! Something went wrong.' );
    } );

    // Set up our request
    XHR.open( 'POST', data_page );

    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded;charset=utf-8' );

    // Finally, send our data.
    XHR.send( urlEncodedData );
}

/**
 * Funzione check_function()
 * 
 * Funzione che esegue controlli basilari sullo stato di risposta e semaforo.
 * In caso si possa procedere chiama la funzione di valorizzazione variabili definita nella pagina,
 * che è stata passata per indirizzo su "fct_address" passando ad essa il corpo di della risposta.
 */
function check_function( status, response, display_messages ) {

    // Se il codice di risposta è diverso da 4 allora non faccio nulla.

    if ( 4 != status ) return;

    // Controllo semaforo.

	semaforo = false;
	
	// Log

	console.log(response);

    // Controllo presenza di errori

    var response = JSON.parse( response );
    if( response.hasOwnProperty('result') && display_messages ){
        alert( response.result );
	}

	if ( display_messages ){
		// Salvataggio con successo
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Your setting has been saved',
			showConfirmButton: false,
			timer: 1000
		})
	}

    // Chiamo funzione.

    fct_address( response );
}