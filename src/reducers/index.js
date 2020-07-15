import { combineReducers } from 'redux';
import malfunction from './malfunction';
import jumper from './jumper';

export default combineReducers({
  malfunction,
  jumper,
});
