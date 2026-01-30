import { User } from "../../users/models/user.model";

export interface Mailbox {
  id: number; 
  user:{id:number,username:string},
  
}
