import { output } from './support.js';
import { SCALE_BALL, SCALE_PAD_WIDTH, SCALE_PAD_HEIGHT, BALL_SPEED } from './constants.js';
import { keyState } from './controls.js';
import { initGameInfo, drawBall, drawPad } from './gameInit.js';

// Get the game info (game init)
const { canvas, ctx, ball, currentPlayer, enemyPlayer } = initGameInfo('gameWindow');

// Ball movement direction
let ballDirectionX = BALL_SPEED;
let ballDirectionY = BALL_SPEED;

// Draw game window and realize the game logic
function redrawAll() {
    // Set the canvas size
    canvas.width = window.innerWidth * 0.6;
    canvas.height = window.innerHeight * 0.6;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the center line
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Move the ball
    ball.x += ballDirectionX;
    ball.y += ballDirectionY;

    // Check if the ball hits the top or bottom wall
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ballDirectionY *= -1;  // Reverse ball direction on Y axis
    }

    // Check if the ball hits the left or right wall
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ballDirectionX *= -1;  // Reverse ball direction on X axis
    }

    // Draw the ball
    drawBall(ctx, ball);

    // Draw the paddles
    drawPad(ctx, currentPlayer);
    drawPad(ctx, enemyPlayer);
}

export function mouseMovePad(mouseInfo) {
    const rect = canvas.getBoundingClientRect();
    const mousey = mouseInfo.clientY - rect.top;
    currentPlayer.y = mousey - currentPlayer.height / 2;
    redrawAll();
}

export function keyMovePad() {
    if (keyState['w'] && currentPlayer.y > 0) {
        currentPlayer.y -= 10;  // Move up
    }
    if (keyState['s'] && currentPlayer.y < canvas.height - currentPlayer.height) {
        currentPlayer.y += 10;  // Move down
    }

    // Move enemy paddle (optional: based on AI or simple key control)
    if (keyState['p'] && enemyPlayer.y > 0) {
        enemyPlayer.y -= 10;  // Move up
    }
    if (keyState['l'] && enemyPlayer.y < canvas.height - enemyPlayer.height) {
        enemyPlayer.y += 10;  // Move down
    }

    redrawAll();
}

window.addEventListener('resize', redrawAll);
window.onload = redrawAll;
setInterval(() => {
    redrawAll();
}, 1000 / 60); // 60 FPS for smooth ball movement
