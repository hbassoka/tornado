import { User } from "../../users/models/user.model";



export interface Mail {
  id: number;
  conversationId: number;
  sender: User;
  body: string;
  subject: string;
  sentAt: string;
  isFlagged: boolean;

 
}
