import { combineReducers } from 'redux'
import User from './user';
import ActiveUser from './active-user';


const allReducers = combineReducers({
  users:User,
  activeUser: ActiveUser
});

export default allReducers
