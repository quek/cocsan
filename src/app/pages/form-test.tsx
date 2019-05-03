import App from '../components/App';
import { Form, Field } from '../components/Form';

interface Value {
  foo: string;
  bar: string;
}

class VForm extends Form<Value> {}
class FooField extends Field<Value, 'foo'> {}

export default () => (
  <App>
    <h1>フォームテスト</h1>
    <VForm
      onSubmit={values => {
        console.log(values);
      }}
    >
      <FooField name="foo" />
    </VForm>

    <VForm
      onSubmit={values => {
        console.log(values);
      }}
    />
  </App>
);
