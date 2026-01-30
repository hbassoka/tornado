import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Profil } from '../../models/profil.model';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-profil-view',
  imports: [],
  templateUrl: './profil-view.component.html',
  styleUrl: './profil-view.component.css',
})
export class ProfilViewComponent implements OnInit {

  private readonly profilService = inject(ProfilService);


  profil !: Profil;

  ngOnInit(): void {
    this.profilService.me().subscribe(data => {
      this.profil = data;
    });


  }



  submit() {


  }
}
