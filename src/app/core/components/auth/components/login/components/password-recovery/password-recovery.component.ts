import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
   imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {

   passwordRecoveryModel = { username: '' };

  errorMessage = '';


  onSubmit(): void {


  }
}
