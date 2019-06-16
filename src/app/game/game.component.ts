import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GameService } from '../game.service';
import { GameState } from './game-state.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  private roomName = '';
  private nickname = '';

  private chatMessage = ''; // To be removed
  private messages: string[] = [];

  private gameState: GameState;
  private gameStateIsLoaded = false;

  public constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      /* Roomname and nickname must be provided, or the user will be redirected to the home room.*/
      if (!paramMap.has('roomName') || !paramMap.has('nickname')) {
        this.router.navigate(['/']);
      }

      this.roomName = paramMap.get('roomName');
      this.nickname = paramMap.get('nickname');
    });

    this.gameService.observeChatInitialList()
      .subscribe((initialList: string[]) => {
        this.messages = initialList;
      });

    this.gameService.observeGameStateUpdate()
      .subscribe((state: any) => {
        console.log(state);
        this.gameState = state;
      });

    this.gameService.observeGameErrors()
      .subscribe( message => {

        if (message === 'join-game-in-progress-error'){
          this.router.navigate(['/']);
          console.log('Game already started!!!');
        }
      });

    this.gameService.joinGameRoom(this.roomName, this.nickname);
    console.log(this.roomName);

      // Wait for the first state update message from the server before loading the client's page.
    this.gameService.gameStateHandler().then(async (game: GameState) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Artificially waits for loading time =)
      this.gameStateIsLoaded = true;
      this.gameState = game;
    });
  }

  leaveGameRoom() {
    this.gameService.leaveGameRoom(this.roomName, this.nickname);

    this.gameService.gameStateHandler().then(async (game: GameState) => {
      this.router.navigate(['/']);
    });
  }


  startGame() {
    this.gameService.startGame(this.roomName, this.nickname);
  }


  showChat() {
    return true;
  }

  sendMessage() {
    console.log(this.chatMessage);
    try {
      this.gameService.sendChatMessage(this.nickname, this.chatMessage);
      this.chatMessage = '';
    } catch {
      console.log('ERROR SENDING CHAT MESSAGE');
    }
  }
}
