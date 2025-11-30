import { Component, OnInit } from '@angular/core';
import { SkillService, Skill } from '../../../services/skill.service';

@Component({
  selector: 'app-skills-list',
  standalone: false,
  templateUrl: './skills-list.component.html',
  styleUrl: './skills-list.component.scss'
})
export class SkillsListComponent implements OnInit {
  skills: Skill[] = [];
  filteredSkills: Skill[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  searchTerm: string = '';
  loading: boolean = true;

  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
        this.filteredSkills = skills;
        this.categories = ['all', ...new Set(skills.map(s => s.category))];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des compétences:', error);
        this.loading = false;
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredSkills = this.skills.filter(skill => {
      const matchesCategory = this.selectedCategory === 'all' || skill.category === this.selectedCategory;
      const matchesSearch = !this.searchTerm ||
        skill.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        skill.tags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }
}

