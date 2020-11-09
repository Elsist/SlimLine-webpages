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