import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-missions',
  imports: [CommonModule],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css'
})
export class MissionsComponent {

  currentIndex = 0;

  missions = [
    { 
      nom: 'EDF', 
      description: 'Mission de longue durée en tant que Tech Lead & Développeur Full Stack Java/Angular sur des applications critiques du secteur énergie.',
      environnement:'Oracle, Java 8' },
    { 
      nom: 'GALEC (E. Leclerc)', 
      description: 'Refonte front et back des solutions magasins & entrepôts, CI/CD, performance et architecture modulaire.',
      environnement:'' },
    { 
      nom: 'BNP Paribas', 
      description: 'Lead Dev sur des applications bancaires sensibles, microservices, sécurité, Kafka et intégration continue.',
      environnement:''  },
    // More projects can be added here
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
