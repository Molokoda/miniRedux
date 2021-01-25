import { createStore } from 'redux';
import userReducer from './reducer/userReducer.js'
const store = createStore(userReducer);

export default store;