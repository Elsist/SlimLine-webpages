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
		document.getElementById( "OSID_PLC_UP_TIME" ).innerHTML = seconds_to_dhms( response.OSID_PLC_UP_TIME );
		document.getElementById( "OSID_PLC_STATUS" ).innerHTML = ( ( response.OSID_PLC_STATUS == 1 ) ? 'Running' : 'Stopped');

		// Stats.

		document.getElementById( "OSID_PLC_MALLOC_USE_progress" ).value = document.getElementById( "OSID_PLC_MALLOC_USE_label" ).innerHTML = response.OSID_PLC_MALLOC_USE;
		document.getElementById( "OSID_SYSTEM_RMALLOC_USE_progress" ).value = document.getElementById( "OSID_SYSTEM_RMALLOC_USE_label" ).innerHTML = response.OSID_SYSTEM_RMALLOC_USE;
		document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).value = document.getElementById( "OSID_PLC_TFAST_LOAD_label" ).innerHTML = response.OSID_PLC_TFAST_LOAD;
		document.getElementById( "OSID_PLC_TSLOW_LOAD_progress" ).value = document.getElementById( "OSID_PLC_TSLOW_LOAD_label" ).innerHTML = response.OSID_PLC_TSLOW_LOAD;
		document.getElementById( "OSID_PLC_TBACK_LOAD_progress" ).value = document.getElementById( "OSID_PLC_TBACK_LOAD_label" ).innerHTML = response.OSID_PLC_TBACK_LOAD;
		document.getElementById( "OSID_PLC_HEALTH_progress" ).value = document.getElementById( "OSID_PLC_HEALTH_label" ).innerHTML = response.OSID_PLC_HEALTH;
		document.getElementById( "OSID_SYSTEM_BACK_LOAD_progress" ).value = document.getElementById( "OSID_SYSTEM_BACK_LOAD_label" ).innerHTML = response.OSID_SYSTEM_BACK_LOAD;
		
		if ( response.OSID_PLC_MALLOC_USE > 70 ) {
			document.getElementById( "OSID_PLC_MALLOC_USE_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_PLC_MALLOC_USE_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_PLC_MALLOC_USE_progress" ).classList.add("is-success");
		}

		if ( response.OSID_SYSTEM_RMALLOC_USE > 70 ) {
			document.getElementById( "OSID_SYSTEM_RMALLOC_USE_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_SYSTEM_RMALLOC_USE_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_SYSTEM_RMALLOC_USE_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_SYSTEM_RMALLOC_USE_progress" ).classList.add("is-success");
		}

		if ( response.OSID_PLC_TFAST_LOAD > 70 ) {
			document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_PLC_TFAST_LOAD_progress" ).classList.add("is-success");
		}

		if ( response.OSID_PLC_TSLOW_LOAD > 70 ) {
			document.getElementById( "OSID_PLC_TSLOW_LOAD_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_PLC_TSLOW_LOAD_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_PLC_TSLOW_LOAD_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_PLC_TSLOW_LOAD_progress" ).classList.add("is-success");
		}

		if ( response.OSID_PLC_TBACK_LOAD > 70 ) {
			document.getElementById( "OSID_PLC_TBACK_LOAD_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_PLC_TBACK_LOAD_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_PLC_TBACK_LOAD_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_PLC_TBACK_LOAD_progress" ).classList.add("is-success");
		}

		if ( response.OSID_PLC_HEALTH < 30 ) {
			document.getElementById( "OSID_PLC_HEALTH_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_PLC_HEALTH_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_PLC_HEALTH_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_PLC_HEALTH_progress" ).classList.add("is-success");
		}

		if ( response.OSID_SYSTEM_BACK_LOAD > 70 ) {
			document.getElementById( "OSID_SYSTEM_BACK_LOAD_progress" ).classList.remove("is-success");
			document.getElementById( "OSID_SYSTEM_BACK_LOAD_progress" ).classList.add("is-danger");
		} else {
			document.getElementById( "OSID_SYSTEM_BACK_LOAD_progress" ).classList.remove("is-danger");
			document.getElementById( "OSID_SYSTEM_BACK_LOAD_progress" ).classList.add("is-success");
		}
	
		// PLC Informations.

		document.getElementById( "OSID_TARGET_ID" ).innerHTML = response.OSID_TARGET_ID;
		document.getElementById( "OSID_MANUFACT_CODE" ).innerHTML = response.OSID_MANUFACT_CODE;
		document.getElementById( "OSID_CUSTOMER_CODE" ).innerHTML = response.OSID_CUSTOMER_CODE;
		document.getElementById( "OSID_PLC_PROGRAM_VER" ).innerHTML = response.OSID_PLC_PROGRAM_VER;

		// System Informations.

		document.getElementById( "OSID_DEVICE_NAME" ).innerHTML = response.OSID_DEVICE_NAME;
		document.getElementById( "OSID_UTC_DATETIME" ).innerHTML = jsdate_to_readable( response.OSID_UTC_DATETIME );
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
	window._els_interval = setInterval(function(){ read_data( data_page, true, display_value ); }, 1000);

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
		document.getElementById( "OSID_UTC_DATETIME_view" ).innerHTML = jsdate_to_readable( response.OSID_UTC_DATETIME );

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
		
		document.getElementById( "OSID_UTC_DATETIME_input" ).value = jsdate_to_rfc3339( new Date( response.OSID_UTC_DATETIME * 1000 ) );

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
		document.getElementById( "OSID_ETH0_ACT_IP" ).innerHTML = response.OSID_ETH0_ACT_IP;
		document.getElementById( "OSID_ETH0_ACT_MASK" ).innerHTML = response.OSID_ETH0_ACT_MASK;
		document.getElementById( "OSID_ETH0_MAC" ).innerHTML = response.OSID_ETH0_MAC;
		document.getElementById( "OSID_ETH0_ACT_GATEWAY" ).innerHTML = response.OSID_ETH0_ACT_GATEWAY;
		document.getElementById( "OSID_ETH0_ACT_DNS_PRIMARY" ).innerHTML = response.OSID_ETH0_ACT_DNS_PRIMARY;
		document.getElementById( "OSID_ETH0_ACT_DNS_SECONDARY" ).innerHTML = response.OSID_ETH0_ACT_DNS_SECONDARY;
	
		// Display value in input.

		// Attenzione ! pagina con valori doppi, IP, MASK, GATEWAY, DNS 1, DNS 2. hanno una variabile il lettura con ACT e una senza per i settaggi.

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
		document.getElementById( "OSID_ETH0_IP" ).value = response.OSID_ETH0_IP;
		document.getElementById( "OSID_ETH0_DHCP_EN_input" ).value = response.OSID_ETH0_DHCP_EN;
		document.getElementById( "OSID_ETH0_MASK" ).value = response.OSID_ETH0_MASK;
		document.getElementById( "OSID_ETH0_GATEWAY" ).value = response.OSID_ETH0_GATEWAY;
		document.getElementById( "OSID_ETH0_DHCP_DNS_input" ).value = response.OSID_ETH0_DHCP_DNS;
		document.getElementById( "OSID_ETH0_DNS_PRIMARY" ).value = response.OSID_ETH0_DNS_PRIMARY;
		document.getElementById( "OSID_ETH0_DNS_SECONDARY" ).value = response.OSID_ETH0_DNS_SECONDARY;

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

		document.getElementById( "OSID_IPSERVER0_MODE_view" ).innerHTML = ( response.OSID_IPSERVER0_MODE == 0 ) ? 'TCP' : (( response.OSID_IPSERVER0_MODE == 1 ) ? 'UDP' : '??' );
		document.getElementById( "OSID_IPSERVER1_MODE_view" ).innerHTML = ( response.OSID_IPSERVER1_MODE == 0 ) ? 'TCP' : (( response.OSID_IPSERVER1_MODE == 1 ) ? 'UDP' : '??' );
		document.getElementById( "OSID_IPSERVER2_MODE_view" ).innerHTML = ( response.OSID_IPSERVER2_MODE == 0 ) ? 'TCP' : (( response.OSID_IPSERVER2_MODE == 1 ) ? 'UDP' : '??' );

		document.getElementById( "OSID_IPSERVER0_CNN_view" ).innerHTML = response.OSID_IPSERVER0_CNN;
		document.getElementById( "OSID_IPSERVER1_PORT_view" ).innerHTML = response.OSID_IPSERVER1_PORT;
		document.getElementById( "OSID_IPSERVER1_CNN_view" ).innerHTML = response.OSID_IPSERVER1_CNN;
		document.getElementById( "OSID_IPSERVER2_PORT_view" ).innerHTML = response.OSID_IPSERVER2_PORT;
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

/**
 * Function protocols_page()
 * 
 * Funzione gestione pagina protocols
 */
export function protocols_page() {

	read_data( data_page, false, display_value );

	// Funzioni di settaggio variabili.

	document.querySelector('#MODBUS0').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#MODBUS1').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#MODBUS2').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#MODBUS3').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#MODBUS4').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#MODBUS5').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})

	// Funzione di visualizzazione variabili.

	function display_value( response, on_loop ) {

		// Functions.

		function modbus_type( value ){
			switch ( value ) {
				case 0: return( 'ASCII' ); break;
				case 1: return( 'RTU' ); break;
				case 2: return( 'OVER IP' ); break;
				default: return( '??' );
			}
		}
		function modbus_device( value ){
			switch ( value ) {
				case 0: return( 'COM 0' ); break;
				case 1: return( 'COM 1' ); break;
				case 2: return( 'COM 2' ); break;
				case 100: return( 'IP SERVER [0]' ); break;
				case 101: return( 'IP SERVER [1]' ); break;
				case 102: return( 'IP SERVER [2]' ); break;
				default: return( '??' );
			}
		}

		// Display value in view.
	
		document.getElementById( "OSID_MODBUS_SVR0_NODE_view" ).innerHTML = response.OSID_MODBUS_SVR0_NODE;
		document.getElementById( "OSID_MODBUS_SVR0_TYPE_view" ).innerHTML = modbus_type( response.OSID_MODBUS_SVR0_TYPE );
		document.getElementById( "OSID_MODBUS_SVR0_DEVICE_view" ).innerHTML = modbus_device( response.OSID_MODBUS_SVR0_DEVICE );
		document.getElementById( "OSID_MODBUS_SVR1_NODE_view" ).innerHTML = response.OSID_MODBUS_SVR1_NODE;
		document.getElementById( "OSID_MODBUS_SVR1_TYPE_view" ).innerHTML = modbus_type( response.OSID_MODBUS_SVR1_TYPE );
		document.getElementById( "OSID_MODBUS_SVR1_DEVICE_view" ).innerHTML = modbus_device( response.OSID_MODBUS_SVR1_DEVICE );
		document.getElementById( "OSID_MODBUS_SVR2_NODE_view" ).innerHTML = response.OSID_MODBUS_SVR2_NODE;
		document.getElementById( "OSID_MODBUS_SVR2_TYPE_view" ).innerHTML = modbus_type( response.OSID_MODBUS_SVR2_TYPE );
		document.getElementById( "OSID_MODBUS_SVR2_DEVICE_view" ).innerHTML = modbus_device( response.OSID_MODBUS_SVR2_DEVICE );
		document.getElementById( "OSID_MODBUS_SVR3_NODE_view" ).innerHTML = response.OSID_MODBUS_SVR3_NODE;
		document.getElementById( "OSID_MODBUS_SVR3_TYPE_view" ).innerHTML = modbus_type( response.OSID_MODBUS_SVR3_TYPE );
		document.getElementById( "OSID_MODBUS_SVR3_DEVICE_view" ).innerHTML = modbus_device( response.OSID_MODBUS_SVR3_DEVICE );
		document.getElementById( "OSID_MODBUS_SVR4_NODE_view" ).innerHTML = response.OSID_MODBUS_SVR4_NODE;
		document.getElementById( "OSID_MODBUS_SVR4_TYPE_view" ).innerHTML = modbus_type( response.OSID_MODBUS_SVR4_TYPE );
		document.getElementById( "OSID_MODBUS_SVR4_DEVICE_view" ).innerHTML = modbus_device( response.OSID_MODBUS_SVR4_DEVICE );
		document.getElementById( "OSID_MODBUS_SVR5_NODE_view" ).innerHTML = response.OSID_MODBUS_SVR5_NODE;
		document.getElementById( "OSID_MODBUS_SVR5_TYPE_view" ).innerHTML = modbus_type( response.OSID_MODBUS_SVR5_TYPE );
		document.getElementById( "OSID_MODBUS_SVR5_DEVICE_view" ).innerHTML = modbus_device( response.OSID_MODBUS_SVR5_DEVICE );

		// On - Off labels

		if ( Boolean( response.OSID_MODBUS_SVR0_EN ) ) {
			document.getElementById("OSID_MODBUS_SVR0_EN_view").classList.add('is-success');
			document.getElementById("OSID_MODBUS_SVR0_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_MODBUS_SVR0_EN_view").classList.remove('is-success');
			document.getElementById("OSID_MODBUS_SVR0_EN_view").classList.add('is-normal');
		}

		if ( Boolean( response.OSID_MODBUS_SVR1_EN ) ) {
			document.getElementById("OSID_MODBUS_SVR1_EN_view").classList.add('is-success');
			document.getElementById("OSID_MODBUS_SVR1_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_MODBUS_SVR1_EN_view").classList.remove('is-success');
			document.getElementById("OSID_MODBUS_SVR1_EN_view").classList.add('is-normal');
		}

		if ( Boolean( response.OSID_MODBUS_SVR2_EN ) ) {
			document.getElementById("OSID_MODBUS_SVR2_EN_view").classList.add('is-success');
			document.getElementById("OSID_MODBUS_SVR2_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_MODBUS_SVR2_EN_view").classList.remove('is-success');
			document.getElementById("OSID_MODBUS_SVR2_EN_view").classList.add('is-normal');
		}

		if ( Boolean( response.OSID_MODBUS_SVR3_EN ) ) {
			document.getElementById("OSID_MODBUS_SVR3_EN_view").classList.add('is-success');
			document.getElementById("OSID_MODBUS_SVR3_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_MODBUS_SVR3_EN_view").classList.remove('is-success');
			document.getElementById("OSID_MODBUS_SVR3_EN_view").classList.add('is-normal');
		}

		if ( Boolean( response.OSID_MODBUS_SVR4_EN ) ) {
			document.getElementById("OSID_MODBUS_SVR4_EN_view").classList.add('is-success');
			document.getElementById("OSID_MODBUS_SVR4_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_MODBUS_SVR4_EN_view").classList.remove('is-success');
			document.getElementById("OSID_MODBUS_SVR4_EN_view").classList.add('is-normal');
		}

		if ( Boolean( response.OSID_MODBUS_SVR5_EN ) ) {
			document.getElementById("OSID_MODBUS_SVR5_EN_view").classList.add('is-success');
			document.getElementById("OSID_MODBUS_SVR5_EN_view").classList.remove('is-normal');
		} else {
			document.getElementById("OSID_MODBUS_SVR5_EN_view").classList.remove('is-success');
			document.getElementById("OSID_MODBUS_SVR5_EN_view").classList.add('is-normal');
		}

		// Display value in inputs.

		document.getElementById("OSID_MODBUS_SVR0_EN_input").value = response.OSID_MODBUS_SVR0_EN;
		document.getElementById( "OSID_MODBUS_SVR0_NODE_input" ).value = response.OSID_MODBUS_SVR0_NODE;
		document.getElementById( "OSID_MODBUS_SVR0_TYPE_input" ).value = response.OSID_MODBUS_SVR0_TYPE;
		document.getElementById( "OSID_MODBUS_SVR0_DEVICE_input" ).value = response.OSID_MODBUS_SVR0_DEVICE;
		document.getElementById("OSID_MODBUS_SVR1_EN_input").value = response.OSID_MODBUS_SVR1_EN;
		document.getElementById( "OSID_MODBUS_SVR1_NODE_input" ).value = response.OSID_MODBUS_SVR1_NODE;
		document.getElementById( "OSID_MODBUS_SVR1_TYPE_input" ).value = response.OSID_MODBUS_SVR1_TYPE;
		document.getElementById( "OSID_MODBUS_SVR1_DEVICE_input" ).value = response.OSID_MODBUS_SVR1_DEVICE;
		document.getElementById("OSID_MODBUS_SVR2_EN_input").value = response.OSID_MODBUS_SVR2_EN;
		document.getElementById( "OSID_MODBUS_SVR2_NODE_input" ).value = response.OSID_MODBUS_SVR2_NODE;
		document.getElementById( "OSID_MODBUS_SVR2_TYPE_input" ).value = response.OSID_MODBUS_SVR2_TYPE;
		document.getElementById( "OSID_MODBUS_SVR2_DEVICE_input" ).value = response.OSID_MODBUS_SVR2_DEVICE;
		document.getElementById("OSID_MODBUS_SVR3_EN_input").value = response.OSID_MODBUS_SVR3_EN;
		document.getElementById( "OSID_MODBUS_SVR3_NODE_input" ).value = response.OSID_MODBUS_SVR3_NODE;
		document.getElementById( "OSID_MODBUS_SVR3_TYPE_input" ).value = response.OSID_MODBUS_SVR3_TYPE;
		document.getElementById( "OSID_MODBUS_SVR3_DEVICE_input" ).value = response.OSID_MODBUS_SVR3_DEVICE;
		document.getElementById("OSID_MODBUS_SVR4_EN_input").value = response.OSID_MODBUS_SVR4_EN;
		document.getElementById( "OSID_MODBUS_SVR4_NODE_input" ).value = response.OSID_MODBUS_SVR4_NODE;
		document.getElementById( "OSID_MODBUS_SVR4_TYPE_input" ).value = response.OSID_MODBUS_SVR4_TYPE;
		document.getElementById( "OSID_MODBUS_SVR4_DEVICE_input" ).value = response.OSID_MODBUS_SVR4_DEVICE;
		document.getElementById("OSID_MODBUS_SVR5_EN_input").value = response.OSID_MODBUS_SVR5_EN;
		document.getElementById( "OSID_MODBUS_SVR5_NODE_input" ).value = response.OSID_MODBUS_SVR5_NODE;
		document.getElementById( "OSID_MODBUS_SVR5_TYPE_input" ).value = response.OSID_MODBUS_SVR5_TYPE;
		document.getElementById( "OSID_MODBUS_SVR5_DEVICE_input" ).value = response.OSID_MODBUS_SVR5_DEVICE;
	}
}

/**
 * Function security_page()
 * 
 * Funzione gestione pagina security
 */
export function security_page() {

	read_data( data_page, false, display_value );

	// Funzioni di settaggio variabili.

	document.querySelector('#SECURITY').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})

	// Funzione di visualizzazione variabili.

	function display_value( response, on_loop ) {

		// Display value in inputs.
		var i;
		for ( i=0; i <= 7; i++ ) {
			document.getElementById("OSID_SECUR_DIR_" + i).value = response["OSID_SECUR_DIR_" + i];
			document.getElementById( "OSID_SECUR_DIR_RD_" + i ).value = response["OSID_SECUR_DIR_RD_" + i];
			document.getElementById( "OSID_SECUR_DIR_WR_" + i ).value = response["OSID_SECUR_DIR_WR_" + i];
		}

	}
}

/**
 * Function userinfos_page()
 * 
 * Funzione gestione pagina user infos
 */
export function userinfos_page() {

	read_data( data_page, false, display_value );

	// Funzioni di settaggio variabili.

	document.querySelector('#SYSUSET').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})
	document.querySelector('#PROTECTIONCODES').addEventListener( 'submit', function(event) {
		event.preventDefault();
		send_data(this, data_page, display_value );
	})

	// Funzione di visualizzazione variabili.

	function display_value( response, on_loop ) {

		document.getElementById( "OSID_PLC_CFG_INFO0" ).innerHTML = response.OSID_PLC_CFG_INFO0;
		document.getElementById( "OSID_PLC_CFG_INFO1" ).innerHTML = response.OSID_PLC_CFG_INFO1;
		document.getElementById( "OSID_PLC_CFG_INFO2" ).innerHTML = response.OSID_PLC_CFG_INFO2;
		document.getElementById( "OSID_PLC_CFG_INFO3" ).innerHTML = response.OSID_PLC_CFG_INFO3;
		document.getElementById( "OSID_PLC_CFG_SET0_view" ).innerHTML = response.OSID_PLC_CFG_SET0;
		document.getElementById( "OSID_PLC_CFG_SET1_view" ).innerHTML = response.OSID_PLC_CFG_SET1;
		document.getElementById( "OSID_PLC_CFG_SET2_view" ).innerHTML = response.OSID_PLC_CFG_SET2;
		document.getElementById( "OSID_PLC_CFG_SET3_view" ).innerHTML = response.OSID_PLC_CFG_SET3;
		document.getElementById( "OSID_PLC_PROTECT_CODE0_view" ).innerHTML = response.OSID_PLC_PROTECT_CODE0;
		document.getElementById( "OSID_PLC_PROTECT_CODE1_view" ).innerHTML = response.OSID_PLC_PROTECT_CODE1;
		document.getElementById( "OSID_PLC_PROTECT_CODE2_view" ).innerHTML = response.OSID_PLC_PROTECT_CODE2;
		document.getElementById( "OSID_PLC_PROTECT_CODE3_view" ).innerHTML = response.OSID_PLC_PROTECT_CODE3;
		
		// Display value in inputs.

		document.getElementById( "OSID_PLC_CFG_SET0_input" ).value = response.OSID_PLC_CFG_SET0;
		document.getElementById( "OSID_PLC_CFG_SET1_input" ).value = response.OSID_PLC_CFG_SET1;
		document.getElementById( "OSID_PLC_CFG_SET2_input" ).value = response.OSID_PLC_CFG_SET2;
		document.getElementById( "OSID_PLC_CFG_SET3_input" ).value = response.OSID_PLC_CFG_SET3;
		document.getElementById( "OSID_PLC_PROTECT_CODE0_input" ).value = response.OSID_PLC_PROTECT_CODE0;
		document.getElementById( "OSID_PLC_PROTECT_CODE1_input" ).value = response.OSID_PLC_PROTECT_CODE1;
		document.getElementById( "OSID_PLC_PROTECT_CODE2_input" ).value = response.OSID_PLC_PROTECT_CODE2;
		document.getElementById( "OSID_PLC_PROTECT_CODE3_input" ).value = response.OSID_PLC_PROTECT_CODE3;


	}
}