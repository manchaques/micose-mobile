import {combineReducers} from 'redux';

import * as bookReducers from './bookReducers';
import * as userReducers from './userReducers';
import * as loginReducers from './loginReducers';
import * as routes from './routesReducers';
import * as communityReducers from './communityReducers';

const allReducers = Object.assign({}, bookReducers, loginReducers, routes, communityReducers, userReducers);
const rootReducer = combineReducers(allReducers);

export default rootReducer