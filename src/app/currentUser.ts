import firebase from 'firebase/app';

export default (): firebase.User => {
  const user = firebase.auth().currentUser;
  if (!user) {
    throw new Error('Login required!');
  }
  return user;
};
