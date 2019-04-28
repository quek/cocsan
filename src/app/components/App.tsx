import { Provider } from 'unstated';
import Header from './Header';
import EnsureLogin from './EnsureLogin';

const App = ({ children }: { children?: React.ReactNode }) => (
  <Provider>
    <main>
      <EnsureLogin />
      <Header />
      {children}
    </main>
  </Provider>
);

export default App;
