import Header from './Header';

const App = ({ children }: { children?: React.ReactNode }) => (
  <main>
    <Header />
    {children}
  </main>
);

export default App;
