import React from 'react';

const FormContext = React.createContext({});

export interface FieldProps<T, K extends keyof T> {
  name: K;
}

export class Field<T, K extends keyof T> extends React.Component<
  FieldProps<T, K>
> {
  public static contextType = FormContext;
  public constructor(props: FieldProps<T, K>) {
    super(props);
    this.context.addField(this);
  }

  public render() {
    return <input type="text" name={`${this.props.name}`} />;
  }
}

export interface FormProps<T> {
  onSubmit: (values: T) => void | Promise<void>;
}

interface FormState<T, K extends keyof T> {
  fields: Field<T, K>[];
  addField: (field: Field<T, K>) => void;
}

export class Form<T, K extends keyof T> extends React.Component<
  FormProps<T>,
  FormState<T, K>
> {
  public constructor(props: FormProps<T>) {
    super(props);
    this.state = { fields: [], addField: this.addField.bind(this) };
  }

  public render() {
    return (
      <FormContext.Provider value={this.state}>
        {this.props.children}
      </FormContext.Provider>
    );
  }

  private addField(field: Field<T, K>) {
    this.setState({ fields: [...this.state.fields, field] });
  }
}
