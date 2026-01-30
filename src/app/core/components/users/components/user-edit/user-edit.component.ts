import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DualListboxComponent } from "../../../../../shared/components/dual-listbox/dual-listbox.component";
import { Group } from "../../../groups/models/group.model";
import { GroupService } from "../../../groups/services/group.service";
import { RoleService } from "../../../roles/services/role.service";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DualListboxComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit {

  protected  router =inject(Router) ;
  protected  route =inject(ActivatedRoute) ;
  protected  fb=inject(FormBuilder);  
  protected  roleService=inject(RoleService);
  protected  groupService=inject(GroupService);
  protected  userService=inject(UserService);


  userForm!: FormGroup;

  avaiableGroups=signal<Group[]>([]);
  selectedGroups=signal<Group[]>([]);

  userId=signal<number |null>(null);
  editingUser = signal<User | null>(null);




  // Get the FormArray instance to access the selected roles
  get groupsFormArray(): FormArray {
    return this.userForm.get('groups') as FormArray;
  }


  constructor() {

    // Form initialisation
    
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      groups: this.fb.array([])

    });
  }

  ngOnInit(): void {
  

    const idParam  = this.route.snapshot.paramMap.get('id');
    // convert string to number
    const id = Number(idParam);

    if (isNaN(id)) {
      this.userId.set(null);
       return; // or redirect / handle error
     }

     this.userId.set(id);
     this.userService.getById(id).subscribe(data => {
      
       this.editingUser.set(data);
    });

    this.loadGroups();
  }



  loadGroups(): void {

    this.groupService.getAll().subscribe(data => {
      this.avaiableGroups.set(data)
      
    });
  }

  // Annuler le formulaire
  cancelForm() {    
    this.editingUser.set(null);
    this.reset();
    this.router.navigate(['/admin/users']);
  }

  reset(){
      this.userForm.reset({
      username: '',   
      password:'',   
      groups: [],
      enabled: false,
      deletable: true,
    });
  }
/*
  // Sauvegarder utilisateur
  save() {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;

    if (this.editingUser) {
      // Mise à jour
      this.editingUser.username = formValue.username;    
      this.editingUser.password = formValue.password;      
      this.editingUser.groups = formValue.groups;
      console.log('User updated:', this.editingUser);
    } else {
      // Création
      const newUser: User = {
        id: this.nextId++,       
        username: formValue.username, 
        password: formValue.password,      
        groups: formValue.groups,       
        enabled: false,
        deletable: true,
      };      
      console.log('User created:', newUser);
    }

    this.cancelForm();
  }
  /** */
  
}


