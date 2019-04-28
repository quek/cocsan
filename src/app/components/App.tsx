import { Provider } from 'unstated';
import Header from './Header';
import EnsureLogin from './EnsureLogin';

const App = ({ children }: { children?: React.ReactNode }) => (
  <Provider>
    <EnsureLogin>
      <main>
        <Header />
        {children}
      </main>
    </EnsureLogin>
  </Provider>
);

export default App;
