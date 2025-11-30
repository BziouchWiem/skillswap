import { Component, Input } from '@angular/core';
import { Skill } from '../../../services/skill.service';

@Component({
  selector: 'app-skill-card',
  standalone: false,
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss'
})
export class SkillCardComponent {
  @Input() skill!: Skill;
}

