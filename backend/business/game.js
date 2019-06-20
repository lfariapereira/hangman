const GameRound = require('./GameRound');
const TOTAL_ROUNDS = 5;
const MAX_GUESSES_PER_WORD = 6;

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

  // round: {
  //   word: 'cheese',
  //   rightLetters: ['e', 'c'],
  //   wrongLetters: ['z', 'd', 'f'],
  //   currentPlayerIndex: 1
  // },
  // players: [Ada, Bete]
  // gamePhase: 'pre' | 'during' | 'after',
  // roundNumber: 1 
  // totalRounds: 5

  

  constructor(roomName) {
    this.roomName = roomName;
    this.players = [];
    this.chatHistory = [];

    this.round = {};
    this.gamePhase = 'pre';
    this.roundNumber = 0;
    this.totalRounds = TOTAL_ROUNDS;
    this.maxGuesses = MAX_GUESSES_PER_WORD;
  }

  startNewGameRound() {
    this.round = new GameRound(this.maxGuesses);
    this.gamePhase = 'during';
    this.roundNumber += 1;

    //CLEAR PLAYERS SCORE IF ITS LATEST ROUND!

    console.log(this.round);
  }

  findPlayerByName(playerName) {
    return this.players.find( k => k.playerName == playerName)
  }

  isPlayerInGame(playerName) {
    return this.players.find( k => k.playerName == playerName) !== undefined 
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
      this.players = this.players.filter( item => item.playerName !== playerName );
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