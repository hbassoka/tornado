import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Permission } from './models/permission.model';
import { PermissionService } from './services/permission.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-permissions',
  imports:[CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent implements OnInit {
  permissions: Permission[] = [];
  permissionForm!: FormGroup;
  editingPermission: Permission | null = null;
  showForm = false;

  // Pgination
  totalPages = 0;
  totalElements = 0;

  page = 0;
  size = 10;

  sortBy = 'id';
  direction = 'asc';

  search = '';

  constructor(private fb: FormBuilder, private permissionService: PermissionService) {}

  ngOnInit() {
    this.loadPermissions();

    this.permissionForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }


  loadPermissions() {
    this.permissionService.getPermissions(this.page, this.size, this.sortBy, this.direction, this.search)
      .subscribe(res => {
        this.permissions = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.page = res.number;
      });
  }
 
  changePage(p: number) {
    if (p >= 0 && p < this.totalPages) {
      this.page = p;
      this.loadPermissions();
    }
  }
  
  sort(col: string) {
    if (this.sortBy === col) {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = col;
      this.direction = 'asc';
    }
    this.loadPermissions();
  }

  onSearchChange() {
    this.page = 0;
    this.loadPermissions();
  }

  openForm(permission?: Permission) {
    this.showForm = true;
    if (permission) {
      this.editingPermission = permission;
      this.permissionForm.patchValue(permission);
    } else {
      this.editingPermission = null;
      this.permissionForm.reset();
    }
  }

  cancelForm() {
    this.showForm = false;
    this.permissionForm.reset();
    this.editingPermission = null;
  }

  save() {
    if (this.permissionForm.invalid) return;

    if (this.editingPermission) {
      this.permissionService.update(this.editingPermission.id, this.permissionForm.value)
        .subscribe(() => { this.loadPermissions(); this.cancelForm(); });
    } else {
      this.permissionService.create(this.permissionForm.value)
        .subscribe(() => { this.loadPermissions(); this.cancelForm(); });
    }
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette permission ?')) {
      this.permissionService.delete(id).subscribe(() => this.loadPermissions());
    }
  }
}
