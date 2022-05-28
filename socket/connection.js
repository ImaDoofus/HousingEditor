const IO = Java.type("io.socket.client.IO");

const socket = IO.socket('ws://localhost:3000'); // create socket
socket.connect(); // connect to server

socket.on('connect', () => {
	console.log(`Connected Socket with id: ${socket.id()}`);
});

socket.on('disconnect', () => {
	console.log(`Disconnected socket with id: ${socket.id()}`);
})

// disconnect the socket on /ct reload
// without this the socket will keep on running and can cause some issues
// Documentation: https://chattriggers.com/javadocs/-chat-triggers/com.chattriggers.ctjs.engine/-i-register/register-game-unload.html
register('gameUnload', () => { 
	socket.disconnect();
})

export default socket;