/**
 * Importazioni CSS
 */

import '../sass/index.scss';

/**
 * Importazioni JS
 */

import { menu_active, nav_burger, open_modal } from './utils';
import { index_page, general_page, device_page, servers_page } from './pages_functions';

// Set voce attiva nel menu e burger per dropdown.

menu_active();
document.addEventListener('DOMContentLoaded', nav_burger() );

// Action per aprire accordion. 

document.querySelectorAll("[data-toggle='modal']").forEach( function( elem ) { elem.addEventListener("click", function(event){event.preventDefault();open_modal( elem.dataset.target )} ); });

// Check pagina e chiamata alla propria funzione.

var page_name = window.location.pathname.split('/')[2].split(".")[0];

if ( page_name == 'Index' ){
	index_page();
} if ( page_name == 'General' ){
	general_page();
} else if ( page_name == 'Devices' ){
	device_page();
} else if ( page_name == 'Servers' ){
	servers_page();
}