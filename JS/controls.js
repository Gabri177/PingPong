export let	  keyState = {};

export function setupKeyControls() {

	window.addEventListener('keydown', function (event) {
		keyState[event.key] = true;
	});
	window.addEventListener('keyup', function (event) {
		keyState[event.key] = false;
	});
}