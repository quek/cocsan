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
}

export default new AppContainer();
