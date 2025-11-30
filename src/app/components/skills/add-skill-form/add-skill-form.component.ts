import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-add-skill-form',
  standalone: false,
  templateUrl: './add-skill-form.component.html',
  styleUrl: './add-skill-form.component.scss'
})
export class AddSkillFormComponent implements OnInit {
  skillForm!: FormGroup;
  categories = ['Programmation', 'Design', 'Marketing', 'Musique', 'Audiovisuel', 'Bureautique', 'Art', 'Autre'];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private skillService: SkillService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.skillForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      level: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      offering: ['', Validators.required],
      seeking: ['', Validators.required],
      duration: ['', Validators.required],
      tags: ['']
    });
  }

  get f() {
    return this.skillForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.skillForm.invalid) {
      return;
    }

    const skillData = {
      ...this.skillForm.value,
      userId: 1, // Mock user ID
      userName: 'Utilisateur Demo',
      userAvatar: '👤',
      available: true,
      tags: this.skillForm.value.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t)
    };

    this.skillService.addSkill(skillData).subscribe({
      next: () => {
        alert('✅ Compétence ajoutée avec succès!');
        this.router.navigate(['/skills']);
      },
      error: (error) => {
        console.error('Erreur:', error);
        alert('❌ Erreur lors de l\'ajout de la compétence');
      }
    });
  }
}

