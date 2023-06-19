import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { faHand, faHandBackFist, faHandScissors } from '@fortawesome/free-solid-svg-icons';
import { GameService } from '../services/game.service';
import { PlayerChoice } from '../game-page/game-page.component';

export enum Choice {
    Rock = 'rock',
    Paper = 'paper',
    Scissors = 'scissors'
}

@Component({
    selector: 'app-role-choice',
    templateUrl: './role-choice.component.html',
    styleUrls: ['./role-choice.component.scss']
})
export class RoleChoiceComponent {

    @Input() playerId: string;
    @Output() newChoiceEmitter = new EventEmitter<PlayerChoice>();

    private gameService = inject(GameService);
    choices = this.gameService.getChoices();
    paperIcon = faHand;
    rockIcon = faHandBackFist;
    scissorsIcon = faHandScissors;
    chosenRole: Choice;

    chooseRole(): void {
        if (this.chosenRole) {
            this.newChoiceEmitter.emit({ num: Number(this.playerId), choice: this.chosenRole });
        }
    }
}
