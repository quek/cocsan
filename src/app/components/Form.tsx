import React from 'react';
import { d } from '../util';

const FormContext = React.createContext({});

export interface FieldProps<T> {
  name: keyof T;
}

export class Field<T> extends React.Component<FieldProps<T>> {
  public static contextType = FormContext;

  public constructor(props: FieldProps<T>) {
    super(props);
  }

  public componentDidMount() {
    this.context.addField(this);
  }

  public render() {
    return <input type="text" name={`${this.props.name}`} defaultValue="" />;
  }
}

export interface FormProps<T> {
  onSubmit: (values: T) => void | Promise<void>;
}

interface FormState<T> {
  fields: Field<T>[];
  addField: (field: Field<T>) => void;
}

export class Form<T> extends React.Component<FormProps<T>, FormState<T>> {
  public constructor(props: FormProps<T>) {
    super(props);
    this.state = { fields: [], addField: this.addField };
  }

  public render() {
    return (
      <FormContext.Provider value={this.state}>
        {this.props.children}
        <pre>{d(this.state)}</pre>
      </FormContext.Provider>
    );
  }

  private addField = (field: Field<T>) => {
    this.setState(state => ({
      fields: [...state.fields, field]
    }));
  };
}
