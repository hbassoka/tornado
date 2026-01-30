import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Group } from './models/group.model';
import { Role } from '../roles/models/role.model';
import { GroupService } from './services/group.service';
import { RoleService } from '../roles/services/role.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-groups',
 imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class GroupsComponent implements OnInit {

  groupList = signal<Group[]>([]);
  roleList  = signal<Role[]>([]);
  
  groupForm!: FormGroup;
  editingGroup: Group | null = null;
  showForm = signal(false);

  // Pagination
  totalPages = signal(0);
  totalElements = signal(0);

  page = signal(0);
  size = signal(10);

  sortBy = 'id';
  direction = signal<'asc' | 'desc'>('asc');

  search =signal('');


    // Get the FormArray instance to access the selected roles
get rolesFormArray(): FormArray {
  return this.groupForm.get('roles') as FormArray;
}

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private roleService: RoleService
  ) {

   
  }

  ngOnInit() {
     this.loadRoles();
     this.loadgroups();

      this.groupForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      deletable: ['false', Validators.required],
      roles: this.fb.array([])   
    });

  }

  loadRoles()  {
  this.roleService.getAll().subscribe(data => {
    this.roleList.set(data);
    // create one checkbox control per group
    this.groupList().forEach(() => {
      this.rolesFormArray.push(this.fb.control(false));
    });
  });
}

loadgroups() {
    this.groupService.getGroups(this.page(), this.size(), this.sortBy, this.direction(), this.search())
      .subscribe(res => {
        this.groupList.set(res.content);
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);
        this.page.set(res.number);
      });
  }
  
  changePage(p: number) {
    if (p >= 0 && p < this.totalPages()) {
      this.page.set(p);
      this.loadgroups();
    }
  }
  
  sort(col: string) {
    if (this.sortBy === col) {
      this.direction.set(this.direction() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy = col;
      this.direction.set('asc');
    }
    this.loadgroups();
  }

  onSearchChange() {
    this.page.set(0);
    this.loadgroups();
  }
  openForm(group?: Group) {
    this.showForm.set(true);
    if (group) {
      this.editingGroup = group;
      this.groupForm.patchValue(group);
    } else {
      this.editingGroup = null;
      this.groupForm.reset({ permissions: [] });
    }
  }

  cancelForm() {
    this.showForm.set(false);
    this.groupForm.reset({ permissions: [] });
    this.editingGroup = null;
  }

  save() {
    if (this.groupForm.invalid) return;

    if (this.editingGroup) {
      this.groupService.update(this.editingGroup.id, this.groupForm.value)
        .subscribe(() => { this.loadgroups(); this.cancelForm(); });
    } else {
      this.groupService.create(this.groupForm.value)
        .subscribe(() => { this.loadgroups(); this.cancelForm(); });
    }
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      this.groupService.delete(id).subscribe(() => this.loadgroups());
    }
  }
}
