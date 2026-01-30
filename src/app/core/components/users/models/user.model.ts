import { Group } from "../../groups/models/group.model";
import { Permission } from "../../permissions/models/permission.model";
import { Role } from "../../roles/models/role.model";


export interface User {
  id: number; 
  username: string;  
  email:string;
  password:string;
  enabled: boolean; 
  deletable: boolean;
  twoFactorEnabled?:boolean;
  groups:Group[];
  
  
}



