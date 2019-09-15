import { Component, OnInit, Input } from '@angular/core';
import { GameState } from '../game-state.model';

@Component({
  selector: 'app-game-guessable-word',
  templateUrl: './guessable-word.component.html',
})
export class GuessableWordComponent implements OnInit {
  @Input() game: GameState;

  constructor() { }

  ngOnInit() {
  }

  currentPlayer(): string {
    return this.game.players[this.game.round.currentPlayerIndex].playerName;
  }
  renderWhoIsCurrentPlayerMessage(): string {
    return `It is ${this.currentPlayer()}'s turn to guess!`;
  }

  renderWordVisually() {
    const splitWord = [...this.game.round.gameWord.word];

    console.log(splitWord);
    return splitWord.map((letter) => {
      return '_ ';
    }).join(',');
  }

}
