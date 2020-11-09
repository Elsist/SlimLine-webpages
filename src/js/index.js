/**
 * Importazioni CSS
 */

import '../sass/index.scss';

/**
 * Importazioni JS
 */

import { read_data, send_data, data_page } from './sfw191a000';
import { Ionicons } from '../../node_modules/ionicons';
import { menu_active, nav_burger } from './utils';

// Set voce attiva nel menu e burger per dropdown.

menu_active();
document.addEventListener('DOMContentLoaded', nav_burger() );

// Check pagina e chiamata alla propria funzione.

var page_name = window.location.pathname.split('/')[2].split(".")[0];

if ( page_name == 'Devices' ){
	device_page ();
}


function device_page(){

	read_data( data_page, setup_values );

	// Funzione di settaggio variabili

	document.querySelector('#com0').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, setup_values );
	})
	document.querySelector('#com1').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, setup_values );
	})
	document.querySelector('#com2').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, setup_values );
	})

	// Funzione di visualizzazione variabili.

	function setup_values( response ) {
		document.getElementById( "OSID_COM0_BAUD" ).value = response.OSID_COM0_BAUD;
		document.getElementById( "OSID_COM0_PARITY" ).value = response.OSID_COM0_PARITY;
		document.getElementById( "OSID_COM0_DATA_BITS" ).value = response.OSID_COM0_DATA_BITS;
		document.getElementById( "OSID_COM0_STOP_BITS" ).value = response.OSID_COM0_STOP_BITS;
		document.getElementById( "OSID_COM0_DTR_MNG" ).value = response.OSID_COM0_DTR_MNG;
		document.getElementById( "OSID_COM0_DTR_ON_TIME" ).value = response.OSID_COM0_DTR_ON_TIME;
		document.getElementById( "OSID_COM0_DTR_OFF_TIME" ).value = response.OSID_COM0_DTR_OFF_TIME;
		document.getElementById( "OSID_COM1_BAUD" ).value = response.OSID_COM1_BAUD;
		document.getElementById( "OSID_COM1_PARITY" ).value = response.OSID_COM1_PARITY;
		document.getElementById( "OSID_COM1_DATA_BITS" ).value = response.OSID_COM1_DATA_BITS;
		document.getElementById( "OSID_COM1_STOP_BITS" ).value = response.OSID_COM1_STOP_BITS;
		document.getElementById( "OSID_COM1_DTR_MNG" ).value = response.OSID_COM1_DTR_MNG;
		document.getElementById( "OSID_COM1_DTR_ON_TIME" ).value = response.OSID_COM1_DTR_ON_TIME;
		document.getElementById( "OSID_COM1_DTR_OFF_TIME" ).value = response.OSID_COM1_DTR_OFF_TIME;
		document.getElementById( "OSID_COM2_BAUD" ).value = response.OSID_COM2_BAUD;
		document.getElementById( "OSID_COM2_PARITY" ).value = response.OSID_COM2_PARITY;
		document.getElementById( "OSID_COM2_DATA_BITS" ).value = response.OSID_COM2_DATA_BITS;
		document.getElementById( "OSID_COM2_STOP_BITS" ).value = response.OSID_COM2_STOP_BITS;
		document.getElementById( "OSID_COM2_DTR_MNG" ).value = response.OSID_COM2_DTR_MNG;
		document.getElementById( "OSID_COM2_DTR_ON_TIME" ).value = response.OSID_COM2_DTR_ON_TIME;
		document.getElementById( "OSID_COM2_DTR_OFF_TIME" ).value = response.OSID_COM2_DTR_OFF_TIME;
	}
}