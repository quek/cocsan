import React from 'react';
import firebase from 'firebase/app';
import loadFirebase from '../loadFirebase';

export default class EnsureLogin extends React.Component<{}> {
  public render() {
    return <button onClick={this.logout}>ログアウト</button>;
  }

  public async componentDidMount() {
    await loadFirebase();
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async firebaseUser => {
        console.log('onAuthStateChanged');
        unsubscribe();
        if (firebaseUser) {
          console.log(firebaseUser);
        } else {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithRedirect(provider);
        }
      });

    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        // if (result.credential) {
        //   // This gives you a Google Access Token. You can use it to access the Google API.
        //   var token = result.credential.accessToken;
        //   // ...
        // }
        // The signed-in user info.
        var user = result.user;
        console.log('getRedirectResult');
        console.log(user);
      });
  }

  private logout = async () => {
    await loadFirebase();
    await firebase.auth().signOut();
  };
}
