import firebase from 'firebase/app';
import { Container } from 'unstated';
import Character from '../../models/Character';

interface State {
  foo: string;
}

export default class IndexContainer extends Container<State> {
  public state = { foo: '' };

  public async create(character: Character) {
    await firebase
      .firestore()
      .collection('characters')
      .add(character);
  }
}
