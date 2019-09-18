import { Injectable, NgZone } from "@angular/core";
import { Platform } from "@ionic/angular";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from "@ionic-native/facebook/ngx";
import { firebaseConfig } from '../../credentials';
import { BehaviorSubject } from "rxjs";
import firebase from "@firebase/app";
import "@firebase/auth";
import { Plugins } from '@capacitor/core';
import { resolve } from 'q';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public user: {};
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

  async loginWithFacebook(): Promise<any> {
    if (this.platform.is("capacitor")) {
      var nativeFb=this.nativeFacebookAuth();

      return nativeFb;
    } else {
      var fbWithBrowser=this.browserFacebookAuth();
      
      return fbWithBrowser
    }
  }

  async loginWithGoogle(): Promise<any> {
      var googleDeviceLogin=this.googleSignIn();

      return googleDeviceLogin;
  }

  async googleSignIn(): Promise<any> {
    try{
      const result = await Plugins.GoogleAuth.signIn()
      const googleCredential = await firebase.auth.GoogleAuthProvider.credential(result.authentication.idToken);
      const response = await firebase.auth().signInWithCredential(googleCredential);
      var token = response.credential.toJSON();
      // The signed-in user info.
      var user = response.user;

      console.log(response);
      console.log(token);
      console.log(user.toJSON());
      return response.additionalUserInfo.profile;
    }
    catch (error) {
        return error.message;
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

  async nativeFacebookAuth(): Promise<any> {
    try {
      const result = await this.facebook.login(["public_profile", "email"]);
      const facebookCredential = await firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
      const response = await firebase.auth().signInWithCredential(facebookCredential);
      console.log("facebook response: " + JSON.stringify(response));
      return response.additionalUserInfo.profile;
    } catch (err) {
      return err;
    }
  }

  async browserFacebookAuth(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      
      var token = result.credential.toJSON();
      // The signed-in user info.
      var user = result.user;

      console.log(result);
      console.log(token);
      console.log(user);
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