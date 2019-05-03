import React from 'react';
import { d } from '../util';

const FormContext = React.createContext({});

export type Errors<T> = {
  [K in keyof T]?: T[K] extends object ? Errors<T[K]> : string
};

export interface FieldProps<T, K extends keyof T> {
  name: K;
  value?: T[K];
}

export class Field<T, K extends keyof T> extends React.Component<
  FieldProps<T, K>
> {
  public static contextType = FormContext;

  public constructor(props: FieldProps<T, K>) {
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
  fields: Field<T, keyof T>[];
  errors?: Errors<T>;
  addField: (field: Field<T, keyof T>) => void;
}

export class Form<T> extends React.Component<FormProps<T>, FormState<T>> {
  public constructor(props: FormProps<T>) {
    super(props);
    this.state = { fields: [], addField: this.addField };
  }

  public render() {
    return (
      <FormContext.Provider value={this.state}>
        <form onSubmit={this.handleSubmit}>{this.props.children}</form>
        <pre>{d(this.state)}</pre>
      </FormContext.Provider>
    );
  }

  private addField = (field: Field<T, keyof T>) => {
    this.setState(state => ({
      fields: [...state.fields, field]
    }));
  };

  private handleSubmit = async event => {
    event.preventDefault();
  };
}
