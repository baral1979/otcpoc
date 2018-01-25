import {combineReducers} from 'redux';
import contractReducer from './contracts.js';
import notificationReducer from './notifications.js';
import transactionReducer from './transactions.js';
import userReducer from './user.js';

const reducers = combineReducers({
  contracts: contractReducer,
  notifications: notificationReducer,
  transactions: transactionReducer,
  user: userReducer
})

export default reducers;
