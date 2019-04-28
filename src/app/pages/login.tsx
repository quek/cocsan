import firebase from 'firebase/app';
import 'firebase/auth';
import loadFirebase from '../loadFirebase';
import App from '../components/App';

const handleLogin = async () => {
  await loadFirebase;
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

export default () => (
  <App>
    <button onClick={handleLogin}>ログイン</button>
  </App>
);
