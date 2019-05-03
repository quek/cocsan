import React from 'react';

export interface FieldProps<T, K extends keyof T> {
  name: K;
}

export class Field<T, K extends keyof T> extends React.Component<
  FieldProps<T, K>
> {
  public constructor(props: FieldProps<T, K>) {
    super(props);
  }

  public render() {
    return <input type="text" name={`${this.props.name}`} />;
  }
}

export interface FormProps<T> {
  onSubmit: (values: T) => void | Promise<void>;
}

export class Form<T, K extends keyof T> extends React.Component<FormProps<T>> {
  private fields: Field<T, K>[];

  public constructor(props: FormProps<T>) {
    super(props);
    this.fields = [];
  }

  public addField(field: Field<T, K>) {
    this.fields.push(field);
  }
}
