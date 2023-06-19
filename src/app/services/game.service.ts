import { Injectable } from '@angular/core';
import { Player } from '../start-page/start-page.component';
import { Choice } from '../role-choice/role-choice.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Score } from '../game-page/game-page.component';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor() { }

    private savedPlayers = localStorage.getItem('RPS-Game-Players');
    private players: Array<Player> = this.savedPlayers ? JSON.parse(this.savedPlayers) : [{ name: 'Player 1', owner: 'human' }, { name: 'Player 2', owner: 'computer' }];
    private savedScore = localStorage.getItem('RPS-Game-Score');
    private score: BehaviorSubject<Score> = new BehaviorSubject(this.savedScore ? JSON.parse(this.savedScore) : { first: 0, second: 0 });

    setPlayer(newPlayers: Array<Player>): void {
        this.players = newPlayers;
        localStorage.setItem('RPS-Game-Players', JSON.stringify(this.players));
    }

    getPlayers(): Array<Player> {
        return this.players;
    }

    getChoices(): Array<Choice> {
        return Object.values(Choice);
    }

    setNewScore(newScore: Score): void {
        this.score.next(newScore);
        localStorage.setItem('RPS-Game-Score', JSON.stringify(newScore));
    }

    getScore(): Observable<Score> {
        return this.score.asObservable();
    }
}
