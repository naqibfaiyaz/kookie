// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBmRqxX-w-EyoxffvbeasL1bNjzgJrNfgI",
  authDomain: "kookie-3e66d.firebaseapp.com",
  databaseURL: "https://kookie-3e66d.firebaseio.com",
  projectId: "kookie-3e66d",
  storageBucket: "",
  messagingSenderId: "446571465200",
  appId: "1:446571465200:web:fd49e0a33ba28cb7ed3535"
};

export const backend = {
  host: "http://192.168.10.10/",
}

export const backend2 = {
  host: "http://192.168.10.10/",
}
