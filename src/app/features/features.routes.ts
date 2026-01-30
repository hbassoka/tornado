import { Routes } from '@angular/router';
import { CompetencesComponent } from './components/competences/competences.component';
import { ExpertisesComponent } from './components/expertises/expertises.component';
import { MissionsComponent } from './components/missions/missions.component';
import { ProjetsComponent } from './components/projets/projets.component';
import { DevOpsComponent } from './components/dev-ops/dev-ops.component';

export const featuresRoutes: Routes = [
    
  
{ path: 'competences', component: CompetencesComponent },
{ path: 'devops', component: DevOpsComponent },
{ path: 'expertises', component: ExpertisesComponent },
{ path: 'projets', component: ProjetsComponent },
{ path: 'missions', component: MissionsComponent },


];