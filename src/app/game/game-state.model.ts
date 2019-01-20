
export type GamePhaseType = 'pre' | 'during' | 'after';

export class GameState {

  public roomName: string;
  public players: Player[];
  public chatHistory: ChatMessage[];

  public gamePhase: GamePhaseType;

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
