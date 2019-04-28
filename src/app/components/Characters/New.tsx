import React from 'react';
import { Subscribe } from 'unstated';
import NewContainer from './NewContainer';
import { Form, Field } from 'react-final-form';
import Character from '../../models/Character';
import ErrorMessage from '../ErrorMessage';

interface Props {
  c: NewContainer;
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

  private handleSubmit = (values: Partial<Character>) => {
    console.log(values);
  };
}

export default () => (
  <Subscribe to={[NewContainer]}>
    {(c: NewContainer) => <New {...{ c }} />}
  </Subscribe>
);
