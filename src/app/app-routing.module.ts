import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { GamePageComponent } from './game-page/game-page.component';

const routes: Routes = [
    {path: 'game', component: GamePageComponent},
    {path: '**', component: StartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
