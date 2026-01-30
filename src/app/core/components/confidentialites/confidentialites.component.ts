import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Confidentialite } from './models/confidentialite.model';
import { ConfidentialiteService } from './services/confidentialite.service';
import { VisibilityPipe } from '../../../shared/pipes/visibility-pipe';

@Component({
  selector: 'app-confidentialites',
  imports:[CommonModule, FormsModule, ReactiveFormsModule,VisibilityPipe ],
  templateUrl: './confidentialites.component.html',
  styleUrl: './confidentialites.component.css',
})
export class ConfidentialitesComponent implements OnInit {

  private readonly fb =inject(FormBuilder);
  private confidentialiteService=inject(ConfidentialiteService);

  confidentialites: Confidentialite[] = [];
  confidentialiteForm!: FormGroup;
  showForm = false;
  editingConfidentialite: Confidentialite | null = null;
  nextId = 1; // pour simulation ajout

  // Pagination
  totalPages = 0;
  totalElements = 0;

  page = 0;
  size = 10;

  sortBy = 'id';
  direction = 'asc';

  search = '';

  constructor() { 

     this.confidentialiteForm = this.fb.group({
      profileVisibility: ['', [Validators.required,]],
      showEmail: ['', [Validators.required]],
      showTelephone: [false, Validators.required],
      showBirthdate: [false, Validators.required],
      dataProcessingConsent: [false, Validators.required],
      marketingConsent: [false, Validators.required],
      thirdPartySharing: [false, Validators.required]
    });
  }


    ngOnInit(): void {
  
    this.reset();
    this.loadConfidentialites();
   
   console.log(JSON.stringify(this.confidentialites))
     
  }

    loadConfidentialites(){

      this.confidentialiteService.getConfidentialites(this.page, this.size, this.sortBy, this.direction, this.search)
      .subscribe(res => {
        this.confidentialites = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.page = res.number;
      });
    }
  
    changePage(p: number) {
      if (p >= 0 && p < this.totalPages) {
        this.page = p;
        this.loadConfidentialites();
      }
    }
    
    sort(col: string) {
      if (this.sortBy === col) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = col;
        this.direction = 'asc';
      }
      this.loadConfidentialites();
    }
  
    onSearchChange() {
      this.page = 0;
      this.loadConfidentialites();
    }
  
    // Ouvrir le formulaire pour création ou édition
    openForm(confidentialite?: Confidentialite) {
      this.showForm = true;
      this.editingConfidentialite = confidentialite || null;
  
      if (confidentialite) {
        // Edition
        this.confidentialiteForm.setValue({   
           profileVisibility: confidentialite.profileVisibility,
           showEmail:confidentialite.showEmail,
           showTelephone:confidentialite.showTelephone,
           showBirthdate: confidentialite.showBirthdate,
           dataProcessingConsent: confidentialite.dataProcessingConsent,
           marketingConsent: confidentialite.marketingConsent,
           thirdPartySharing: confidentialite.thirdPartySharing

          
        });
      } else {
        // Création
        this.reset();
      }
    }
  
    // Annuler le formulaire
    cancelForm() {
      this.showForm = false;
      this.editingConfidentialite = null;
      this.reset();
    }
  
    reset(){

       this.confidentialiteForm.reset({
           profileVisibility: 'private',
           showEmail:false,
           showTelephone:false,
           showBirthdate: false,
           dataProcessingConsent: false,
           marketingConsent: false,
           thirdPartySharing: false,
      });

    }
    // Sauvegarder profil
    save() {
      if (this.confidentialiteForm.invalid) return;


    }

   
}
