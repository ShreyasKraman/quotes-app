import React from 'react';

import {Provider} from 'react-redux';

import createStore from 'redux';

import Main from './app/views/Main/Main';

import reducer from './app/store/reducers/reducer';

export default function App() {

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

