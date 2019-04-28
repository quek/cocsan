import React from 'react';
import { Provider, Subscribe } from 'unstated';
import AppContainer from './AppContainer';
import Header from './Header';
import EnsureLogin from './EnsureLogin';

interface Props {
  appContainer: typeof AppContainer;
}

class AppInner extends React.Component<Props> {
  public render() {
    if (!this.props.appContainer.state.firebase) {
      return <p>loading...</p>;
    }
    return (
      <EnsureLogin>
        <main>
          <Header />
          {this.props.children}
        </main>
      </EnsureLogin>
    );
  }

  public componentDidMount() {
    this.props.appContainer.loadFirebase();
  }
}

const App = ({ children }: { children?: React.ReactNode }) => (
  <Provider>
    <Subscribe to={[AppContainer]}>
      {(appContainer: typeof AppContainer) => (
        <AppInner appContainer={appContainer}>{children}</AppInner>
      )}
    </Subscribe>
  </Provider>
);

export default App;
