import { SCALE_BALL, SCALE_PAD_WIDTH, SCALE_PAD_HEIGHT } from './constants.js';

export function initGameInfo(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    const width = window.innerWidth * 0.6;
    const height = window.innerHeight * 0.6;

    const ball = {
        x: width / 2,  // Center of canvas
        y: height / 2,  // Center of canvas
        radius: SCALE_BALL * Math.min(width, height),  // Scale the ball size
        speed: 5,
        velocityX: 3,
        velocityY: 3,
        color: 'white'
    };

    const currentPlayer = {
        x: 0,
        y: height / 2 - 50,
        width: SCALE_PAD_WIDTH * width,
        height: SCALE_PAD_HEIGHT * height,
        color: 'white',
        score: 0
    };

    const enemyPlayer = {
        x: width - (SCALE_PAD_WIDTH * width),
        y: height / 2 - 50,
        width: SCALE_PAD_WIDTH * width,
        height: SCALE_PAD_HEIGHT * height,
        color: 'white',
        score: 0
    };

    return { canvas, ctx, ball, currentPlayer, enemyPlayer };
}

export function drawBall(ctx, ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

export function drawPad(ctx, padInfo) {
    ctx.fillStyle = padInfo.color;
    ctx.fillRect(padInfo.x, padInfo.y, padInfo.width, padInfo.height);
}
