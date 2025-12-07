import { Component, OnInit } from '@angular/core';

interface Invitation {
  id?: number;
  score: number;
  status: 'pending' | 'accepted';
  partner: {
    name: string;
    avatar: string;
    skill: string;
  };
  yourSkill: string;
  reason: string;
}

@Component({
  selector: 'app-match-list',
  standalone: false,
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.scss'
})
export class MatchListComponent implements OnInit {
  invitations: Invitation[] = [];

  currentIndex: number = 0;
  swiped: boolean = false;
  swipeDirection: 'left' | 'right' | null = null;

  ngOnInit(): void {
    this.loadInvitations();
  }

  loadInvitations(): void {
    // Load default invitations
    const defaultInvitations: Invitation[] = [
      {
        id: 1,
        score: 85,
        status: 'pending',
        partner: {
          name: 'Sophie Martin',
          avatar: '👩‍🎨',
          skill: 'Photoshop & Design'
        },
        yourSkill: 'Excel & Data Analysis',
        reason: 'Sophie propose Photoshop & Design et vous proposez Excel & Data Analysis. Un excellent match!'
      },
      {
        id: 2,
        score: 90,
        status: 'pending',
        partner: {
          name: 'Alexandre Chen',
          avatar: '👨‍💻',
          skill: 'React & JavaScript'
        },
        yourSkill: 'Marketing Digital & SEO',
        reason: 'Alexandre propose React & JavaScript. Vous pouvez lui enseigner le Marketing Digital & SEO!'
      },
      {
        id: 3,
        score: 95,
        status: 'pending',
        partner: {
          name: 'Marc Lefebvre',
          avatar: '📸',
          skill: 'Photographie Pro'
        },
        yourSkill: 'Montage Vidéo',
        reason: 'Marc est photographe professionnel et cherche quelqu\'un pour le montage vidéo. Parfait pour vous!'
      },
      {
        id: 4,
        score: 88,
        status: 'pending',
        partner: {
          name: 'Léa Bernard',
          avatar: '👩‍🔬',
          skill: 'Python & Data Science'
        },
        yourSkill: 'Développement Web',
        reason: 'Léa maîtrise Python et vous pouvez lui enseigner le développement web. Compétences complémentaires!'
      }
    ];

    this.invitations = defaultInvitations;

    // Load sent invitations from localStorage
    const sentInvitations = JSON.parse(localStorage.getItem('sentInvitations') || '[]');
    if (sentInvitations.length > 0) {
      this.invitations = [...this.invitations, ...sentInvitations];
    }
  }

  get currentInvitation(): Invitation | null {
    return this.currentIndex < this.invitations.length ? this.invitations[this.currentIndex] : null;
  }

  get remainingInvitations(): number {
    return Math.max(0, this.invitations.length - this.currentIndex);
  }

  acceptInvitation(invitation: Invitation): void {
    invitation.status = 'accepted';
    this.nextInvitation();
  }

  rejectInvitation(): void {
    this.swipeDirection = 'left';
    this.swiped = true;
    setTimeout(() => {
      this.nextInvitation();
    }, 300);
  }

  confirmInvitation(): void {
    this.swipeDirection = 'right';
    this.swiped = true;
    setTimeout(() => {
      if (this.currentInvitation) {
        this.acceptInvitation(this.currentInvitation);
      }
    }, 300);
  }

  nextInvitation(): void {
    this.swiped = false;
    this.swipeDirection = null;
    this.currentIndex++;
  }

  resetInvitations(): void {
    this.currentIndex = 0;
    this.swiped = false;
    this.swipeDirection = null;
  }

  get acceptedInvitations(): Invitation[] {
    return this.invitations.filter(inv => inv.status === 'accepted');
  }

  hasAcceptedInvitations(): boolean {
    return this.acceptedInvitations.length > 0;
  }
}
