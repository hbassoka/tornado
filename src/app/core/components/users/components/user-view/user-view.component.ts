import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RoleService } from '../../../roles/services/role.service';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../../groups/services/group.service';
import { User } from '../../models/user.model';
import { Group } from '../../../groups/models/group.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DualListboxComponent } from '../../../../../shared/components/dual-listbox/dual-listbox.component';


@Component({
  selector: 'app-user-view',
   imports: [CommonModule, FormsModule, ReactiveFormsModule, DualListboxComponent,RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent implements OnInit {



  protected route = inject(ActivatedRoute);
  protected userService = inject(UserService);
  protected groupService = inject(GroupService);
  protected roleService = inject(RoleService);

  userView = signal<User | null>(null);

  userId=signal<number |null>(null);

  avaiableGroups=signal<Group[]>([]);
  selectedGroups=signal<Group[]>([]);

  constructor() { }

  ngOnInit(): void {

    
    const idParam = this.route.snapshot.paramMap.get('id');

    // convert string to number
    const id = Number(idParam);

    if (isNaN(id)) {
       this.userId.set(null);
      return; // or redirect / handle error
    }

    this.userId.set(id);

    this.userService.getById(id).subscribe(data => {
      this.userView.set(data);
      this.selectedGroups.set(data.groups);
    });

    this.groupService.getAll().subscribe(data=>{
       this.avaiableGroups.set(data);
    });
    
  }


  availableItemChange(items: any[]) {
    this.avaiableGroups.set(items);
  }

  selectedItemChange(items: any[]) {

    this.selectedGroups.set(items);
   
  }
}
