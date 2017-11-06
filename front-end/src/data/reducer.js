import { combineReducers } from 'redux';
import post from './post/reducer';
import comment from './comment/reducer';
import category from './category/reducer';
export default combineReducers({ post, category, comment });