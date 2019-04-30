import React from 'react';
import { Subscribe } from 'unstated';
import NewContainer from './NewContainer';
import { Form, Field } from 'react-final-form';
import Character from '../../models/Character';
import ErrorMessage from '../ErrorMessage';
import AppContainer from '../AppContainer';
import currentUser from '../../currentUser';
import styled from 'styled-components';
import { d } from '../../util';

const Row = styled.div`
  display: flex;
`;

const SmallField = styled(Field)`
  width: 2rem;
`;

interface Props {
  c: NewContainer;
  app: typeof AppContainer;
}

function rollD6() {
  return Math.floor(Math.random() * Math.floor(6));
}

function roll2d6() {
  return rollD6() + rollD6() + rollD6();
}

function roll3d6() {
  return rollD6() + rollD6() + rollD6();
}

class New extends React.Component<Props> {
  public render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <div>
              <label>名前</label>
              <Field type="text" name="name" component="input" />
              <ErrorMessage name="name" />
            </div>
            <Row>
              <div>
                <label>STR</label>
                <SmallField type="number" name="str" component="input" />
              </div>
              <div>
                <label>DEX</label>
                <SmallField type="number" name="dex" component="input" />
              </div>
              <div>
                <label>INT</label>
                <SmallField type="number" name="int" component="input" />
              </div>
              <div>
                <label>アイデア</label>
                {props.values.アイデア}
                <SmallField type="hidden" name="アイデア" component="input" />
              </div>
            </Row>
            <div>
              <button onClick={this.handleInitialize(props)}>初期化</button>
              <button>作る</button>
            </div>
            <div>{d(props.values)}</div>
          </form>
        )}
      />
    );
  }

  private handleInitialize = props => {
    return event => {
      event.preventDefault();
      const { batch, change } = props.form;
      batch(() => {
        change('str', roll3d6());
        change('dex', roll3d6());
        const int = roll2d6() + 6;
        change('int', int);
        change('アイデア', int * 5);
      });
    };
  };

  private handleSubmit = async (values: object) => {
    console.log(values);
    const character = {
      ...(values as Character),
      uid: currentUser().uid
    };
    await this.props.c.create(character);
  };
}

export default () => (
  <Subscribe to={[NewContainer, AppContainer]}>
    {(c: NewContainer, app: typeof AppContainer) => <New {...{ c, app }} />}
  </Subscribe>
);
