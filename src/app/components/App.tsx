import { Provider } from 'unstated';
import Header from './Header';

const App = ({ children }: { children?: React.ReactNode }) => (
  <Provider>
    <main>
      <Header />
      {children}
    </main>
  </Provider>
);

export default App;
