import { Container } from 'unstated';

interface State {
  foo: string;
}

export default class IndexContainer extends Container<State> {
  public state = { foo: '' };
}
