import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from '../../../services/skill.service';

@Component({
  selector: 'app-skill-card',
  standalone: false,
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss'
})
export class SkillCardComponent {
  @Input() skill!: Skill;
  @Output() choosePartner = new EventEmitter<Skill>();
  invitationSent = false;
  currentUserId = 1; // Mock current user ID - should match the one in add-skill-form

  constructor(private router: Router) {}

  onCardClick(): void {
    console.log('Card clicked - Skill:', this.skill);
    console.log('Skill ID:', this.skill.id, 'Type:', typeof this.skill.id);
    
    if (this.skill.id) {
      console.log('Navigating to skill details with ID:', this.skill.id);
      this.router.navigate(['/skills', this.skill.id]);
    } else {
      console.warn('Cannot navigate: skill.id is missing', this.skill);
    }
  }

  onChoosePartner(event: Event): void {
    event.stopPropagation();
    this.invitationSent = true;
  }

  isOwnSkill(): boolean {
    return this.skill.userId === this.currentUserId;
  }
}

