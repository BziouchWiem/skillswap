import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService, Skill, Match } from '../../../services/skill.service';

@Component({
  selector: 'app-skill-details',
  standalone: false,
  templateUrl: './skill-details.component.html',
  styleUrl: './skill-details.component.scss'
})
export class SkillDetailsComponent implements OnInit {
  skill: Skill | null = null;
  loading = true;
  error: string | null = null;
  matches: Skill[] = [];
  showMatchesModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadSkillDetails(id);
    });
  }

  loadSkillDetails(id: string): void {
    this.loading = true;
    this.error = null;
    
    // Pass ID as received from route (JSON Server handles both string and numeric IDs)
    console.log('Loading skill details for ID:', id, 'Type:', typeof id);
    
    this.skillService.getSkillById(id).subscribe({
      next: (data) => {
        console.log('Successfully loaded skill:', data);
        console.log('Offering:', data.offering);
        console.log('Seeking:', data.seeking);
        this.skill = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading skill details:', {
          status: err.status,
          statusText: err.statusText,
          url: err.url,
          message: err.message,
          id: id
        });
        this.error = `Failed to load skill details (${err.status || 'Network error'})`;
        this.loading = false;
      }
    });
  }

  getStarRating(level: number): string {
    return '⭐'.repeat(level);
  }

  getLevelText(level: number): string {
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];
    return levels[level - 1] || 'Unknown';
  }

  findMatches(): void {
    if (!this.skill || !this.skill.id) {
      console.warn('Cannot find matches: skill or skill ID is missing');
      return;
    }
    
    this.skillService.getSkills().subscribe({
      next: (skills) => {
        this.matches = this.skillService.findMatches(this.skill!.id!, skills);
        this.showMatchesModal = true;
      },
      error: (err) => {
        console.error('Error finding matches:', err);
      }
    });
  }

  closeMatchesModal(): void {
    this.showMatchesModal = false;
  }

  goBack(): void {
    this.router.navigate(['/skills']);
  }

  initiateExchange(matchSkill: Skill): void {
    alert(`Exchange initiated with ${matchSkill.userName}!`);
    this.closeMatchesModal();
  }

  sendMessage(): void {
    alert(`Message sent to ${this.skill?.userName}!`);
  }

  reportSkill(): void {
    alert('Report submitted. Thank you for helping keep the community safe.');
  }
}
