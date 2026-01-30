import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-username-recovery',
    imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './username-recovery.component.html',
  styleUrl: './username-recovery.component.css'
})
export class UsernameRecoveryComponent {

   usernameRecoveryModel = { email: '' };

  errorMessage = '';


  onSubmit(): void {


  }
}
