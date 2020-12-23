# Pagine web SlimLine

[![Slimline Firmware](https://img.shields.io/badge/firmware-%3E%3Dsfw198d030-%23009933)](https://support.elsist.biz/note-di-rilascio-per-il-firmare-delle-cpu-swf198/)

Queste sono le pagine web per dispositivi SlimLine.
All'interno del pacchetto sono contenuti tutti i file necessari allo sviluppo.

## Componenti richiesti

I componenti necessari allo sviluppo delle pagine sono elencati nel file

	package.json

Ma una lista è disponibile qui sotto:

1. **Bulma** un framework css.
2. **Notie** libreria per banner di notifiche.
3. **ClipBoardJs** serve a copiare negli appunti da JS.
3. **PIXIJs** motore grafico per pagina gestione IO.
4. **Sfw** file di gestione comunicazione dalle pagine allo SlimLine

## Sviluppo

Per sviluppare le pagine è necessario usare la cartella:

	src -> cartella generale sviluppo
		js -> cartella js
			index.js -> JS globale.
			pages_functions -> file nel quale sono contenute tutte le funzioni per la visualizzazione dati nelle pagine.
			iostatus -> file per funzionamento pagina IO.
			utilis -> utilità, gestione menù collapse accordion ecc.
			sfw******* -> gestione scambio dati e formattazioni varie.
		sass -> cartella sass
			index.scss -> sovrascrittura variabili globali e inclusionì	
			elsist.scss -> file di stile personalizzato

Tutti gli output saranno generati in:

	dist -> cartella generale sviluppo
		scripts -> inclusioni scripts
			js -> cartella js
				bundles.js -> file js totale per pagine generiche.
				iostatus.js -> file js totale per pagina IO.
				logs.js -> file js per gestione e stampa a video logs.
			sass -> cartella sass
				index.css -> css totale
			
### Inizio progetto, download dipendenze e compilazioni

Per scaricare tutte le dipendenze occorre

	npm install

JS Per compilare tutti i file *.js e *scss viene usato il module bundler WebPack.

	npx webpack

## Funzionamento

### File index.js

Nel file index.js vengono prima importate le utilità e eseguite.

	import { menu_active, nav_burger, open_modal } from './utils';

	menu_active();
	document.addEventListener('DOMContentLoaded', nav_burger() );

	// Action per aprire accordion. 

	document.querySelectorAll("[data-toggle='modal']").forEach( function( elem ) { elem.addEventListener("click", function(event){event.preventDefault();open_modal( elem.dataset.target )} ); });

In seguito vengono incluse le funzioni corrispondenti inclusa da 

	import { index_page, general_page, device_page, servers_page, protocols_page, security_page, userinfos_page } from './pages_functions';

Per essere eseguite in base alla pagina in cui sono

	var page_name = window.location.pathname.split('/')[2].split(".")[0];

	if ( page_name == 'Index' ){
		index_page();
	} else if ( page_name == 'General' ){
		general_page();
	}

### File pages_functions.js

Nel file pages function vengono prima di tutto incluse le funzioni per il funzionamento dello scambio dati e per la formattazione.

	import { read_data, send_data, data_page, seconds_to_dhms, jsdate_to_rfc3339, jsdate_to_readable } from './sfw191a000';

Sotto troviamo il funzionamento della pagina (riassunto per semplicità).
Esportiamo la funzione che verrà inclusa e chiamata in index.js

	export function index_page() {

		// Prima lettura per togliere il ritardo causato dall'interval.

		read_data( data_page, false, display_value ); 

		// Esempio di invio form.

		document.querySelector('#DATETIME').addEventListener( 'submit', function(event) {
			event.preventDefault();
			send_data(this, data_page, display_value );
		})

		// Creazione dell'interval su una variabile window, per far si che l'intervallo possa essere interrotto da un altra funzione non locale a questo file, ma residente in un altro file.

		window._els_interval = setInterval(function(){ read_data( data_page, true, display_value ); }, 1000);

		// Funzione di visualizzazione variabili. Viene chiamata in reguito alle funzione read_data e set_data, dopo che gli è stata passata. Vedi riga sopra.

		function display_value( response, on_loop ) {

			// Esempio di dato valorizzato.

			document.getElementById( "OSID_SYSTEM_UP_TIME" ).innerHTML = seconds_to_dhms( response.OSID_SYSTEM_UP_TIME );

			// Esempio di dato con if in linea.

			document.getElementById( "OSID_PLC_STATUS" ).innerHTML = ( ( response.OSID_PLC_STATUS == 1 ) ? 'Running' : 'Stopped');

			// Esempio di doppia impostazione.

			document.getElementById( "OSID_PLC_MALLOC_USE_progress" ).value = document.getElementById( "OSID_PLC_MALLOC_USE_label" ).innerHTML = response.OSID_PLC_MALLOC_USE;

			// Esempio di valorizzazione progressbar e cambio classe css. 

			if ( response.OSID_PLC_TFAST_LOAD > 50 ) {
				document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.remove("is-success");
				document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.add("is-danger");
			} else {
				document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.remove("is-danger");
				document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.add("is-success");
			}

			// In alcune pagine è possibile avwere un interval e un input, essendo la funzione di valorizzazione dati la stessa, avremo bisogno di un variabile che ci permatta di cambiare il valore degli input ogni qualvolta l'interval venga eseguito. In questo modo non avremo problemi di focus ! 

			if ( on_loop ) return;

			document.getElementById( "OSID_TIME_ZONE_input" ).value = response.OSID_TIME_ZONE;

		}
	}

### Per inviare un form

- **id**: "#MyForm"
- **this** è l'oggetto DOM del form,
- **data_page** è il nome della pagina htm contentente i dati, di default viene presa dallo stesso nome del file HTML,
- **setup_value** è la funzione di valorizzazione dati.

L'invio del form deve essere disabilitato dal'HTML.

	document.querySelector('#MyForm').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, setup_values );
	})

**setup_values**, serve per scrivere negli oggetti html il testo di risposta dal json arrivato nella variabile response.

### Per leggere i valori

- **data_page** è il nome della pagina htm contentente i dati, di default viene presa dallo stesso nome del file HTML,
- **on_loop** variabile booleana che indica se la funzione è stata chiamata su un interval, deve essere impostata manualmente.
- **display_value** funzione di callback dopo read_data e set_data. In questa funzione c'è scritto come valorizzare i campi della pagina con i dati ricevuti.

	read_data( data_page, on_loop, display_value );

## Note

Su tutti i campi data e ora il browser legge UTC ma li converte in data e ora **locale** in base alle impostazioni correnti dello stesso.

### Datetime settings

Se voglio impostare una data e ora **4/12/2020 20:10:23** sul PLC viene inviato il valore UTC corrispondente **4/12/2020 19:10:23** perchè il browser lo stiamo utilizzando in italia quindi siamo **+1**.

Questo valore sul PLC da telnet con il comando **datetime** se il PLC è impostato anche esso a **GMT +1** su timezone come lo è il browser allora con avremo come risultato del comando la stessa data e ora visualizzate dal browser.

Ma se il PLC è impostato a **GMT +2** allora il PLC visualizzerà un ora più avanti rispetto a quella del browser.