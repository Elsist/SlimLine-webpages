/**
 * Importazioni JS
 */

import { read_data, send_data, data_page, seconds_to_dhms, jsdate_to_rfc3339, jsdate_to_readable } from './sfw191a000';

/**
 * Function index_page()
 * 
 * Funzione gestione pagina index
 */
export function index_page() {

	read_data( data_page, false, display_value );

	window._els_interval = setInterval(function(){ read_data( data_page, true, display_value ); }, 1000);	

	// Funzione di visualizzazione variabili.

	function display_value( response, on_loop ) {

		// First widgets.

		document.getElementById( "OSID_SYSTEM_UP_TIME" ).innerHTML = seconds_to_dhms( response.OSID_SYSTEM_UP_TIME );
		document.getElementById( "OSID_PLC_STATUS" ).innerHTML = ( ( response.OSID_PLC_STATUS == 1 ) ? 'Running' : 'Stopped');

		// Stats.

		document.getElementById( "OSID_PLC_MALLOC_USE_progress" ).value = document.getElementById( "OSID_PLC_MALLOC_USE_label" ).innerHTML = response.OSID_PLC_MALLOC_USE;
		document.getElementById( "OSID_SYSTEM_RMALLOC_USE_progress" ).value = document.getElementById( "OSID_SYSTEM_RMALLOC_USE_label" ).innerHTML = response.OSID_SYSTEM_RMALLOC_USE;
		document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).value = document.getElementById( "OSID_PLC_TFAST_LOAD_label" ).innerHTML = response.OSID_PLC_TFAST_LOAD;
		document.getElementById( "OSID_PLC_TSLOW_LOAD_progress" ).value = document.getElementById( "OSID_PLC_TSLOW_LOAD_label" ).innerHTML = response.OSID_PLC_TSLOW_LOAD;
		document.getElementById( "OSID_PLC_TBACK_LOAD_progress" ).value = document.getElementById( "OSID_PLC_TBACK_LOAD_label" ).innerHTML = response.OSID_PLC_TBACK_LOAD;
		document.getElementById( "OSID_PLC_ERR_LOAD_progress" ).value = document.getElementById( "OSID_PLC_ERR_LOAD_label" ).innerHTML = response.OSID_PLC_ERR_LOAD;
		
		if ( response.OSID_PLC_TFAST_LOAD > 50 ) {
			document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.add("is-success");
		}

		if ( response.OSID_PLC_TSLOW_LOAD > 50 ) {
			document.getElementById( "OSID_PLC_TSLOW_LOAD_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_PLC_TSLOW_LOAD_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_PLC_TSLOW_LOAD_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_PLC_TSLOW_LOAD_progress" ).classList.add("is-success");
		}

		if ( response.OSID_PLC_TBACK_LOAD > 100 ) {
			document.getElementById( "OSID_PLC_TBACK_LOAD_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_PLC_TBACK_LOAD_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_PLC_TBACK_LOAD_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_PLC_TBACK_LOAD_progress" ).classList.add("is-success");
		}

		if ( response.OSID_PLC_ERR_LOAD > 50 ) {
			document.getElementById( "OSID_PLC_ERR_LOAD_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_PLC_ERR_LOAD_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_PLC_ERR_LOAD_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_PLC_ERR_LOAD_progress" ).classList.add("is-success");
		}

		// PLC Informations.

		document.getElementById( "OSID_XTARGET_ID" ).innerHTML = response.OSID_XTARGET_ID;
		document.getElementById( "OSID_MANUFACT_CODE" ).innerHTML = response.OSID_MANUFACT_CODE;
		document.getElementById( "OSID_CUSTOMER_CODE" ).innerHTML = response.OSID_CUSTOMER_CODE;
		document.getElementById( "OSID_PLC_PROGRAM_VER" ).innerHTML = response.OSID_PLC_PROGRAM_VER;

		// System Informations.

		document.getElementById( "OSID_DEVICE_NAME" ).innerHTML = response.OSID_DEVICE_NAME;
		document.getElementById( "OSID_LOCAL_DATETIME" ).innerHTML = jsdate_to_readable( response.OSID_LOCAL_DATETIME );
		document.getElementById( "OSID_PRODUCT_CODE" ).innerHTML = response.OSID_PRODUCT_CODE;
		document.getElementById( "OSID_PRODUCT_SERIAL" ).innerHTML = response.OSID_PRODUCT_SERIAL;
		document.getElementById( "OSID_UNIQUE_ID" ).innerHTML = response.OSID_UNIQUE_ID;
		document.getElementById( "OSID_FIRMWARE_VER" ).innerHTML = response.OSID_FIRMWARE_VER;

	}
}

/**
 * Function general_page()
 * 
 * Funzione gestione pagina general
 */
export function general_page() {

	read_data( data_page, false, display_value );
	setInterval(function(){ read_data( data_page, true, display_value ); }, 1000);

	// Funzioni settaggio variabili.

	document.querySelector('#DATETIME').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#SYSTEM').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})

	// Funzione di visualizzazione variabili.

	function display_value( response, on_loop ) {

		/**
		 * Views
		 */

		// Date time.

		document.getElementById( "OSID_TIME_ZONE_view" ).innerHTML = '(GMT ' + ( ( response.OSID_TIME_ZONE < 0 ) ? response.OSID_TIME_ZONE : '+' + response.OSID_TIME_ZONE ) + ')'; 	
		document.getElementById( "OSID_DAYLIGHT_ZONE_view" ).innerHTML = response.OSID_DAYLIGHT_ZONE;

		// Il plc torna secondi e devo convertirli in un data leggibili.
		document.getElementById( "OSID_LOCAL_DATETIME_view" ).innerHTML = jsdate_to_readable( response.OSID_LOCAL_DATETIME );

		// System settings.

		document.getElementById( "OSID_DEVICE_NAME_view" ).innerHTML = response.OSID_DEVICE_NAME;
		document.getElementById( "OSID_CUSTOMER_CODE_view" ).innerHTML = response.OSID_CUSTOMER_CODE;

		/**
		 * Inputs
		 */

		// Skip input if is loop.

		if ( on_loop ) return;

		// Date time.

		document.getElementById( "OSID_TIME_ZONE_input" ).value = response.OSID_TIME_ZONE;
		document.getElementById( "OSID_DAYLIGHT_ZONE_input" ).value = response.OSID_DAYLIGHT_ZONE;

		// Il plc torna secondi e devo convertirli in RFC3339 per il valore html5 dell'input.
		document.getElementById( "OSID_LOCAL_DATETIME_input" ).value = jsdate_to_rfc3339( new Date( response.OSID_LOCAL_DATETIME * 1000 ) );

		// System settings.

		document.getElementById( "OSID_DEVICE_NAME_input" ).value = response.OSID_DEVICE_NAME;
		document.getElementById( "OSID_CUSTOMER_CODE_input" ).value = response.OSID_CUSTOMER_CODE;

	}
}

/**
 * Function device_page()
 * 
 * Funzione gestione pagina device
 */
export function device_page() {

	read_data( data_page, false, display_value );

	// Funzioni di settaggio variabili.

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
	document.querySelector('#ETH0').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})

	// Funzione di visualizzazione variabili.

	function display_value( response, on_loop ) {

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
		document.getElementById( "OSID_ETH0_DHCP_DNS_input" ).value = response.OSID_ETH0_DHCP_DNS;
		document.getElementById( "OSID_ETH0_ACT_DNS_PRIMARY_input" ).value = response.OSID_ETH0_ACT_DNS_PRIMARY;
		document.getElementById( "OSID_ETH0_ACT_DNS_SECONDARY_input" ).value = response.OSID_ETH0_ACT_DNS_SECONDARY;

	}
}

/**
 * Function servers_page()
 * 
 * Funzione gestione pagina servers
 */
export function servers_page() {

	read_data( data_page, false, display_value );

	// Funzioni di settaggio variabili.

	document.querySelector('#TELNET').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#WEB').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#FTP').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#IP0').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#IP1').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#IP2').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})

	// Funzione di visualizzazione variabili.

	function display_value( response, on_loop ) {

		// Display value in view.
	
		document.getElementById( "OSID_TELNET_SVR_PORT_view" ).innerHTML = response.OSID_TELNET_SVR_PORT;
		document.getElementById( "OSID_WEB_SVR_PORT_view" ).innerHTML = response.OSID_WEB_SVR_PORT;
		document.getElementById( "OSID_FTP_SVR_PORT_view" ).innerHTML = response.OSID_FTP_SVR_PORT;
		document.getElementById( "OSID_FTP_SVR_PASSIVE_PORT_view" ).innerHTML = response.OSID_FTP_SVR_PASSIVE_PORT;
		document.getElementById( "OSID_IPSERVER0_PORT_view" ).innerHTML = response.OSID_IPSERVER0_PORT;
		document.getElementById( "OSID_IPSERVER0_MODE_view" ).innerHTML = response.OSID_IPSERVER0_MODE;
		document.getElementById( "OSID_IPSERVER0_CNN_view" ).innerHTML = response.OSID_IPSERVER0_CNN;
		document.getElementById( "OSID_IPSERVER1_PORT_view" ).innerHTML = response.OSID_IPSERVER1_PORT;
		document.getElementById( "OSID_IPSERVER1_MODE_view" ).innerHTML = response.OSID_IPSERVER1_MODE;
		document.getElementById( "OSID_IPSERVER1_CNN_view" ).innerHTML = response.OSID_IPSERVER1_CNN;
		document.getElementById( "OSID_IPSERVER2_PORT_view" ).innerHTML = response.OSID_IPSERVER2_PORT;
		document.getElementById( "OSID_IPSERVER2_MODE_view" ).innerHTML = response.OSID_IPSERVER2_MODE;
		document.getElementById( "OSID_IPSERVER2_CNN_view" ).innerHTML = response.OSID_IPSERVER2_CNN;

		// On - Off labels

		if ( Boolean( response.OSID_TELNET_SVR_EN ) ) {
			document.getElementById("OSID_TELNET_SVR_EN_view").classList.add('is-success');
			document.getElementById("OSID_TELNET_SVR_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_TELNET_SVR_EN_view").classList.remove('is-success');
			document.getElementById("OSID_TELNET_SVR_EN_view").classList.add('is-normal');
		}

		if ( Boolean( response.OSID_WEB_SVR_EN ) ) {
			document.getElementById("OSID_WEB_SVR_EN_view").classList.add('is-success');
			document.getElementById("OSID_WEB_SVR_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_WEB_SVR_EN_view").classList.remove('is-success');
			document.getElementById("OSID_WEB_SVR_EN_view").classList.add('is-normal');
		}

		if ( Boolean( response.OSID_FTP_SVR_EN ) ) {
			document.getElementById("OSID_FTP_SVR_EN_view").classList.add('is-success');
			document.getElementById("OSID_FTP_SVR_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_FTP_SVR_EN_view").classList.remove('is-success');
			document.getElementById("OSID_FTP_SVR_EN_view").classList.add('is-normal');
		}

		if ( Boolean( response.OSID_IPSERVER0_EN ) ) {
			document.getElementById("OSID_IPSERVER0_EN_view").classList.add('is-success');
			document.getElementById("OSID_IPSERVER0_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_IPSERVER0_EN_view").classList.remove('is-success');
			document.getElementById("OSID_IPSERVER0_EN_view").classList.add('is-normal');
		}

		if ( Boolean( response.OSID_IPSERVER1_EN ) ) {
			document.getElementById("OSID_IPSERVER1_EN_view").classList.add('is-success');
			document.getElementById("OSID_IPSERVER1_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_IPSERVER1_EN_view").classList.remove('is-success');
			document.getElementById("OSID_IPSERVER1_EN_view").classList.add('is-normal');
		}

		if ( Boolean( response.OSID_IPSERVER2_EN ) ) {
			document.getElementById("OSID_IPSERVER2_EN_view").classList.add('is-success');
			document.getElementById("OSID_IPSERVER2_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_IPSERVER2_EN_view").classList.remove('is-success');
			document.getElementById("OSID_IPSERVER2_EN_view").classList.add('is-normal');
		}

		// Display value in input.
		
		document.getElementById( "OSID_TELNET_SVR_EN_input" ).value = response.OSID_TELNET_SVR_EN;
		document.getElementById( "OSID_TELNET_SVR_PORT_input" ).value = response.OSID_TELNET_SVR_PORT;
		document.getElementById( "OSID_WEB_SVR_EN_input" ).value = response.OSID_WEB_SVR_EN;
		document.getElementById( "OSID_WEB_SVR_FAVICON_input" ).value = response.OSID_WEB_SVR_FAVICON;
		document.getElementById( "OSID_WEB_SVR_DEFAULT_PG_input" ).value = response.OSID_WEB_SVR_DEFAULT_PG;
		document.getElementById( "OSID_WEB_SVR_ERROR_PG_input" ).value = response.OSID_WEB_SVR_ERROR_PG;
		document.getElementById( "OSID_WEB_SVR_NFOUND_PG_input" ).value = response.OSID_WEB_SVR_NFOUND_PG;
		document.getElementById( "OSID_WEB_SVR_LOGIN_PG_input" ).value = response.OSID_WEB_SVR_LOGIN_PG;
		document.getElementById( "OSID_WEB_SVR_ROOT_DIR_input" ).value = response.OSID_WEB_SVR_ROOT_DIR;
		document.getElementById( "OSID_WEB_SVR_PORT_input" ).value = response.OSID_WEB_SVR_PORT;
		document.getElementById( "OSID_FTP_SVR_EN_input" ).value = response.OSID_FTP_SVR_EN;
		document.getElementById( "OSID_FTP_SVR_PORT_input" ).value = response.OSID_FTP_SVR_PORT;
		document.getElementById( "OSID_FTP_SVR_PASSIVE_PORT_input" ).value = response.OSID_FTP_SVR_PASSIVE_PORT;
		document.getElementById( "OSID_IPSERVER0_EN_input" ).value = response.OSID_IPSERVER0_EN;
		document.getElementById( "OSID_IPSERVER0_MODE_input" ).value = response.OSID_IPSERVER0_MODE;
		document.getElementById( "OSID_IPSERVER0_PORT_input" ).value = response.OSID_IPSERVER0_PORT;
		document.getElementById( "OSID_IPSERVER0_CNN_input" ).value = response.OSID_IPSERVER0_CNN;
		document.getElementById( "OSID_IPSERVER1_EN_input" ).value = response.OSID_IPSERVER1_EN;
		document.getElementById( "OSID_IPSERVER1_MODE_input" ).value = response.OSID_IPSERVER1_MODE;
		document.getElementById( "OSID_IPSERVER1_PORT_input" ).value = response.OSID_IPSERVER1_PORT;
		document.getElementById( "OSID_IPSERVER1_CNN_input" ).value = response.OSID_IPSERVER1_CNN;
		document.getElementById( "OSID_IPSERVER2_EN_input" ).value = response.OSID_IPSERVER2_EN;
		document.getElementById( "OSID_IPSERVER2_MODE_input" ).value = response.OSID_IPSERVER2_MODE;
		document.getElementById( "OSID_IPSERVER2_PORT_input" ).value = response.OSID_IPSERVER2_PORT;
		document.getElementById( "OSID_IPSERVER2_CNN_input" ).value = response.OSID_IPSERVER2_CNN;
		
	}
}