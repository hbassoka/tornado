export interface Preference {

    id:number;
    user:{id:number,username:string},
    language:string;
    theme:string;
    emailNotifications:boolean;
    pushNotifications:boolean;
}