import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SkillsListComponent } from './components/skills/skills-list/skills-list.component';
import { SkillDetailsComponent } from './components/skills/skill-details/skill-details.component';
import { AddSkillFormComponent } from './components/skills/add-skill-form/add-skill-form.component';
import { MatchListComponent } from './components/matches/match-list/match-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'skills', component: SkillsListComponent },
  { path: 'skills/:id', component: SkillDetailsComponent },
  { path: 'add-skill', component: AddSkillFormComponent },
  { path: 'matches', component: MatchListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

