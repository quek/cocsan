import React from 'react';
import firebase from 'firebase/app';
import AppContainer from './AppContainer';

interface Props {
  appContainer: typeof AppContainer;
}

export default class EnsureLogin extends React.Component<Props> {
  public render() {
    const { currentUser } = this.props.appContainer.state;
    if (!currentUser) {
      return <p>loading...</p>;
    }
    return (
      <div>
        {currentUser.displayName}
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
        this.props.appContainer.login(firebaseUser);
      } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
      }
    });
  }

  private logout = async () => {
    await this.props.appContainer.logout();
  };
}
