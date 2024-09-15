import { CANVAS_SCALE, BALL_SPEED, SCALE_BALL, SCALE_PAD_WIDTH, SCALE_PAD_HEIGHT, FPS } from './constants.js';

export function initGameInfo(canvasId) {

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    var   width = window.innerWidth * CANVAS_SCALE;
    var   height = window.innerHeight * CANVAS_SCALE;
	var   priviousHeight = window.innerHeight;
	var   priviousWidth = window.innerWidth;

    const ball = {
        x: width / 2,
        y: height / 2,
        radius: SCALE_BALL * (width > height ? height : width),
        speed: BALL_SPEED,
        velocityX: BALL_SPEED,
        velocityY: BALL_SPEED,
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

    return { canvas, ctx, ball, currentPlayer, enemyPlayer, width, height, priviousHeight, priviousWidth };
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