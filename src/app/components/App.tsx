import Header from './Header';

const App = ({ children }: { children?: ReactNode[] }) => (
  <main>
    <Header />
    {children}
  </main>
);

export default App;
