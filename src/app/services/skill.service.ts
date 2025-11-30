import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Skill {
  id?: number;
  title: string;
  category: string;
  level: number;
  description: string;
  offering: string;
  seeking: string;
  userId: number;
  userName: string;
  userAvatar: string;
  duration: string;
  available: boolean;
  tags: string[];
}

export interface Match {
  id?: number;
  skill1Id: number;
  skill2Id: number;
  user1Id: number;
  user2Id: number;
  status: 'pending' | 'accepted' | 'rejected';
  matchScore: number;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  skills: number[];
  rating: number;
  exchanges: number;
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Skills endpoints
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}/skills`);
  }

  getSkillById(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.baseUrl}/skills/${id}`);
  }

  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.baseUrl}/skills`, skill);
  }

  updateSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.baseUrl}/skills/${skill.id}`, skill);
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/skills/${id}`);
  }

  // Matches endpoints
  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/matches`);
  }

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(`${this.baseUrl}/matches`, match);
  }

  updateMatch(match: Match): Observable<Match> {
    return this.http.put<Match>(`${this.baseUrl}/matches/${match.id}`, match);
  }

  // Users endpoints
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  // Matching algorithm
  findMatches(skillId: number, skills: Skill[]): Skill[] {
    const currentSkill = skills.find(s => s.id === skillId);
    if (!currentSkill) return [];

    return skills
      .filter(s => s.id !== skillId && s.available)
      .map(s => ({
        ...s,
        matchScore: this.calculateMatchScore(currentSkill, s)
      }))
      .filter(s => (s as any).matchScore > 0)
      .sort((a, b) => (b as any).matchScore - (a as any).matchScore);
  }

  private calculateMatchScore(skill1: Skill, skill2: Skill): number {
    let score = 0;

    // Check if what skill1 offers matches what skill2 seeks
    const offering1 = skill1.offering.toLowerCase();
    const seeking2 = skill2.seeking.toLowerCase();
    if (this.hasOverlap(offering1, seeking2)) {
      score += 50;
    }

    // Check if what skill2 offers matches what skill1 seeks
    const offering2 = skill2.offering.toLowerCase();
    const seeking1 = skill1.seeking.toLowerCase();
    if (this.hasOverlap(offering2, seeking1)) {
      score += 50;
    }

    // Bonus for similar categories
    if (skill1.category === skill2.category) {
      score += 10;
    }

    // Bonus for common tags
    const commonTags = skill1.tags.filter(tag => 
      skill2.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    score += commonTags.length * 5;

    return Math.min(score, 100);
  }

  private hasOverlap(text1: string, text2: string): boolean {
    const words1 = text1.split(/[\s,]+/).filter(w => w.length > 3);
    const words2 = text2.split(/[\s,]+/).filter(w => w.length > 3);
    
    return words1.some(w1 => 
      words2.some(w2 => 
        w1.includes(w2) || w2.includes(w1)
      )
    );
  }
}

