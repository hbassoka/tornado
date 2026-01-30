import { Adresse } from "./adresse.model";

export interface Profil {
    id:number;
    user:{id:number,username:string,email:string},
    titre:{id?:number,code:string,label:string},    
    nom:string;
    prenom:string;
    dateDeNaissance:Date;
    photoUrl?:string;   
    telephone:string;
    adresse:Adresse;
   
 
    

}