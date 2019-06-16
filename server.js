const app = require("./backend/app");
const http = require("http");
const setup = require("./backend/setup");
const socket_io = require("socket.io");

const { Games } = require("./backend/business/game"); 
const { GameProtocol, incomingMessagesList } = require("./backend/business/GameProtocol");

const port = setup.normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", setup.onError);
server.on("listening", setup.onListening(server, port));

const io = socket_io(server);
const gamesList = new Games();

io.on('connection', (socket) => {

  gameProtocol = new GameProtocol(socket, io, gamesList);

  incomingMessagesList.map((messageName) => socket.on(messageName, gameProtocol.callbacks[messageName]));
});

server.listen(port);

