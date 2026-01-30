import { Component, inject, OnInit } from '@angular/core';
import { Profil } from './models/profil.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfilService } from './services/profil.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profils',
 imports:[CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './profils.component.html',
  styleUrl: './profils.component.css',
})
export class ProfilsComponent implements OnInit {

  private readonly fb =inject(FormBuilder);
  private profilService=inject(ProfilService);

  profils: Profil[] = [];
  profilForm!: FormGroup;
  showForm = false;
  editingProfil: Profil | null = null;
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
    this.profilForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(12)]],
      dateDeNaissance:['',[]],
      adresse:this.fb.group({
        id:['',''],
        ligne1:['',''],
        ligne2:['',''],
        ligne3:['',''],

      })
    });

   this.loadProfils();
   
   console.log(JSON.stringify(this.profils))
     
  }

    loadProfils(){

      this.profilService.getProfiles(this.page, this.size, this.sortBy, this.direction, this.search)
      .subscribe(res => {
        this.profils = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.page = res.number;
      });
    }
  
    changePage(p: number) {
      if (p >= 0 && p < this.totalPages) {
        this.page = p;
        this.loadProfils();
      }
    }
    
    sort(col: string) {
      if (this.sortBy === col) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = col;
        this.direction = 'asc';
      }
      this.loadProfils();
    }
  
    onSearchChange() {
      this.page = 0;
      this.loadProfils();
    }
  
    // Ouvrir le formulaire pour création ou édition
    openForm(profil?: Profil) {
      this.showForm = true;
      this.editingProfil = profil || null;
  
      if (profil) {
        // Edition
        this.profilForm.setValue({         
          nom: profil.nom,
          prenom: profil.prenom,          
          telephone:profil.telephone,
          dateDeNaissance:profil.dateDeNaissance
        });
      } else {
        // Création
        this.profilForm.reset({
          nom: '',
          prenom: '',
          email: ''
        });
      }
    }
  
    // Annuler le formulaire
    cancelForm() {
      this.showForm = false;
      this.editingProfil = null;
      this.profilForm.reset({
        nom: '',
        prenom: '',
        email: ''
      });
    }
  
    // Sauvegarder profil
    save() {
      if (this.profilForm.invalid) return;


    }

     // Supprimer utilisateur
  delete(profilId: number) {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    this.profils = this.profils.filter(p => p.id !== profilId);
    console.log('User deleted, id:', profilId);
  }
}
