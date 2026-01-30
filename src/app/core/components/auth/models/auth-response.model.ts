import { AppUser } from "./app-user.model";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user:AppUser;    
  
}
