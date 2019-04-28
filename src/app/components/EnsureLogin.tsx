import React from 'react';
import firebase from 'firebase/app';

export default class EnsureLogin extends React.Component<{}> {
  public render() {
    return (
      <div>
        <button onClick={this.logout}>ログアウト</button>
        {this.props.children}
      </div>
    );
  }

  public async componentDidMount() {
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      console.log('onAuthStateChanged');
      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
      }
    });
  }

  private logout = async () => {
    await firebase.auth().signOut();
  };
}
