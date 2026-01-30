import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projets',
  imports: [CommonModule],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.css'
})
export class ProjetsComponent {


  currentIndex = 0;


  projets = [
    { 
      nom: 'JDevHub', 
      description: 'Portail intranet,Java Developpeur Hub',
      backend: 
         { 
          sourceUrl: 'https://gitlab.jdevhub.com/repositories/intranet-backend',  
          demoUrl: 'https://www.jdevhub.com/backend/api/swagger-ui/index.html' 
        },
      frontend: { 
        sourceUrl: 'https://gitlab.jdevhub.com/repositories/intranet-frontend',
         demoUrl: 'https://www.jdevhub.com' 
        },
      status: 'en développement', // Ajout d'un statut     
    },
    { 
      nom: 'Neptune', 
      description: 'Location de biens, vente immobilière, services professionnels, offres d`\'emploi et annuaire complet',
      backend: { sourceUrl: '', demoUrl: '' },
      frontend: { sourceUrl: '', demoUrl: '' },
      status: 'en développement', // Ajout d'un statut     
    },
    { 
      nom: 'Tulipe', 
      description: 'Community and Event Network',
      backend: { sourceUrl: '', demoUrl: '' },
      frontend: { sourceUrl: '', demoUrl: '' },
      status: 'en développement', // Ajout d'un statut  
     },
    { 
      nom: 'Gestia', 
      description: 'Plateforme de gestion des commandes, clients et facturation',
      backend: { sourceUrl: '', demoUrl: '' },
      frontend: { sourceUrl: '', demoUrl: '' },
      status: 'en développement', // Ajout d'un statut  

     },
    { 
      nom: 'Clarifin', 
      description: 'Logiciel de comptabilité mutualisé pour PME et indépendants',
      backend: { sourceUrl: '', demoUrl: '' },
      frontend: { sourceUrl: '', demoUrl: '' },
      status: 'en développement', // Ajout d'un statut  
    }
    
    
  ];


// Move to the next project
  next() {
    if (this.currentIndex < this.projets.length - 1) {
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

