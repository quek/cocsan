import React from 'react';
import { Subscribe } from 'unstated';
import NewContainer from './NewContainer';
import { Form, Field } from 'react-final-form';
import Character from '../../models/Character';
import ErrorMessage from '../ErrorMessage';
import AppContainer from '../AppContainer';
import currentUser from '../../currentUser';

interface Props {
  c: NewContainer;
  app: typeof AppContainer;
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
            <div>
              <button>作る</button>
            </div>
          </form>
        )}
      />
    );
  }

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
