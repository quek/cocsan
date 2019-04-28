import { Container } from 'unstated';

interface Character {
  name: string;
}

interface State {
  characters: Character[];
}

export default class IndexContainer extends Container<State> {
  public state = { characters: [{ name: 'にゃ～' }] };
}
