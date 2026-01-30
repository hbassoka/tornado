

import { Permission } from "../../permissions/models/permission.model";

export interface Role{ 
   id:number;
  name:string;
  label:string; 
  description:string;
  permissions: Permission[];
  
}