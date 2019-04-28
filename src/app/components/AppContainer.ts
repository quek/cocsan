import firebase from 'firebase/app';
import { Container } from 'unstated';
import loadFirebase from '../loadFirebase';

interface State {
  currentUser?: firebase.User;
  firebase?: typeof firebase;
}

class AppContainer extends Container<State> {
  public state: State = {};

  public async loadFirebase() {
    await loadFirebase();
    this.setState({ firebase: firebase });
  }

  public login(currentUser: firebaseUser) {
    this.setState({ currentUser });
  }

  public async logout() {
    await firebase.auth().signOut();
  }
}

export default new AppContainer();
