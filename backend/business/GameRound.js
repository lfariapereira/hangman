 const wordsList = require('./wordsList')

  // gameRound: {
  //    gameWord: {
  //        word: 'cheese',
  //        hints: []
  //    }
  //    rightLetters: ['e', 'c'],
  //    wrongLetters: ['z', 'd', 'f'],
  //    currentPlayerIndex: 1
  // },


class GameRound {


  constructor(maxGuesses) {
    const rawWord = this.fetchRandomWordFromList()
    this.gameWord = new gameWord(rawWord.word, rawWord.hints, maxGuesses);

    this.rightLetters = [];
    this.wrongLetters = [];
    this.currentPlayerIndex = 0;
  }

  fetchRandomWordFromList() {
    return wordsList[ GameRound.getRandomInt(0, wordsList.length) ];
  }

  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}


class gameWord {

  constructor(word, hints, maxGuesses) {
    this.word = word;
    this.hints = [];
    hints.map( (hint, hintIdx) => {

      console.log(Math.floor(maxGuesses / (hints.length + 1) ))
      const hintRound = !!hint.round ? hint.round : Math.floor( (hintIdx + 1) * maxGuesses / (hints.length + 1) )
      this.hints.push({
        description: hint.description,
        round: hintRound
      });
    })
  }
}

module.exports = GameRound;