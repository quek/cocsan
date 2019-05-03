import App from '../components/App';
import { Form, Field } from '../components/Form';

interface Value {
  foo: string;
  bar: string;
}

class VForm extends Form<Value> {}
class VField extends Field<Value> {}

export default () => (
  <App>
    <h1>フォームテスト</h1>
    <VForm
      onSubmit={values => {
        console.log(values);
      }}
    >
      <VField name="foo" />
      <VField name="bar" />
    </VForm>
  </App>
);
