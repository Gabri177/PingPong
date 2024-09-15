import { keyState, setupKeyControls } from './controls.js';
import {mouseMovePad, keyMovePad} from './gameDraw.js';
import {SCALE_BALL, SCALE_PAD_WIDTH, SCALE_PAD_HEIGHT, CANVAS_SCALE, FPS, BALL_SPEED} from './constants.js';

//////////////////////////////////////////////////////////////////
// Judge the game mode
const localButton = document.getElementById('localGameButton');
const onlineButton = document.getElementById('onlineGameButton');
let gameMode = '';

localButton.addEventListener('click', function () {
	
	gameMode = 'local';
	startLocalGame();
});

onlineButton.addEventListener('click', function () {
	
	gameMode = 'online';
	startOnlineGame();
});
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// Start the game
function startLocalGame() {

	setupKeyControls();
	setInterval(keyMovePad, 1000 / FPS);
	console.log('local game started');
}

function startOnlineGame() {

	window.addEventListener('mousemove', mouseMovePad);
	console.log('online game started');
}
//////////////////////////////////////////////////////////////////