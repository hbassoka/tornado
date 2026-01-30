// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 apiBaseUrl: 'http://localhost:8080',
  brokerUrl:  'ws://localhost:8080/api/ws',
  clientUrl: '?redirect_uri=http://localhost:4200/auth',
  accessTokenKey:'access_token',
  refreshTokenKey:'refresh_token',
  userKey:'auth-user',
  photoBaseUrl:'assets/photos',
  videoBaseUrl:'assets/videos',

   googleClientId:'283386152674-hstl5h1k4oetpqrompekg3792v1a65df.apps.googleusercontent.com',
   facebookClientId:'2650231771993265',
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
