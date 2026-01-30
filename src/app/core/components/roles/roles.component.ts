import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Permission } from '../permissions/models/permission.model';
import { Role } from './models/role.model';

import { RoleService } from './services/role.service';
import { RouterLink } from '@angular/router';
import { PermissionService } from '../permissions/services/permission.service';



@Component({
  selector: 'app-role',
  imports:[CommonModule, FormsModule, ReactiveFormsModule,RouterLink ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  permissions: Permission[] = [];
  roleForm!: FormGroup;
  editingRole: Role | null = null;
  showForm = false;

  // Propriété pour le terme de recherche
  totalPages = 0;
  totalElements = 0;

  page = 0;
  size = 10;

  sortBy = 'id';
  direction = 'asc';

  search = '';

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService
  ) {}

  
  ngOnInit() {
    
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      permissions: [[]]
    });
    
    this.loadRoles();
    this.loadPermissions();
   
  }

  
  

  loadPermissions() {
    this.permissionService.getAll().subscribe(res => this.permissions = res);
  }

  loadRoles() {
    this.roleService.getRoles(this.page, this.size, this.sortBy, this.direction, this.search)
      .subscribe(res => {
        this.roles = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.page = res.number;
      });
  }
  changePage(p: number) {
    if (p >= 0 && p < this.totalPages) {
      this.page = p;
      this.loadRoles();
    }
  }
  
  sort(col: string) {
    if (this.sortBy === col) {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = col;
      this.direction = 'asc';
    }
    this.loadRoles();
  }

  onSearchChange() {
    this.page = 0;
    this.loadRoles();
  }
  openForm(role?: Role) {
    this.showForm = true;
    if (role) {
      this.editingRole = role;
      this.roleForm.patchValue(role);
    } else {
      this.editingRole = null;
      this.roleForm.reset({ permissions: [] });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.roleForm.reset({ permissions: [] });
    this.editingRole = null;
  }

  save() {
    if (this.roleForm.invalid) return;

    if (this.editingRole) {
      this.roleService.update(this.editingRole.id, this.roleForm.value)
        .subscribe(() => { this.loadRoles(); this.cancelForm(); });
    } else {
      this.roleService.create(this.roleForm.value)
        .subscribe(() => { this.loadRoles(); this.cancelForm(); });
    }
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      this.roleService.delete(id).subscribe(() => this.loadRoles());
    }
  }
}
