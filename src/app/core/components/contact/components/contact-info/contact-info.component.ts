import { Component, inject, OnInit } from '@angular/core';
import { SujetService } from '../../../sujet/services/sujet.service';
import { Sujet } from '../../../sujet/models/sujet.model';

@Component({
  selector: 'app-contact-info',
  imports: [],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css',
})
export class ContactInfoComponent  implements OnInit{

  private readonly sujetService = inject(SujetService);
  motifs:Sujet[]=[];

  constructor(){}


  ngOnInit(): void {
    
    this.loadMotifs() ;
  }



  
  loadMotifs() {
    this.sujetService.findAll().subscribe(data => {
      this.motifs = data;
    });
  }
}
