/**
 * Funzione nav_buger()
 * 
 * Funzione che apre e chiude il navburger con l'evento sul tasto
 */
export function nav_burger() {
	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
  
	  // Add a click event on each of them
	  $navbarBurgers.forEach( el => {
		el.addEventListener('click', () => {
  
			// Get the target from the "data-target" attribute
			const target = el.dataset.target;
			const $target = document.getElementById(target);
	
			// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
			el.classList.toggle('is-active');
			$target.classList.toggle('is-active');
  
		});
	  });
	}
}

/**
 * Funzione menu_active()
 * 
 * Funzione che imposta sulla voce di menu la classe "is-active".
 */
export function menu_active() {
	var nav = document.getElementById('nav');
	var anchor = nav.getElementsByTagName('a');
	var current = window.location.pathname.split('/')[2];
	for (var i = 0; i < anchor.length; i++) {
		if(anchor[i].getAttribute('href', 2) == current) {
			anchor[i].className = "is-active";
	  }
	}
}

/**
 * Funzione open_modal( target )
 * 
 * Funzione che apre il modal passato come target
 * 
 * @param string target stringa contente l'id del modal da aprire. 
*/
export function open_modal(target) {
	var modal = document.querySelector( '#'+ target );  // assuming you have only 1
	var html = document.querySelector('html');
	modal.classList.add('is-active');
	html.classList.add('is-clipped');
	modal.querySelector('.modal-background').addEventListener('click', function(e) {
	  e.preventDefault();
	  modal.classList.remove('is-active');
	  html.classList.remove('is-clipped');
	});
	modal.querySelector('.modal-close-button').addEventListener('click', function(e) {
		e.preventDefault();
		modal.classList.remove('is-active');
		html.classList.remove('is-clipped');
	});
}