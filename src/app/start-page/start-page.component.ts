import { GameService } from './../services/game.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faComputer, faPerson } from '@fortawesome/free-solid-svg-icons';

export type Player = {
    name: string;
    owner: 'human' | 'computer';
};

@Component({
    selector: 'app-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.scss']
})

export class StartPageComponent {

    private gameService: GameService = inject(GameService);
    computerIcon: IconDefinition = faComputer;
    personIcon: IconDefinition = faPerson;
    players: Array<Player> = this.gameService.getPlayers();

    constructor(private router: Router) { }

    changePlayer(num: number, owner: 'computer' | 'human'): void {
        this.players[num].owner = owner;
    }

    onStart(): void {
        this.gameService.setPlayer(this.players);
        this.router.navigate(['/game']);
    }

    checkNames(): boolean {
        const name1 = this.players[0].name;
        const name2 = this.players[1].name;
        return (!name1 || name1.length === 0 || !name2 || name2.length === 0);
    }
}
