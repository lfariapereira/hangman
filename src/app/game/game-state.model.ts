
export type GamePhaseType = 'pre' | 'during' | 'after';

export class GameState {

  public roomName: string;
  public players: Player[];
  public chatHistory: ChatMessage[];

  public gamePhase: GamePhaseType;
  public round: GameRound;

}

export interface ChatMessage {
  playerName: string;
  message: string;
  time: Date;
}


export interface Player {
  playerName: string;
  score: number;
}

export interface GameRound {
  gameWord: {
    word: string,
    hints: string[]
  };
  rightLetters: string[];
  wrongLetters: string[];
  currentPlayerIndex: number;
}
