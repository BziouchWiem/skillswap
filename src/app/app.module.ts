import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SkillsListComponent } from './components/skills/skills-list/skills-list.component';
import { SkillCardComponent } from './components/skills/skill-card/skill-card.component';
import { SkillDetailsComponent } from './components/skills/skill-details/skill-details.component';
import { AddSkillFormComponent } from './components/skills/add-skill-form/add-skill-form.component';
import { MatchListComponent } from './components/matches/match-list/match-list.component';
import { StarRatingPipe } from './pipes/star-rating.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SkillsListComponent,
    SkillCardComponent,
    SkillDetailsComponent,
    AddSkillFormComponent,
    MatchListComponent,
    StarRatingPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
