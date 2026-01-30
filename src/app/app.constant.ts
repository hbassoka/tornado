import { environment } from "../environments/environment";

export class AppConstant {
 
  private static API_BASE_URL = environment.apiBaseUrl; 
  private static REDIRECT_URL = environment.clientUrl;

  public static PHOTO_BASE_URL = environment.photoBaseUrl; 
  public static VIDEO_BASE_URL = environment.videoBaseUrl; 

  // WEB SOCKET
  public  static WEBSOCKET_URL = `${AppConstant.API_BASE_URL}/ws`;

  public  static BROKER_URL = environment.brokerUrl;

  // JWT Token Key
  public  static ACCESS_TOKEN_KEY = environment.accessTokenKey;
  public  static REFRESH_TOKEN_KEY=environment.refreshTokenKey;
  

  public  static USER_KEY =  environment.userKey;
  public  static API_URL = `${AppConstant.API_BASE_URL}/api`;  
  public  static AUTH_API = `${AppConstant.API_BASE_URL}/api/auth`;  

  public static GOOGLE_CLIENT_ID=environment.googleClientId;

  public static FACEBOOK_CLIENT_ID=environment.facebookClientId;




}
