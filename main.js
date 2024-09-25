import { keyMovePad, setGameType, getGameType, meshPadEnamy, setPlayerId, meshBall, uploadPositionBall} from '/pong.js';
import { FPS } from '/constants.js';
import { createWebSocket } from './socket.js';
import { setPositionPad, setPositionBall } from './infoHandler.js';


let gameState = false;
let intervalId = null;
let intervalIdBall = null;
let ballState = false;


const buttonStart = document.getElementById('pause');
const buttonLocalGame = document.getElementById('localGameButton');
const buttonOnlineGame = document.getElementById('onlineGameButton');

if (buttonStart) {
	buttonStart.addEventListener('click', function () {

		if (getGameType() == '') {

			alert('Please select a game type first.');
			return;
		} else {

			console.log('gameType:', getGameType());
			if (gameState) {
				clearInterval(intervalId);
				if (getGameType() === 'online')
					clearInterval(intervalIdBall);
				gameState = false;
				ballState = false;
				buttonStart.innerHTML = 'Start';
			} else {
				intervalId = setInterval(keyMovePad, 1000 / FPS);
				if (getGameType() === 'online')
					intervalIdBall = setInterval(uploadPositionBall, 1000 / 20);
				gameState = true;
				ballState = true;
				buttonStart.innerHTML = 'Pause';
			}
		}
	});
}else {
	
	console.log('buttonStart not found');
}


if (buttonLocalGame) {

	buttonLocalGame.addEventListener('click', function () {

		const elementPlayerName = document.getElementById('playerName');
		const elementEnamyName = document.getElementById('enamyName');
		elementEnamyName.innerHTML = 'Player 2';
		elementPlayerName.innerHTML = 'Player 1';
		setGameType('local');
		console.log('Game type set to local');
	});
}

if (buttonOnlineGame) {

	buttonOnlineGame.addEventListener('click', function () {

		setGameType('online');
		console.log('Game type set to online');
		createWebSocket(infoHandler);
	});
}

function infoHandler(newInfo) {

	if (newInfo.action === 'initInfo'){

		const elementPlayerName = document.getElementById('playerName');
		const elementEnamyName = document.getElementById('enamyName');
		elementEnamyName.innerHTML = newInfo.enamyName;
		elementPlayerName.innerHTML = newInfo.playerName;
		setPlayerId(newInfo.userId);

	} else if (newInfo.action === 'updatePad'){

		setPositionPad(newInfo.newPosition, meshPadEnamy);
	} else if (newInfo.action === 'updateBall'){

		setPositionBall(newInfo.newPosition, meshBall);
	} else {

		console.error('Invalid info type from server.');
	}
}
