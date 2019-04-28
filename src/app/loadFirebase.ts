import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'isomorphic-unfetch';

let promise: Promise<{}> | null = null;

const loadFirebase = () => {
  if (promise) {
    return promise;
  }
  promise = new Promise(resolve => {
    fetch('/__/firebase/init.json')
      .then(response => {
        return response.json();
      })
      .then(config => {
        firebase.initializeApp(config);
        resolve(firebase);
      });
  });
  return promise;
};

export default loadFirebase;
