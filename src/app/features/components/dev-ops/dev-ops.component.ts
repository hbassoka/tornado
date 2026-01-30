import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevopsBeneficesComponent } from './components/devops-benefices/devops-benefices.component';
import { DevopsFlowComponent } from './components/devops-flow/devops-flow.component';


@Component({
  selector: 'app-dev-ops',
  imports: [CommonModule,DevopsFlowComponent,DevopsBeneficesComponent],
  templateUrl: './dev-ops.component.html',
  styleUrl: './dev-ops.component.css',
})
export class DevOpsComponent {

   benefits = [
    { icon: 'bi bi-rocket-fill', title: 'Time-to-Market réduit', description: 'Des livraisons plus rapides et plus fréquentes.' },
    { icon: 'bi bi-repeat', title: 'Déploiements fiables', description: 'Chaque release est stable et testée automatiquement.' },
    { icon: 'bi bi-shield-lock-fill', title: 'Qualité & sécurité', description: 'Tests et analyses intégrés dès le développement.' },
    { icon: 'bi bi-eye-fill', title: 'Traçabilité', description: 'Suivi complet du code jusqu’en production.' },
    { icon: 'bi bi-people-fill', title: 'Collaboration', description: 'Dév et Ops alignés sur un même objectif.' },
    { icon: 'bi bi-currency-dollar', title: 'Optimisation des coûts', description: 'Réduction des erreurs et des déploiements manuels.' }
  ];

  tools = [
    'Git', 'GitLab CI', 'Jenkins', 'Maven', 'SonarQube', 
    'Docker', 'Kubernetes', 'Helm', 'AWS', 'Prometheus', 'Grafana'
  ];

}
