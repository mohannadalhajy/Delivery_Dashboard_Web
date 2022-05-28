
import { createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import allReducers from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension'
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(
    allReducers,
    composedEnhancer);
  
export default store;  