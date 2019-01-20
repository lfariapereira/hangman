const app = require("./backend/app");
const http = require("http");
const setup = require("./backend/setup");
const socket_io = require("socket.io");

const {Games, ChatMessage} = require("./backend/business/game"); 

const port = setup.normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", setup.onError);
server.on("listening", setup.onListening(server, port));

const io = socket_io(server);
const gamesList = new Games();

io.on('connection', (socket) => {


  socket.on('join-game', (roomName, playerName) => {
    console.log(roomName, playerName);
    socket.join(roomName);
    const game = gamesList.getGame(roomName);
    game.onPlayerJoin(playerName);
    io.emit('update-game-state', game);
  })

  socket.on('leave-game', (roomName, playerName) => {
    const game = gamesList.getGame(roomName);
    game.onPlayerLeave(playerName);
    io.emit('update-game-state', game);
    socket.leave('roomName');
  })

  // const messageList = chatMessages.getList();
  // io.emit('chat-initial-list', messageList);


  socket.on('chat-message', (roomName, playerName, message) => {
    const game = gamesList.getGame(roomName);
    game.addChatMessage(playerName, message);
    io.emit('update-game-state', game);
  });

  // io.to('some roomName').emit('some event');
  // console.log('alo');

});

server.listen(port);
