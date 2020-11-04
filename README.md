# Pagine web SlimLine

Queste sono le pagine web per i dispositivi SlimLine.
All'interno del pacchetto sono contenuti titti i file necessari allo sviluppo.

## Componenti richiesti

I componenti necessari allo sviluppo delle pagine sono elencati nel file

	package.json

Ma una lista è disponibile qui sotto:

1. **Bulma** un framework css.
2. **Ionicons** libreria minimale icone.
3. **Sfw** file di gestione comunicazione dalle pagine allo SlimLine


## Sviluppo

Per sviluppare le pagine è necessario usare la cartella:

	src -> cartella generale sviluppo
		js -> cartella js
			index.js -> file js generico
			sfw******* -> file di funzionamento nelle pagine
		sass -> cartella sass
			index.scss -> sovrascrittura variabili globali e inclusionì	
			elsist.scss -> file di stile personalizzato

Tutti gli output saranno generati in:

	dist -> cartella generale sviluppo
		scripts -> inclusioni scripts
			js -> cartella js
				index.js -> file js totale
			sass -> cartella sass
				index.css -> css totale
			
### Inizio progetto, download dipendenze e compilazioni

Per scaricare tutte le dipendenze occorre

	npm install

JS Per compilare tutti i file *.js e generarne uno unico viene usato terser.

	npm run terser

SCSS per compilare il foglio di stile **index.css** viene usato node sass

	npm run css-build

## Funzionamento

**Importazione variabili**

	import { read_data, send_data, data_page } from '../scripts/js/index.js';

**Per leggere i valori non appena la pagina è stata caricata:**

	read_data( data_page, setup_values );

**Aggiornamento a tempo:**

	setInterval(function(){ read_data( data_page, setup_values ); }, 1000);

**Per inviare un form**

- **id**: "#MyForm"
- **this** è l'oggetto DOM del form,
- **data_page** è il nome della pagina htm contentente i dati, di default viene presa dallo stesso nome del file HTML,
- **setup_value** è la funzione di valorizzazione dati.

	document.querySelector('#MyForm').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, setup_values );
	})

**setup_values**, serve per scrivere negli oggetti html il testo di risposta dal json arrivato nella variabile response.

	<script type="module">

		// Importazioni.

		import { read_data, send_data, data_page } from '../scripts/js/index.js';

		read_data( data_page, setup_values );
		setInterval(function(){ read_data( data_page, setup_values ); }, 1000);

		// Funzione di settaggio variabili
	
		document.querySelector('#MyForm').addEventListener( 'submit', function(event) {
			event.preventDefault();
			send_data(this, "", data_page, setup_values );
		})

		// Funzione di visualizzazione variabili.

		function setup_values( response ) {
			document.getElementById( "system" ).innerHTML = response.system;
			document.getElementById( "status" ).innerHTML = response.status;
			document.getElementById( "result" ).innerHTML = response.result;
		}

	</script>

