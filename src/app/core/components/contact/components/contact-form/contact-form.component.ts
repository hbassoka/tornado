import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Sujet } from '../../../sujet/models/sujet.model';
import { SujetService } from '../../../sujet/services/sujet.service';
import { Titre } from '../../../titre/models/titre.model';
import { TitreService } from '../../../titre/services/titre.service';
import { ContactRequest } from '../../models/contact-request.model';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent  implements OnInit {

  contactForm: FormGroup;
  titres: Titre[] = [];
  sujets: Sujet[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  private contactService = inject(ContactService)
  private titreService = inject(TitreService);
  private sujetService = inject(SujetService);
  private formBuilder = inject(FormBuilder);
  private  router=inject(Router);

  get f() {
    return this.contactForm.controls;  // Convenience getter for form controls
  }

 
  constructor() {

    // Initialize the form with validations
    this.contactForm = this.formBuilder.group({
      titreId: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Phone number validation
      sujetId: ['', Validators.required],
      message: ['', Validators.required]

    });

  }

  ngOnInit(): void {
    this.loadTitres();
    this.loadSujets();
  }

  loadTitres() {
    this.titreService.findAll().subscribe({
     next: data => this.titres = data,
     error: err => {
      console.error('Erreur chargement titres', err);
      this.titres = [];
       }
    });
  }

  loadSujets() {

      this.sujetService.findAll().subscribe({
     next: data => this.sujets = data,
     error: err => {
      console.error('Erreur chargement titres', err);
      this.titres = [];
       }
    });
  }


  onSubmit() {

    console.log(JSON.stringify(this.contactForm.value));

    // Trigger validation before submitting
    if (this.contactForm.invalid) {
      console.log('Form contains invalid fields.');
      return;
    }

    const contactRequest :ContactRequest = {
     
        titreId: this.contactForm.value.titreId,
        nom: this.contactForm.value.nom,       
        prenom: this.contactForm.value.prenom,
        email: this.contactForm.value.email,
        telephone: this.contactForm.value.telephone,
      
      sujetId: this.contactForm.value.sujetId,
      message: this.contactForm.value.message
    };

    console.log(JSON.stringify(contactRequest));


    this.contactService.send(contactRequest);

     this.errorMessage = '';
        this.router.navigate(['/contact/confirm']); // Redirige vers l'accueil

  }

}