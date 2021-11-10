import React from 'react';
import store from './redux/store';
import Application from './Application';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      screen: 0
    }
  }


  render() {
    const storeInstance = store()
    const { st, persistedStore } = storeInstance;
    return (
      <Provider store={st}>
        <PersistGate loading={null} persistor={persistedStore}>
          <Application />
        </PersistGate>
      </Provider>

    );
  }
}
export default App;
