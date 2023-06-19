import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { GameService } from '../services/game.service';
import { Choice } from '../role-choice/role-choice.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IconDefinition, faGear } from '@fortawesome/free-solid-svg-icons';
import { Player } from '../start-page/start-page.component';

export type Score = {
    first: number;
    second: number;
};

export type PlayerChoice = {
    num: number;
    choice: Choice;
};

@Component({
    selector: 'app-game-page',
    templateUrl: './game-page.component.html',
    styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {

    private gameService: GameService = inject(GameService);
    players: Array<Player> = this.gameService.getPlayers();
    player1: Player = this.players[0];
    player2: Player = this.players[1];
    player1Choice: Choice;
    player2Choice: Choice;
    score: Score;
    sub: Subscription = this.gameService.getScore().subscribe(
        score => this.score = score
    );
    gearIcon: IconDefinition = faGear;
    choices: Array<Choice> = this.gameService.getChoices();
    winner: string;

    // explanation of winning conditions:
    // two-dimensional array, first index is chosen role of first player and second is chosen role from second player
    // rock - 0, paper - 1, scissors - 2
    // and logic for result is: 0 - draw, 1 - first win, 2 - second wins
    winningConditions = [
        [0, 2, 1],
        [1, 0, 2],
        [2, 1, 0]
    ];

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.autoDeterminePlayerChoices();
    }

    autoDeterminePlayerChoices(): void {
        if (this.player1.owner === 'computer') {
            this.player1Choice = this.getRandomChoice();
        }
        if (this.player2.owner === 'computer') {
            this.player2Choice = this.getRandomChoice();
        }
        this.determineWinner();
    }

    manualDeterminePlayerChoice(event: PlayerChoice): void {
        if (event.num === 1) {
            this.player1Choice = event.choice;
        } else {
            this.player2Choice = event.choice;
        }
        this.determineWinner();
    }

    getRandomChoice(): Choice {
        const choices = Object.values(Choice);
        const chosenIndex = Math.floor(Math.random() * choices.length);
        return choices[chosenIndex];
    }

    determineWinner(): void {
        if (this.player1Choice && this.player2Choice) {
            const firstIndex = this.choices.findIndex((element) => element === this.player1Choice);
            const secondIndex = this.choices.findIndex((element) => element === this.player2Choice);

            const winner = this.winningConditions[firstIndex][secondIndex];
            switch (winner) {
                case 0:
                    this.winner = 'TIE';
                    break;
                case 1:
                    this.winner = this.player1.name;
                    this.gameService.setNewScore({ first: this.score.first + 1, second: this.score.second });
                    break;
                case 2:
                    this.winner = this.player2.name;
                    this.gameService.setNewScore({ first: this.score.first, second: this.score.second + 1 });
                    break;
            }
        }
    }

    resetWinnerAndChoices(): void {
        this.winner = null!;
        this.player1Choice = null!;
        this.player2Choice = null!;
        this.autoDeterminePlayerChoices();
    }

    startNewGame(): void {
        this.gameService.setNewScore({ first: 0, second: 0 });
        this.resetWinnerAndChoices();
        this.router.navigate(['/']);
    }

    changePlayersSettings(): void {
        this.router.navigate(['/']);
    }

    continueGame(): void {
        this.resetWinnerAndChoices();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
