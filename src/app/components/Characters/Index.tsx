import React from 'react';
import { Subscribe } from 'unstated';
import IndexContainer from './IndexContainer';
import Character from '../../models/Character';

interface Props {
  c: IndexContainer;
}

class Index extends React.Component<Props> {
  public render() {
    return (
      <div>
        <ul>
          {this.props.c.state.characters.map((character: Character, index) => (
            <li key={index}>{character.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  public componentDidMount() {
    this.props.c.index();
  }
}

export default () => (
  <Subscribe to={[IndexContainer]}>
    {(c: IndexContainer) => <Index {...{ c }} />}
  </Subscribe>
);
