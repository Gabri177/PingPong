// output function to print the message to the screen
export function output (tag, message) {

	const output = document.getElementById(tag);
	output.innerHTML = message + '<br>';
}