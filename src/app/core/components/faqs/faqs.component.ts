import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


export interface FaqItem {
  question :string;
  answer:string;
}


@Component({
  selector: 'app-faqs',
  imports: [CommonModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent  {

  faq :FaqItem[]= [
    {
      question: 'Qu\'est-ce que cette application web ?',
      answer: 'C’est une application full-stack avec Angular en frontend et Spring Boot en backend.'
    },
    {
      question: 'Pourquoi utiliser Angular ?',
      answer: 'Angular fournit un framework robuste avec TypeScript, un système de composants, et une bonne structure pour les applications complexes.'
    },
    {
      question: 'Comment Angular communique-t-il avec Spring Boot ?',
      answer: 'Via des appels HTTP REST utilisant HttpClient, typiquement en JSON.'
    },
    {
      question: 'Comment l\'application est-elle déployée ?',
      answer: 'Elle est buildée, testée, dockerisée puis déployée automatiquement via un pipeline CI/CD (GitHub Actions, GitLab CI, etc.).'
    },
    {
      question: 'Qu\'est-ce que DevSecOps ?',
      answer: 'C’est l’intégration de la sécurité dans les pratiques DevOps : scans de sécurité, analyse de dépendances, test des vulnérabilités dès la CI.'
    },
    {
      question: 'Quels types de tests sont effectués ?',
      answer: 'Tests unitaires (Jest ou Karma/Jasmine pour Angular, JUnit pour Spring), tests d’intégration, tests de sécurité, linters.'
    },
    {
      question: 'L\'application est-elle sécurisée ?',
      answer: 'Oui, elle utilise JWT, Spring Security, gestion des rôles, et des scans de vulnérabilités automatisés.'
    },
    {
      question: 'Comment sont gérées les erreurs HTTP ?',
      answer: 'Le backend renvoie des codes HTTP standards et Angular les intercepte pour les afficher de manière conviviale.'
    }
  ];

  constructor(){

  }

  ngAfterViewInit(): void {
  const accordionButtons = document.querySelectorAll('.accordion button');

  accordionButtons.forEach((btn) => {
    const icon = btn.querySelector('.accordion-icon');
    const collapseEl = document.querySelector(btn.getAttribute('data-bs-target')!);

    collapseEl?.addEventListener('show.bs.collapse', () => {
      if (icon) icon.textContent = '-';
    });
    collapseEl?.addEventListener('hide.bs.collapse', () => {
      if (icon) icon.textContent = '+';
    });
  });
}

}
