import { combineReducers } from 'redux';
import posts from './posts';
import comments from './comments';
import categories from './categories';
import app from './app';
export default combineReducers({ posts, comments, categories, app });