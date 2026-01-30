import { Routes } from '@angular/router';
import { AccessDenyComponent } from './components/access-deny/access-deny.component';
import { CallbackComponent } from './components/callback/callback.component';
import { MailboxComponent } from './components/mailbox/mailbox.component';
import { authGuard } from './guards/auth-guard';
import { AuthComponent } from './components/auth/auth.component';
import { PasswordRecoveryComponent } from './components/auth/components/login/components/password-recovery/password-recovery.component';
import { UsernameRecoveryComponent } from './components/auth/components/login/components/username-recovery/username-recovery.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactConfirmationComponent } from './components/contact/components/contact-confirmation/contact-confirmation.component';
import { ProfilsComponent } from './components/profils/profils.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ConfidentialitesComponent } from './components/confidentialites/confidentialites.component';
import { AdminComponent } from './components/admin/admin.component';
import { DomaineComponent } from './components/domaine/domaine.component';
import { GroupsComponent } from './components/groups/groups.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { RolesComponent } from './components/roles/roles.component';
import { SujetComponent } from './components/sujet/sujet.component';
import { TitreComponent } from './components/titre/titre.component';
import { UsersComponent } from './components/users/users.component';
import { AboutComponent } from './components/about/about.component';
import { DataDeletionComponent } from './components/data-deletion/data-deletion.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { MentionsLegalesComponent } from './components/mentions-legales/mentions-legales.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MailboxEditComponent } from './components/mailbox/components/mailbox-edit/mailbox-edit.component';
import { MailboxViewComponent } from './components/mailbox/components/mailbox-view/mailbox-view.component';
import { NotificationEditComponent } from './components/notifications/components/notification-edit/notification-edit.component';
import { NotificationViewComponent } from './components/notifications/components/notification-view/notification-view.component';
import { ConfidentialiteViewComponent } from './components/confidentialites/components/confidentialite-view/confidentialite-view.component';
import { PreferenceViewComponent } from './components/preferences/components/preference-view/preference-view.component';
import { ProfilViewComponent } from './components/profils/components/profil-view/profil-view.component';
import { LexiqueComponent } from './components/lexique/lexique.component';
import { GroupViewComponent } from './components/groups/components/group-view/group-view.component';
import { GroupEditComponent } from './components/groups/components/group-edit/group-edit.component';
import { UserEditComponent } from './components/users/components/user-edit/user-edit.component';
import { UserViewComponent } from './components/users/components/user-view/user-view.component';
import { PermissionEditComponent } from './components/permissions/components/permission-edit/permission-edit.component';
import { PermissionViewComponent } from './components/permissions/components/permission-view/permission-view.component';
import { RoleEditComponent } from './components/roles/components/role-edit/role-edit.component';
import { RoleViewComponent } from './components/roles/components/role-view/role-view.component';
import { AccountComponent } from './components/account/account.component';
import { LogoutComponent } from './components/auth/components/logout/logout.component';
import { MailComponent } from './components/mailbox/components/mail/mail.component';
import { MailCreateComponent } from './components/mailbox/components/mail/components/mail-create/mail-create.component';
import { MailReplyComponent } from './components/mailbox/components/mail/components/mail-reply/mail-reply.component';
import { MailViewComponent } from './components/mailbox/components/mail/components/mail-view/mail-view.component';
import { LogoutConfirmationComponent } from './components/auth/components/logout/components/logout-confirmation/logout-confirmation.component';






export const coreRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'auth',
    children: [
      { path: '', component: AuthComponent }, 
      { 
        path: 'logout', 
        children:[
          { path: '', component: LogoutComponent },
          { path: 'confirm', component: LogoutConfirmationComponent }, 
        ]
      },
      { path: 'passwordRecovery', component: PasswordRecoveryComponent },
      { path: 'usernameRecovery', component: UsernameRecoveryComponent },
      { path: 'callback', component: CallbackComponent }
    ]
  },
  {
    path: 'mailbox',
    children: [
      { path: '', component:MailboxComponent },
      { path: 'view', component: MailboxViewComponent },
      { path: 'edit', component: MailboxEditComponent },
      { 
        path: 'mail', 
        children:[
           { path: '', component:MailComponent },
           { path: 'view/:id', component:MailViewComponent },
           { path: 'reply/:id', component:MailReplyComponent },
           { path: 'create', component:MailCreateComponent },
        ]
        
      }
    ]
  },
  {
    path: 'notifications',
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: NotificationViewComponent },
      { path: 'edit', component: NotificationEditComponent }
    ]
  },

  { path: 'moncompte', 
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children:[
        { path: '', component:AccountComponent },
        { path: 'profil', component: ProfilViewComponent },
        { path: 'preference', component: PreferenceViewComponent },
        { path: 'confidentialite', component: ConfidentialiteViewComponent },
    ]
  },
  {
    path: 'contact',
    children: [
      { path: '', component: ContactComponent },
      { path: 'confirm', component: ContactConfirmationComponent }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      // security
       { path: '', component: AdminComponent },      
       { 
         path: 'users',             
         children:[
          { path:'',component: UsersComponent},
          { path:'view/:id',component: UserViewComponent},        
          { path:'edit/:id',component: UserEditComponent},
         ]
      },  
      { 
         path: 'groups',             
         children:[
          { path:'',component: GroupsComponent},
          { path:'view/:id',component: GroupViewComponent},
          { path:'edit/:id',component: GroupEditComponent},
         ]
      },
      { 
         path: 'roles',             
         children:[
          { path:'',component: RolesComponent},
          { path:'view/:id',component: RoleViewComponent},
          { path:'edit/:id',component: RoleEditComponent},
         ]
      },    
      { 
         path: 'permissions',             
         children:[
          { path:'',component: PermissionsComponent},
          { path:'view/:id',component: PermissionViewComponent},
          { path:'edit/:id',component: PermissionEditComponent},
         ]
      },              
      { path: 'profils', canActivate: [authGuard], component: ProfilsComponent },
      { path: 'preferences', canActivate: [authGuard], component: PreferencesComponent },
      { path: 'confidentialites', canActivate: [authGuard], component: ConfidentialitesComponent },
      { path: 'mailbox', canActivate: [authGuard], component: MailboxComponent },
      { path: 'parametres', canActivate: [authGuard], component: ParametresComponent },
      { path: 'titres', canActivate: [authGuard], component: TitreComponent },
      { path: 'domaines', canActivate: [authGuard], component: DomaineComponent },
      { path: 'sujets', canActivate: [authGuard], component: SujetComponent },

    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'mentions-legales', component: MentionsLegalesComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'lexique', component: LexiqueComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'data-deletion', component: DataDeletionComponent },
  { path: 'forbidden', component: AccessDenyComponent },
];