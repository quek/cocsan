import { Field } from 'react-final-form';

const ErrorMessage = ({ name }: { name: string }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <div>{error}</div> : null
    }
  />
);

export default ErrorMessage;
