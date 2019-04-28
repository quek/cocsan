import firebase from 'firebase/app';
import { Container } from 'unstated';
import currentUser from '../../currentUser';
import Character from '../../models/Character';

interface State {
  characters: Character[];
}

export default class IndexContainer extends Container<State> {
  public state = { characters: [] };

  public async index() {
    const query = await firebase
      .firestore()
      .collection('characters')
      .where('uid', '==', currentUser().uid)
      .get();
    const characters = query.docs.map(doc => {
      return { name: doc.get('name'), uid: doc.get('uid') };
    });
    this.setState({ characters });
  }
}
