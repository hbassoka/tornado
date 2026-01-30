import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';
import { CommonModule } from '@angular/common';
import { Role } from '../../../roles/models/role.model';
import { RoleService } from '../../../roles/services/role.service';
import { DualListboxComponent } from "../../../../../shared/components/dual-listbox/dual-listbox.component";

@Component({
  selector: 'app-group-view',
  imports: [CommonModule, RouterLink, DualListboxComponent],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.css',
})
export class GroupViewComponent implements OnInit{

  protected  route =inject(ActivatedRoute) ;
  protected  groupService=inject(GroupService);
  protected  roleService=inject(RoleService);

  groupSelected = signal<Group | null>(null);

  availableRoles=signal<Role[]>([]);
  selectedRoles=signal<Role[]>([]);


  constructor(){}

  ngOnInit(): void {
   
      const idParam  = this.route.snapshot.paramMap.get('id');

      // convert string to number
      const id = Number(idParam);

      if (isNaN(id)) {
       return; // or redirect / handle error
     }


    this.groupService.getById(id).subscribe(data => {
      // ✅ correct signal update
         this.groupSelected.set(data);
         this.selectedRoles.set(data.roles);
    });

   this.loadRoles();

  }

   loadRoles(){
    this.roleService.getAll().subscribe(data=>{     
        this.availableRoles.set(data);        
      });
   }
}
