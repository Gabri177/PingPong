// Drow game window and realise the game logic
const canvas = document.getElementById('gameWindow');
const ctx = canvas.getContext('2d');
const constant = {

	scaleBall: 0.03,
	scalePadWidth: 0.03,
	scalePadHeight: 0.2
};

var width = window.innerWidth * 0.6;
var height = window.innerHeight * 0.6;
var priviousHeight = window.innerHeight;

const ball = {

	x: width / 2,
	y: height / 2,
	radius: constant.scaleBall * (width > height ? height : width),
	speed: 5,
	velocityX: 5,
	velocityY: 5,
	color: 'white'
};

const currentPlayer = {

	x: 0,
	y: height / 2 - 100 / 2,
	width: constant.scalePadWidth * width,
	height: constant.scalePadHeight * height,
	color: 'white',
	score: 0
};

const enemyPlayer = {

	x: width - constant.scalePadWidth * width,
	y: height / 2 - 100 / 2,
	width: constant.scalePadWidth * width,
	height: constant.scalePadHeight * height,
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

	
	const heightRatio = window.innerHeight / priviousHeight;
	if(heightRatio != 1){
		
		currentPlayer.y *= heightRatio;
		enemyPlayer.y *= heightRatio;
		ball.y *= heightRatio;
		///////////////////////////////////
		// print the x and y of the player
		const info = document.getElementById('xandy');
		info.innerHTML = 'x: ' + currentPlayer.x + ' y: ' + currentPlayer.y + ' heightRatio: ' + heightRatio + '<br>' + ' priviousHeight: ' + priviousHeight + ' height: ' + window.innerHeight;
		///////////////////////////////////
	}
	priviousHeight = window.innerHeight;
	

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
	ball.radius = constant.scaleBall * (width > height ? height : width);
	ball.x = width / 2;
	ball.y = height / 2;
	drawBall();

	// reset the players
	currentPlayer.width = constant.scalePadWidth * width;
	currentPlayer.height = constant.scalePadHeight * height;
	currentPlayer.x = 0;
	drawPad(currentPlayer);

	//reset the enemy
	enemyPlayer.width = constant.scalePadWidth * width;
	enemyPlayer.height = constant.scalePadHeight * height;
	enemyPlayer.x = width - constant.scalePadWidth * width;
	//enemyPlayer.y = height / 2 - enemyPlayer.height / 2;
	drawPad(enemyPlayer);
}

function movePad(mouseInfo) {

	let rect = canvas.getBoundingClientRect();
	let mousey = mouseInfo.clientY - rect.top;
	if (mousey > currentPlayer.height / 2 && mousey < height - currentPlayer.height + currentPlayer.height / 2) {
		currentPlayer.y = mousey - currentPlayer.height / 2;
		redrawAll();
	}
}

window.addEventListener('resize', redrawAll);
window.addEventListener('mousemove', movePad);
window.onload = redrawAll;




////----------------------this is the websocket part----------------------
// const socket = new WebSocket('ws://localhost:8080');
// socket.addEventListener('open', function (event) {

//     console.log('WebSocket connection established');
// });
// socket.addEventListener('message', function (event) {

//     console.log('Message from server: ', event.data);
// });

// function sendPadInfo(info) {

//     if (socket.readyState === WebSocket.OPEN) {
//         socket.send( JSON.stringify({ type: 'paddleInfo', currentPlayer}));
//     }
// }
// function movePad(mouseInfo) {

//     let rect = canvas.getBoundingClientRect();
//     let mousey = mouseInfo.clientY - rect.top;
//     if (mousey > currentPlayer.height / 2 && mousey < height - currentPlayer.height / 2) {
//         currentPlayer.y = mousey - currentPlayer.height / 2;
//         redrawAll();
//         sendPadInfo(currentPlayer);
//     }
// }
////----------------------------------------------------------------------


