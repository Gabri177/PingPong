import { output } from './apoyo.js';
import {SCALE_BALL, SCALE_PAD_WIDTH, SCALE_PAD_HEIGHT, CANVAS_SCALE, FPS, BALL_SPEED} from './constants.js';
import { keyState, setupKeyControls } from './controls.js';
import { initGameInfo, drawBall, drawPad } from './gameInit.js';

// Get the game info (game init)
const { canvas, ctx, ball, currentPlayer, enemyPlayer } = initGameInfo('gameWindow');
let   { width, height, priviousHeight, priviousWidth } = initGameInfo('gameWindow');

// Drow game window and realise the game logic
function redrawAll() {
	
	// Set the canvas to the window size
	width = window.innerWidth * CANVAS_SCALE;
	height = window.innerHeight * CANVAS_SCALE;
	canvas.width = width;
	canvas.height = height;

	////////////////////////////////////////////////////////////////
	// Check if the window size has changed
	const heightRatio = window.innerHeight / priviousHeight;
	const widthRatio = window.innerWidth / priviousWidth;
	if(heightRatio != 1 || widthRatio != 1) {
		
		currentPlayer.y *= heightRatio;
		enemyPlayer.y *= heightRatio;
		ball.y *= heightRatio;
		ball.x *= widthRatio;
		///////////////////////////////////
		// print the x and y of the player
		const info = document.getElementById('xandy');
		info.innerHTML = 'x: ' + currentPlayer.x + ' y: ' + currentPlayer.y + ' heightRatio: ' + heightRatio + '<br>' + ' priviousHeight: ' + priviousHeight + ' height: ' + window.innerHeight;
		///////////////////////////////////
	}
	priviousHeight = window.innerHeight;
	priviousWidth = window.innerWidth;
	////////////////////////////////////////////////////////////////

	// Draw the center line
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.setLineDash([10, 10]);
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 2;

	ctx.beginPath();
	ctx.moveTo(canvas.width / 2, 0);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.stroke();

	// reset the ball
	ball.radius = SCALE_BALL * (width > height ? height : width);
	drawBall(ctx, ball);

	// reset the players
	currentPlayer.width = SCALE_PAD_WIDTH * width;
	currentPlayer.height = SCALE_PAD_HEIGHT * height;
	currentPlayer.x = 0;
	drawPad(ctx, currentPlayer);

	//reset the enemy
	enemyPlayer.width = SCALE_PAD_WIDTH * width;
	enemyPlayer.height = SCALE_PAD_HEIGHT * height;
	enemyPlayer.x = width - SCALE_PAD_WIDTH * width;
	drawPad(ctx, enemyPlayer);
}

export function mouseMovePad(mouseInfo) {

	let rect = canvas.getBoundingClientRect();
	let mousey = mouseInfo.clientY - rect.top;
	if (mousey >= currentPlayer.height / 2 && mousey <= height - currentPlayer.height + currentPlayer.height / 2) {
		currentPlayer.y = mousey - currentPlayer.height / 2;
		//console.log(currentPlayer.y);
		redrawAll();
	}
}

export function keyMovePad() {

    if (keyState['w'] && currentPlayer.y > 0)
        currentPlayer.y = Math.max(currentPlayer.y - 10, 0);
    if (keyState['s'] && currentPlayer.y < height - currentPlayer.height)
        currentPlayer.y = Math.min(currentPlayer.y + 10, height - currentPlayer.height);


    if (keyState['p'] && enemyPlayer.y > 0)
        enemyPlayer.y = Math.max(enemyPlayer.y - 10, 0);

    if (keyState['l'] && enemyPlayer.y < height - enemyPlayer.height)
        enemyPlayer.y = Math.min(enemyPlayer.y + 10, height - enemyPlayer.height);

    redrawAll();
}


window.addEventListener('resize', redrawAll);
window.onload = redrawAll;
