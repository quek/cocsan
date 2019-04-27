import { Container } from 'unstated';

interface Character {
  name: string;
}

interface State {
  characters: Character[];
}

export default class IndexContainer extends Container<State> {
  state = { characters: [{ name: 'にゃ～' }] };
}
