import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-devops-flow',
  imports: [CommonModule],
  templateUrl: './devops-flow.component.html',
  styleUrl: './devops-flow.component.css',
})
export class DevopsFlowComponent  {

  
  currentIndex = 0;

  missions = [
     { 
      nom: 'Infrastrure DevOps', 
      description: 'Lead Dev sur des applications bancaires sensibles, microservices, sécurité, Kafka et intégration continue.',
      imageUrl:'images/devops.png' ,
      imageTitle:' Infrastructure DevOps' 
    },
    { 
      nom: 'Integration en continue', 
      description: "Le DevOps offre un ensemble d'avantages qui transforment le développement et les opérations, pour des livraisons plus rapides et plus fiables.",
      imageUrl:'images/gitflow.png',
      imageTitle:' Infrastructure DevOps'  
    },
    { 
      nom: 'Chaine CI-CD', 
      description: "La chaîne CI/CD automatise l’intégration, les tests et le déploiement,garantissant des livraisons continues, fiables et sécurisées.",
      imageUrl:'images/ci-cd.png',
      imageTitle:' Infrastructure DevOps'  
    },
    { 
      nom: 'Livraison en continue', 
      description: 'Lead Dev sur des applications bancaires sensibles, microservices, sécurité, Kafka et intégration continue.',
      imageUrl:'images/deploy.png',
      imageTitle:' Infrastructure DevOps'   
    },
    { 
      nom: 'Sécurité ronforcée', 
      description: 'Conception de logiciels sûrs.',
      imageUrl:'images/pki-infra-fr.png',
      imageTitle:' PKI infrastructure'   
    }
   
  ];


// Move to the next project
  next() {
    if (this.currentIndex < this.missions.length - 1) {
      this.currentIndex++;
    }
  }

  // Move to the previous project
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

}
