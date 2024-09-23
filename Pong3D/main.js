import { keyMovePad } from '/pong.js';
import { FPS } from '/constants.js';

let gameState = false;
let intervalId = null;

const buttonStart = document.getElementById('pause');

if (buttonStart) {
	buttonStart.addEventListener('click', function () {

		if (gameState) {

			clearInterval(intervalId);
			gameState = false;
			buttonStart.innerHTML = 'Start';
		} else {

			intervalId = setInterval(keyMovePad, 1000 / FPS);
			gameState = true;
			buttonStart.innerHTML = 'Pause';
		}
	});
}else {
	
	console.log('buttonStart not found');
}