import App from '../components/App';
import { Form, Field } from '../components/Form';

// interface Value {
//   foo: string;
// }

export default () => (
  <App>
    <h1>フォームテスト</h1>
    <Form
      onSubmit={values => {
        console.log(values);
      }}
    >
      <Field name="foo" />
    </Form>
  </App>
);
