
import { Permission } from "../../permissions/models/permission.model";
import { Role } from "../../roles/models/role.model";

export interface Group {
  id:number;
  name:string;
  label:string;
  description:string;
  deletable:boolean; 
  roles: Role[];

}