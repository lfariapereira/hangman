 
incomingMessagesList = [
  'join-game',
  'leave-game',
  'start-game',
  'chat-message'
];

class GameProtocol {

  constructor(socket, io, gamesList) {

    this.callbacks = {
      'join-game': (roomName, playerName) => {
        socket.join(roomName);
        const game = gamesList.getGame(roomName);

        // A player can only join a game in progress that accounts him as a player.
        if (game.gamePhase != 'pre' && !game.isPlayerInGame(playerName)) {
          console.dir(game.players)
          socket.emit('error-messages', 'join-game-in-progress-error');
          return;
        }

        game.onPlayerJoin(playerName);
        io.emit('update-game-state', game);
      },

      'leave-game': (roomName, playerName) => {
        const game = gamesList.getGame(roomName);
        game.onPlayerLeave(playerName);
        io.emit('update-game-state', game);
        socket.leave(roomName);
      },

      'start-game': (roomName, playerName) => {
        const game = gamesList.getGame(roomName);
      
        // The game should only be started by a player who is in the room.
        const validation = game.players.find( (elem) => elem.playerName === playerName);
        if( validation === undefined ) {
          socket.emit('error-messages', 'on-start-game-error');
          return;
        }
      
        game.startNewGameRound();
        io.emit('update-game-state', game);
      },

      'chat-message': (roomName, playerName, message) => {
        const game = gamesList.getGame(roomName);
        game.addChatMessage(playerName, message);
        io.emit('update-game-state', game);
      }
    }

  }
}

module.exports = {
  GameProtocol,
  incomingMessagesList
}