import { output } from './apoyo.js';
import {SCALE_BALL, SCALE_PAD_WIDTH, SCALE_PAD_HEIGHT, CANVAS_SCALE, FPS} from './constants.js';
import { keyState, setupKeyControls } from './controls.js';


// Drow game window and realise the game logic
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

function startLocalGame() {

	setupKeyControls();
	setInterval(keyMovePad, 1000 / FPS);
	console.log('local game started');
}

function startOnlineGame() {

	window.addEventListener('mousemove', mouseMovePad);
	console.log('online game started');
}


const canvas = document.getElementById('gameWindow');
const ctx = canvas.getContext('2d');

//define the game window size
var width = window.innerWidth * CANVAS_SCALE;
var height = window.innerHeight * CANVAS_SCALE;
//save the privious window size
var priviousHeight = window.innerHeight;
var priviousWidth = window.innerWidth;

const ball = {

	x: width / 2,
	y: height / 2,
	radius: SCALE_BALL * (width > height ? height : width),
	speed: 5,
	velocityX: 5,
	velocityY: 5,
	color: 'white'
};

const currentPlayer = {

	x: 0,
	y: height / 2 - 100 / 2,
	width: SCALE_PAD_WIDTH * width,
	height: SCALE_PAD_HEIGHT * height,
	color: 'white',
	score: 0
};

const enemyPlayer = {

	x: width - SCALE_PAD_WIDTH * width,
	y: height / 2 - 100 / 2,
	width: SCALE_PAD_WIDTH * width,
	height: SCALE_PAD_HEIGHT * height,
	color: 'white',
	score: 0
};

function drawBall() {

	ctx.fillStyle = ball.color;
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fill();
}

function drawPad(padInfo) {

	ctx.fillStyle = padInfo.color;
	ctx.fillRect(padInfo.x, padInfo.y, padInfo.width, padInfo.height);
}

function redrawAll() {
	
	// Set the canvas to the window size
	width = window.innerWidth * 0.6;
	height = window.innerHeight * 0.6;
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
	drawBall();

	// reset the players
	currentPlayer.width = SCALE_PAD_WIDTH * width;
	currentPlayer.height = SCALE_PAD_HEIGHT * height;
	currentPlayer.x = 0;
	drawPad(currentPlayer);

	//reset the enemy
	enemyPlayer.width = SCALE_PAD_WIDTH * width;
	enemyPlayer.height = SCALE_PAD_HEIGHT * height;
	enemyPlayer.x = width - SCALE_PAD_WIDTH * width;
	drawPad(enemyPlayer);
}

function mouseMovePad(mouseInfo) {

	let rect = canvas.getBoundingClientRect();
	let mousey = mouseInfo.clientY - rect.top;
	if (mousey >= currentPlayer.height / 2 && mousey <= height - currentPlayer.height + currentPlayer.height / 2) {
		currentPlayer.y = mousey - currentPlayer.height / 2;
		//console.log(currentPlayer.y);
		redrawAll();
	}
}

function keyMovePad() {

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






