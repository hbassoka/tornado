import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mentions-legales',
  imports: [CommonModule,DatePipe ],
  templateUrl: './mentions-legales.component.html',
  styleUrl: './mentions-legales.component.css'
})
export class MentionsLegalesComponent {

currentYear = new Date().getFullYear();
currentDate:Date=new Date()
mailto='contact@jdevhub.com';

  cgv = [
{ title: '1. Objet', text: 'CGV relatives aux prestations de développement et consulting Java/Angular.' },
{ title: '2. Devis et Commande', text: 'Toute commande nécessite un devis signé.' },
{ title: '3. Prix et Paiement', text: 'Paiement en plusieurs échéances selon le devis.' },
{ title: '4. Livraison', text: 'Les délais sont donnés à titre indicatif et ajustables.' },
{ title: '5. Propriété intellectuelle', text: 'Le code devient propriété du client après paiement complet.' },
{ title: '6. Maintenance', text: 'La maintenance fait l’objet d’un contrat distinct.' },
{ title: '7. Confidentialité', text: 'Le consultant garantit la confidentialité des informations du client.' }
];
}
