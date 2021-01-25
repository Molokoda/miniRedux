import React, { useEffect, useState } from 'react';
import Main from './components/main.js';
import {Provider} from 'react-redux'
import store from './store/store.js'
export default function App() {
  return(
    <Provider store = {store}>
      <Main />
    </Provider>
  )
}

