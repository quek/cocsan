import React from 'react';
import { d } from '../util';

const FormContext = React.createContext({});

export type Errors<T> = {
  [K in keyof T]?: T[K] extends object ? Errors<T[K]> : string
};

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
    return (
      <input
        type="text"
        name={`${this.props.name}`}
        defaultValue={this.context.getValue(this.props.name)}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = event => {
    const value = event.target.value;
    this.context.setValue(this.props.name, value);
  };
}

export interface FormProps<T> {
  onSubmit: (values: T) => void | Promise<void>;
  values?: Partial<T>;
}

interface FormState<T> {
  fields: Field<T>[];
  errors?: Errors<T>;
  values: Partial<T>;
  addField: (field: Field<T>) => void;
  getValue: <K extends keyof T>(name: K) => T[K] | undefined;
  setValue: <K extends keyof T>(name: K, value: T[K]) => void;
}

export class Form<T> extends React.Component<FormProps<T>, FormState<T>> {
  public constructor(props: FormProps<T>) {
    super(props);
    this.state = {
      fields: [],
      values: this.props.values || {},
      addField: this.addField,
      getValue: this.getValue,
      setValue: this.setValue
    };
  }

  public render() {
    return (
      <FormContext.Provider value={this.state}>
        <form onSubmit={this.handleSubmit}>{this.props.children}</form>
        <pre>{d(this.state.values)}</pre>
      </FormContext.Provider>
    );
  }

  private addField = (field: Field<T>) => {
    this.setState(state => ({
      fields: [...state.fields, field]
    }));
  };

  private getValue = <K extends keyof T>(name: K) => {
    return this.state.values[name];
  };

  private setValue = <K extends keyof T>(name: K, value: T[K]) => {
    this.setState(state => ({
      values: { ...state.values, [name]: value }
    }));
  };

  private handleSubmit = async event => {
    event.preventDefault();
    await this.props.onSubmit(this.state.values as T);
  };
}
