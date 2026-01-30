export interface Confidentialite {

    id:number;
    user:{id:number,username:string},
    profileVisibility:string;       
    showEmail:boolean;
    showTelephone:boolean;
    showBirthdate:boolean;
    dataProcessingConsent:boolean;
    marketingConsent:boolean;
    thirdPartySharing:boolean;
}