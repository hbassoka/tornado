import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Group } from '../../models/group.model';
import { GroupService } from '../../services/group.service';
import { DualListboxComponent } from "../../../../../shared/components/dual-listbox/dual-listbox.component";

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../roles/services/role.service';
import { Role } from '../../../roles/models/role.model';

@Component({
  selector: 'app-group-edit',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,DualListboxComponent,RouterLink],
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css',
})
export class GroupEditComponent   implements OnInit {

  protected  readonly router =inject(Router) ;
  protected  readonly route =inject(ActivatedRoute) ;
  protected  readonly fb=inject(FormBuilder);  
  protected  readonly groupService=inject(GroupService);
  protected  readonly roleService=inject(RoleService);

  availableRoles=signal<Role[]>([]);
  selectedRoles=signal<Role[]>([]);

  groupId=signal<number | null>(null);
  editingGroup = signal<Group | null>(null);

  groupForm!: FormGroup;
 
  constructor(){}

  ngOnInit(): void {
   
      const idParam  = this.route.snapshot.paramMap.get('id');

      // convert string to number
      const id = Number(idParam);

      if (isNaN(id)) {
        this.groupId.set(null);
        this.editingGroup.set(null);
       return; // or redirect / handle error
     }

      this.groupId.set(id);

      this.groupService.getById(id).subscribe(data => {
      // ✅ correct signal update
         this.editingGroup.set(data);
         this.selectedRoles.set(data.roles);
    });

    this.loadRoles();
  }
  
   loadRoles(){
    this.roleService.getAll().subscribe(data=>{     
        this.availableRoles.set(data);        
      });
   }


 cancelForm() {    
    this.editingGroup.set(null);
    this.groupId.set(null);
    this.reset();
    this.router.navigate(['/admin/groups']);
  }

  reset(){
      this.groupForm.reset({
      username: '',   
      password:'',   
      groups: [],
      enabled: false,
      deletable: true,
    });
  }
}


