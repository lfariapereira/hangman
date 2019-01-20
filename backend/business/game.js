class Games {

  constructor() {
    this.games = {}
  }

  getGame(gameName) {

    console.log( Object.keys(this.games) );
    if( Object.keys(this.games).indexOf(gameName) === -1 ) {
      this.games[gameName] = new Game(gameName);
      console.log(`Creating new Game ${gameName}.`);
    }
    return this.games[gameName];
  }
}

class Game {

  constructor(roomName) {
    this.roomName = roomName;
    this.players = [];
    this.chatHistory = [];
  }

  findPlayerByName(playerName) {
    return this.players.find( k => k.playerName == playerName)
  }

  onPlayerJoin(playerName) {
    if( this.findPlayerByName(playerName) === undefined ) {
      const newPlayer = new Player(playerName);
      this.players.push(newPlayer);
      this.addChatMessage(playerName, "Has joined the game");
    }
    else {
      this.addChatMessage(playerName, "Has reconnected to the room");
    }
  }

  onPlayerLeave(playerName) {
    const playerIndex = this.findPlayerByName(playerName)
    if(!!playerIndex) {
      this.addChatMessage(playerName, "Has left the game");
      this.players.splice(playerIndex, 1);
      return true;
    }
    else {
      console.log(`${playerName} is not listed in the game.`);
      return false;
    }
  }

  addChatMessage(playerName, message) {
    const msg = new ChatMessage(playerName, message);
    this.chatHistory.push(msg);
  }
}


class ChatMessage {
  constructor(playerName, message) {
    this.playerName = playerName;
    this.message = message;
    this.time = Date.now();
  }
}

class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.score = 0;
  }
}

module.exports = {
  Games,
  Game,
  Player,
  ChatMessage
}