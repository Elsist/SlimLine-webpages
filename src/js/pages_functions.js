/**
 * Importazioni JS
 */

import { read_data, send_data, data_page } from './sfw191a000';

/**
 * Function device_page()
 * 
 * Funzione gestione pagina device
 */
export function device_page() {

	read_data( data_page, display_value );

	// Funzione di settaggio variabili

	document.querySelector('#COM0').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#COM1').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#COM2').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})

	// Funzione di visualizzazione variabili.

	function display_value( response ) {

		// Display value in view.
	
		document.getElementById( "OSID_COM0_BAUD_view" ).innerHTML = response.OSID_COM0_BAUD;
		document.getElementById( "OSID_COM0_PARITY_view" ).innerHTML = response.OSID_COM0_PARITY;
		document.getElementById( "OSID_COM0_DATA_BITS_view" ).innerHTML = response.OSID_COM0_DATA_BITS;
		document.getElementById( "OSID_COM0_STOP_BITS_view" ).innerHTML = response.OSID_COM0_STOP_BITS;
		document.getElementById( "OSID_COM1_BAUD_view" ).innerHTML = response.OSID_COM1_BAUD;
		document.getElementById( "OSID_COM1_PARITY_view" ).innerHTML = response.OSID_COM1_PARITY;
		document.getElementById( "OSID_COM1_DATA_BITS_view" ).innerHTML = response.OSID_COM1_DATA_BITS;
		document.getElementById( "OSID_COM1_STOP_BITS_view" ).innerHTML = response.OSID_COM1_STOP_BITS;
		document.getElementById( "OSID_COM2_BAUD_view" ).innerHTML = response.OSID_COM2_BAUD;
		document.getElementById( "OSID_COM2_PARITY_view" ).innerHTML = response.OSID_COM2_PARITY;
		document.getElementById( "OSID_COM2_DATA_BITS_view" ).innerHTML = response.OSID_COM2_DATA_BITS;
		document.getElementById( "OSID_COM2_STOP_BITS_view" ).innerHTML = response.OSID_COM2_STOP_BITS;
		document.getElementById( "OSID_ETH0_ACT_IP_view" ).innerHTML = response.OSID_ETH0_ACT_IP;
		document.getElementById( "OSID_ETH0_MAC" ).innerHTML = response.OSID_ETH0_MAC;
		document.getElementById( "OSID_ETH0_ACT_GATEWAY_view" ).innerHTML = response.OSID_ETH0_ACT_GATEWAY;
		document.getElementById( "OSID_ETH0_ACT_DNS_PRIMARY_view" ).innerHTML = response.OSID_ETH0_ACT_DNS_PRIMARY;
		document.getElementById( "OSID_ETH0_ACT_DNS_SECONDARY_view" ).innerHTML = response.OSID_ETH0_ACT_DNS_SECONDARY;
	
		// Display value in input.

		document.getElementById( "OSID_COM0_BAUD_input" ).value = response.OSID_COM0_BAUD;
		document.getElementById( "OSID_COM0_PARITY_input" ).value = response.OSID_COM0_PARITY;
		document.getElementById( "OSID_COM0_DATA_BITS_input" ).value = response.OSID_COM0_DATA_BITS;
		document.getElementById( "OSID_COM0_STOP_BITS_input" ).value = response.OSID_COM0_STOP_BITS;
		document.getElementById( "OSID_COM0_DTR_MNG_input" ).value = response.OSID_COM0_DTR_MNG;
		document.getElementById( "OSID_COM0_DTR_ON_TIME_input" ).value = response.OSID_COM0_DTR_ON_TIME;
		document.getElementById( "OSID_COM0_DTR_OFF_TIME_input" ).value = response.OSID_COM0_DTR_OFF_TIME;
		document.getElementById( "OSID_COM1_BAUD_input" ).value = response.OSID_COM1_BAUD;
		document.getElementById( "OSID_COM1_PARITY_input" ).value = response.OSID_COM1_PARITY;
		document.getElementById( "OSID_COM1_DATA_BITS_input" ).value = response.OSID_COM1_DATA_BITS;
		document.getElementById( "OSID_COM1_STOP_BITS_input" ).value = response.OSID_COM1_STOP_BITS;
		document.getElementById( "OSID_COM1_DTR_MNG_input" ).value = response.OSID_COM1_DTR_MNG;
		document.getElementById( "OSID_COM1_DTR_ON_TIME_input" ).value = response.OSID_COM1_DTR_ON_TIME;
		document.getElementById( "OSID_COM1_DTR_OFF_TIME_input" ).value = response.OSID_COM1_DTR_OFF_TIME;
		document.getElementById( "OSID_COM2_BAUD_input" ).value = response.OSID_COM2_BAUD;
		document.getElementById( "OSID_COM2_PARITY_input" ).value = response.OSID_COM2_PARITY;
		document.getElementById( "OSID_COM2_DATA_BITS_input" ).value = response.OSID_COM2_DATA_BITS;
		document.getElementById( "OSID_COM2_STOP_BITS_input" ).value = response.OSID_COM2_STOP_BITS;
		document.getElementById( "OSID_COM2_DTR_MNG_input" ).value = response.OSID_COM2_DTR_MNG;
		document.getElementById( "OSID_COM2_DTR_ON_TIME_input" ).value = response.OSID_COM2_DTR_ON_TIME;
		document.getElementById( "OSID_COM2_DTR_OFF_TIME_input" ).value = response.OSID_COM2_DTR_OFF_TIME;
		document.getElementById( "OSID_ETH0_ACT_IP_input" ).value = response.OSID_ETH0_ACT_IP;
		document.getElementById( "OSID_ETH0_DHCP_EN_input" ).value = response.OSID_ETH0_DHCP_EN;
		document.getElementById( "OSID_ETH0_ACT_MASK_input" ).value = response.OSID_ETH0_ACT_MASK;
		document.getElementById( "OSID_ETH0_ACT_GATEWAY_input" ).value = response.OSID_ETH0_ACT_GATEWAY;
		document.getElementById( "OSID_ETH0_ACT_DNS_PRIMARY_input" ).value = response.OSID_ETH0_ACT_DNS_PRIMARY;
		document.getElementById( "OSID_ETH0_ACT_DNS_SECONDARY_input" ).value = response.OSID_ETH0_ACT_DNS_SECONDARY;

		
	}
}