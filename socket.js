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
// function mouseMovePad(mouseInfo) {

//     let rect = canvas.getBoundingClientRect();
//     let mousey = mouseInfo.clientY - rect.top;
//     if (mousey > currentPlayer.height / 2 && mousey < height - currentPlayer.height / 2) {
//         currentPlayer.y = mousey - currentPlayer.height / 2;
//         redrawAll();
//         sendPadInfo(currentPlayer);
//     }
// }
////----------------------------------------------------------------------
