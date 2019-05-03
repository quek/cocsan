import App from '../components/App';
import { Form, Field } from '../components/Form';

interface Value {
  foo: string;
  bar: number;
}

class VForm extends Form<Value> {}
class F extends Field<Value, keyof Value> {}

export default () => (
  <App>
    <h1>フォームテスト</h1>
    <VForm
      onSubmit={values => {
        console.log(values);
      }}
    >
      <F name="foo" />
      <F name="bar" />
    </VForm>
  </App>
);
