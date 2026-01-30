import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  
  featureItems: FeatureItem[] = [
    {
      id:1,
      title: 'Veuille technologique',
      description: 'Retrouvez et modifiez vos annonces, renouvelez leur parution.',
      icon: 'bi-megaphone',
      colorClass: 'text-primary'
    },
    {
      id:2,
      title: 'Messagérie',
      description: 'Échangez en toute sécurité via la messagerie intégrée.',
      icon: 'bi-envelope',
      colorClass: 'text-success'
    },
    {
      id:3,
      title: 'Messages instantanés',
      description: 'Communiquez rapidement et en toute sécurité avec le chat intégré.',
      icon: 'bi-chat-dots',
      colorClass: 'text-info'
    },    
    {
      id:4,
      title: 'Notification en temps réel',
      description: 'Gérez vos recherches et recevez des notifications personnalisées.',
      icon: 'bi-bell',
      colorClass: 'text-warning'
    }
  ];
  constructor() { }

   getAll() {
    return this.featureItems;
  }

  getById(id: number) {
    return this.featureItems.find(f => f.id === id);
  }
}
