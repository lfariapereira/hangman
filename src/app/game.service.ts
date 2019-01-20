import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { GameState } from './game/game-state.model';

export class GameService {
  private serverUrl = 'http://localhost:3000';
  private socket;
  public gameState: GameState;

  constructor() {
    this.socket = io(this.serverUrl);
    this.setConnectObservable();
  }

  public observeChatInitialList() {
    return Observable.create((observer) => {
      this.socket.on('chat-initial-list', (initialMessages: string[]) => {
          observer.next(initialMessages);
      });
    });
  }

  public observeGameStateUpdate() {
    return Observable.create((observer) => {
      this.socket.on('update-game-state', (game: GameState) => {
          this.gameState = game;
          observer.next(game);
      });
    });
  }

  public setConnectObservable() {
    return Observable.create((observer) => {
        this.socket.on('connect', () => {
            console.log(`Connection estabilished to the server ${this.serverUrl}`);
        });
    });
  }

  public connectHandler(): Promise<any> {

    return new Promise((resolve) => {
      this.socket.on('connect', () => {
        console.log(`Connection estabilished to the server ${this.serverUrl}`);
        resolve();
      });
    });
  }


  public gameStateHandler(): Promise<any> {
    return new Promise((resolve) => {
      this.socket.on('update-game-state', (game: GameState) => {
        console.log(`Initial game room state obtained successfully!`);
        this.gameState = game;
        resolve(game);
      });
    });
  }


  public sendChatMessage(playerName: string, message: string) {
    const roomName = this.gameState.roomName;
    this.socket.emit('chat-message', roomName, playerName, message);
  }

  public joinGameRoom(roomName: string, playerName: string) {
    console.log(roomName, playerName);
    this.socket.emit('join-game', roomName, playerName);
  }

  public leaveGameRoom(roomName: string, playerName: string) {
    console.log(roomName, playerName);
    this.socket.emit('leave-game', roomName, playerName);
  }
}
