import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Group } from '../groups/models/group.model';

import { GroupService } from '../groups/services/group.service';
import { UserService } from '../users/services/user.service';
import { CommonModule } from '@angular/common';
import { User } from './models/user.model';
import { RouterLink } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-users',
 imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './users.component.html',  
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {

  protected userService = inject(UserService);
  userAvailables: User[] = [];
  groupAvailables: Group[] = [];


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

    this.loadUsers();
  }


  loadUsers() {
    this.userService.getUsers(this.page, this.size, this.sortBy, this.direction, this.search)
      .subscribe(res => {
        this.userAvailables = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.page = res.number;
      });
  }

  changePage(p: number) {
    if (p >= 0 && p < this.totalPages) {
      this.page = p;
      this.loadUsers();
    }
  }

  sort(col: string) {
    if (this.sortBy === col) {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = col;
      this.direction = 'asc';
    }
    this.loadUsers();
  }


  onSearchChange() {
    this.page = 0;
    this.loadUsers();
  }


  // Supprimer utilisateur
  delete(userId: number) {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    this.userAvailables = this.userAvailables.filter(u => u.id !== userId);
    console.log('User deleted, id:', userId);
  }




}
