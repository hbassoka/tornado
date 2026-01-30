import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preference } from './models/preference.model';
import { PreferenceService } from './services/preference.service';
import { YesNoPipe } from '../../../shared/pipes/yes-no-pipe';

@Component({
  selector: 'app-preferences',
 imports:[CommonModule, FormsModule, ReactiveFormsModule,YesNoPipe ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent implements OnInit {

  private readonly fb =inject(FormBuilder);
  private preferenceService=inject(PreferenceService);

  preferences: Preference[] = [];
  preferenceForm!: FormGroup;
  showForm = false;
  editingPreference: Preference | null = null;
  nextId = 1; // pour simulation ajout

  // Pagination
  totalPages = 0;
  totalElements = 0;

  page = 0;
  size = 10;

  sortBy = 'id';
  direction = 'asc';

  search = '';

  constructor() { }


    ngOnInit(): void {
         // Form initialisation
    this.preferenceForm = this.fb.group({
      language: ['', [Validators.required, Validators.minLength(3)]],
      theme: ['', [Validators.required, Validators.email]],
      emailNotifications: [false, Validators.required],
      pushNotifications: [false, Validators.required]
    });

   this.loadPreferences();
   
   console.log(JSON.stringify(this.preferences))
     
  }

    loadPreferences(){

      this.preferenceService.getPreferences(this.page, this.size, this.sortBy, this.direction, this.search)
      .subscribe(res => {
        this.preferences = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.page = res.number;
      });
    }
  
    changePage(p: number) {
      if (p >= 0 && p < this.totalPages) {
        this.page = p;
        this.loadPreferences();
      }
    }
    
    sort(col: string) {
      if (this.sortBy === col) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = col;
        this.direction = 'asc';
      }
      this.loadPreferences();
    }
  
    onSearchChange() {
      this.page = 0;
      this.loadPreferences();
    }
  
    // Ouvrir le formulaire pour création ou édition
    openForm(preference?: Preference) {
      this.showForm = true;
      this.editingPreference = preference || null;
  
      if (preference) {
        // Edition
        this.preferenceForm.setValue({         
          language: preference.language,
          theme: preference.theme,
          emailNotifications: preference.emailNotifications,
          pushNotifications: preference.emailNotifications,
        });
      } else {
        // Création
        this.reset();
      }
    }
  
    // Annuler le formulaire
    cancelForm() {
      this.showForm = false;
      this.editingPreference = null;
      this.reset();
    }
  
    reset(){
      this.preferenceForm.reset({
          language: '',
          theme: '',
          emailNotifications: false,
          pushNotifications:false
        });
    }
    // Sauvegarder profil
    save() {
      if (this.preferenceForm.invalid) return;


    }

     // Supprimer utilisateur
  delete(preferenceId: number) {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    this.preferences = this.preferences.filter(p => p.id !== preferenceId);
    console.log('User deleted, id:', preferenceId);
  }
}