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

// Importazioni

import notie from '../../node_modules/notie';

// Messaggio di benvenuto.

console.log("%c Welcome to SlimLine webpages ! ","color: #303030; font-family:monospace; background-color:#009933; font-size: 14px; font-weight:bold;");

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
 * @param string page_data pagina sulla quale inviare le richieste.
 * @param bool on_loop variabile true o false che mi indica se sto leggendo a tempo o no, da passare a check_function() che a sua volta lo passwrà a fct (serve per skippare gli input su refresh on interval).
 * @param function fct indirizzo della funzione da eseguire al callback.
 */
export function read_data( page_data, on_loop, fct ) {
    
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

	// XHR parametsrs.

	XHR.open('GET', page_data, true);
	XHR.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
	XHR.timeout = 2000;

	// Define what happens in case of error

	XHR.addEventListener( 'error', function(event) {
		clearInterval( window._els_interval );
		notie.alert( { type: 'error', stay: true, text: 'Error in get ! Please reload the page.', position: 'top' } );
		return;
	} );

	// Define what happens in case of error
	
	XHR.addEventListener( 'timeout', function(event) {
		clearInterval( window._els_interval );
		notie.alert( { type: 'error', stay: true, text: 'Timeout in get ! Please reload the page.', position: 'top' } );
		return;
	} );

	// Definisco funzione di gestione risposta ed invio richiesta. Nel send occorre sempre specificare "null".

	XHR.onreadystatechange = function () { check_function( XHR.readyState, XHR.status, XHR.responseText, false, on_loop ); };
	XHR.send(null);

}

/**
 * Funzione sendData( form_element, data_page )
 * 
 * Funzione di invio dati del form, questa funzione prende in input dove mandare il form,
 * ovvero la pagina valori (.htm) e l'oggetto dom del form. da questo oggetto,
 * la funzione stessa potrà accedere a tutti gli input del form e leggerne i valori per costruire il corpo del POST.
 * 
 * @param obj form_element oggetto connesso al dom html del form.
 * @param string data_page nome della pagina alla quale mandare il form
 * @param addr fct indirizzo della funzione di chiamare su callback delle risposta.
 */
export function send_data( form_element, data_page, fct ) {

    fct_address = fct;

	// Var data.

    var data = {};

    // Loop per tutti gli oggetti del form.
    
	var i;
	
    for ( i = 0; i < form_element.length ;i++ ) {

		if ( form_element.elements[i].type == "submit" ) continue; // Escludo il botton dalle variabili inviate nel form.

		// Se sull'input ho segnato data-plcforma="epoch" allora converto la data in epoch.
		else if ( form_element.elements[i].dataset.plcformat == "epoch" ) {
			data[form_element.elements[i].name] = Date.parse( form_element.elements[i].value ) / 1000;
		}
    	else data[form_element.elements[i].name] = form_element.elements[i].value;
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
	
	// XHR parameters.

	XHR.open( 'POST', data_page );	
	XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded;charset=utf-8' );

	// Log.

	console.log("Data send:");
	console.log(urlEncodedDataPairs);

	// Combine the pairs into a single string and replace all %-encoded spaces to the '+' character; matches the behaviour of browser form submissions.
	
    urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

	// Define what happens in case of error.
	
    XHR.addEventListener( 'error', function(event) {
		clearInterval( window._els_interval );
		notie.alert( { type: 'error', stay: true, text: 'Error in POST ! Please reload the page.', position: 'top' } );
		return;
	} );
	
	// Define what happens on successful data submission

	XHR.addEventListener( 'load', function(event) {
		check_function( XHR.readyState, XHR.status, XHR.responseText, true, false );
	} );

	// Finally, send our data.
	
    XHR.send( urlEncodedData );
}

/**
 * Funzione check_function()
 * 
 * Funzione che esegue controlli basilari sullo stato di risposta e semaforo.
 * In caso si possa procedere chiama la funzione di valorizzazione variabili definita nella pagina,
 * che è stata passata per indirizzo su "fct_address" passando ad essa il corpo di della risposta.
 * 
 * @param int readystate codice di risposta readystate.
 * @param int status codice di risposta status.
 * @param string response stringa di risposta.
 * @param bool display_messages varabile booleana che mi indica se stampare i messaggi o meno.
 * @param bool on_loop varabile booleana mi indica se chiamata a tempo (serve per skippare gli input su refresh on interval).
 */
function check_function( readystate, status, response, display_messages, on_loop ) {

    // Se il codice di risposta è diverso da 4 allora non faccio nulla.

	if ( 4 != readystate ) return;
	else if (4 != readystate && 200 != status){
		clearInterval( window._els_interval );
		notie.alert( { type: 'error', stay: true, text: 'Error in response ! Please reload the page.', position: 'top' } );
		return;
	}

    // Controllo semaforo.

	semaforo = false;

	var response = try_json( response );
	if (!response) {
		clearInterval( window._els_interval );
		notie.alert( { type: 'error', stay: true, text: 'Response is not JSON ! Please reload the page.', position: 'top' } );
		return;
	}

	// Log

	console.log("Data received:");
	console.log(response);

	// Controllo presenza di errori

    if( response.hasOwnProperty('WEBID_ERROR') && display_messages ){
		if ( response.WEBID_ERROR != 0 ) {
			notie.alert({ type: 'error', text: 'Error #' + response.WEBID_ERROR, position: 'top' });
		}
		else {
			notie.alert({ type: 'success', text: 'Setting saved.', position: 'top' });
		}
	}

    // Chiamo funzione.

    fct_address( response, on_loop );
}

/**
 * Funzione try_json( json_string )
 * 
 * Funzione che controlla la validità del json. Ritorna il JSON parsato se è valido,
 * false altrimenti.
 * 
 * @param string json_string string json da controllare.
 * 
 * @returns bool ritorna true se il testo passato è json, false altrimenti.
 */
export function try_json( json_string ) {
    try {
        var o = JSON.parse(json_string);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return false;
};

/**
 * Funzione format_mac( mac )
 * 
 * Funzione per formattare il mac address in hex
 * 
 * @param string mac stringa contente il mac address.
 *
 * @returns string mac stringa formattata corretta del mac.
 */

export function format_mac( mac ){

	/**
	 * Creo un array di byte arrivandomi intera
	 * 112.179.213.19.213.251
	*/

	mac = mac.split('.');

	/**
	 * Creo un array di byte arrivandomi intera
	 * 112.179.213.19.213.251
	*/

	parseInt("112").toString(16);

	for( var i = 0; i < mac.length; i += 1 ) {
		mac[i] = parseInt(mac[i]).toString(16);
	}

	mac = mac.join(":");
	mac = mac.toString(String);

	return mac;
}

/**
 * Funzione seconds_to_dhms( seconds )
 * 
 * @param int seconds secondi trascorsi.
 *
 * @returns string ritorna la stringa contenente i giorni, ore, minuti, secondi (d-hh:mm:ss).
 */
export function seconds_to_dhms( seconds ) {

	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600*24));
	var h = Math.floor(seconds % (3600*24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	
	var dDisplay = d.toString();
	var hDisplay = h.toString();
	var mDisplay = m.toString();
	var sDisplay = s.toString();
	return dDisplay + '-' + hDisplay.padStart(2, '0') + ':' + mDisplay.padStart(2, '0') + ':' + sDisplay.padStart(2, '0');
}

/**
 * Funzione jsdate_to_rfc3339( d )
 * 
 * @param datetime d variabile javascript datetime della data da convertire.
 *
 * @returns string ritorna la stringa che contiene la data in rfc3339.
 */
export function jsdate_to_rfc3339( d ) {
    
    function pad(n) {
        return n < 10 ? "0" + n : n;
    }

    function timezoneOffset(offset) {
        var sign;
        if (offset === 0) {
            return "Z";
        }
        sign = (offset > 0) ? "-" : "+";
        offset = Math.abs(offset);
        return sign + pad(Math.floor(offset / 60)) + ":" + pad(offset % 60);
    }

    return d.getFullYear() + "-" +
        pad(d.getMonth() + 1) + "-" +
        pad(d.getDate()) + "T" +
        pad(d.getHours()) + ":" +
        pad(d.getMinutes()) + ":" +
        pad(d.getSeconds()); //+ 
        //timezoneOffset(d.getTimezoneOffset());
}

/**
 * Funzione jsdate_to_readable( d )
 * 
 * @param datetime d variabile javascript datetime della data da convertire.
 * 
 * @returns string ritorna la stringa rappresentate la data in un formato leggibile.
 */
export function jsdate_to_readable( d ) {
	return new Date( d * 1000 ).toLocaleDateString(
		'en-gb',
		{
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour:  "2-digit",
			minute: "2-digit",
		 	second: "2-digit"
		}
	);
}

/**
 * Funzione jsdate_to_logsdate( d )
 * 
 * @param datetime d variabile javascript datetime della data da convertire.
 * 
 * @returns string ritorna la stringa rappresentate la data in un formato leggibile.
 */
export function jsdate_to_logsdate( d ) {

	var date = new Date( d );
	
	var formatted_date = date.toLocaleDateString(
		'en-gb',
		{
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour:  "2-digit",
			minute: "2-digit",
		 	second: "2-digit"
		}
	);

	var milliseconds = date.getMilliseconds();

	return formatted_date + '.' + milliseconds.toString().padStart(3, '0');
}

/**
 * Funzione milliseconds_to_hhmmss( s )
 * 
 * @param int s millisecondi in cui il log si è verificato. 
 */
export function milliseconds_to_hhmmss( ms ) {
	var s;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;
  
	return hrs + ':' + mins + ':' + secs + '.' + ms;
}