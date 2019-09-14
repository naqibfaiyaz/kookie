import { Injectable, NgZone } from "@angular/core";
import { Platform } from "@ionic/angular";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from "@ionic-native/facebook/ngx";
import { firebaseConfig } from '../../credentials';
import { BehaviorSubject } from "rxjs";
import firebase from "@firebase/app";
import "@firebase/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, private zone: NgZone, private facebook: Facebook, private googlePlus: GooglePlus) {}

  init(): void {

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Emit logged in status whenever auth state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });
  }

  loginWithFacebook(): Promise<void> {
    if (this.platform.is("capacitor")) {
      return this.nativeFacebookAuth();
    } else {
      return this.browserFacebookAuth();
    }
  }

  loginWithGoogle(): Promise<void> {
    if (this.platform.is("capacitor")) {
      return this.googleDeviceLogin();
    } else {
      return this.googleBrowserAuth();
    }
  }

  async logout(): Promise<void> {
    if (this.platform.is("capacitor")) {
      try {
        await this.facebook.logout(); // Unauth with Facebook
        await firebase.auth().signOut(); // Unauth with Firebase
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await firebase.auth().signOut();
      } catch (err) {
        console.log(err);
      }
    }
  }

  async googleDeviceLogin(): Promise<any> {
    return new Promise((resolve, reject) => { 
        this.googlePlus.login({
          'webClientId': '5351366995-npuh9q89gaoiagoc4jssqck26gorj7hh.apps.googleusercontent.com',
          'offline': true
        }).then( res => {
                const googleCredential = firebase.auth.GoogleAuthProvider
                    .credential(res.idToken);
  
                firebase.auth().signInWithCredential(googleCredential)
              .then( response => {
                  console.log("Firebase success: " + JSON.stringify(response));
                  resolve(response)
              });
        }, err => {
            console.error("Error: ", err)
            reject(err);
        });
      });
      }

  async googleBrowserAuth(): Promise<any> {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(function(result) {
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          return result.credential;
        }
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }).catch(function(error) {
      return error;
    });
  }

  async nativeFacebookAuth(): Promise<void> {
    try {
      const response = await this.facebook.login(["public_profile", "email"]);

      console.log(response);

      if (response.authResponse) {
        // User is signed-in Facebook.
        const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(response.authResponse, firebaseUser)) {
            // Build Firebase credential with the Facebook auth token.
            const credential = firebase.auth.FacebookAuthProvider.credential(
              response.authResponse.accessToken
            );
            // Sign in with the credential from the Facebook user.
            firebase
              .auth()
              .signInWithCredential(credential)
              .catch(error => {
                console.log(error);
              });
          } else {
            // User is already signed-in Firebase with the correct user.
            console.log("already signed in");
          }
        });
      } else {
        // User is signed-out of Facebook.
        firebase.auth().signOut();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async browserFacebookAuth(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      return result;
    } catch (err) {
      return err;
    }
  }

  isUserEqual(facebookAuthResponse, firebaseUser): boolean {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;

      providerData.forEach(data => {
        if (
          data.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          data.uid === facebookAuthResponse.userID
        ) {
          // We don't need to re-auth the Firebase connection.
          return true;
        }
      });
    }

    return false;
  }

  async logoutUser(): Promise<void>{
    firebase.auth().signOut().then(
      (success) => {
        return success;
      },
      error => {
        return error;
      }
    )};
}