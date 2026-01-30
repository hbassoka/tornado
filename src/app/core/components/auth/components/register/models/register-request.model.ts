
export interface RegisterRequest {

    titre:{id:number,code:string,label:string};
    nom:string;
    prenom:string;
    email:string;
    emailConfirm:string;
    password:string;
    passwordConfirm:string;
}
