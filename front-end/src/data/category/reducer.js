import {
  CATEGORIES_DONE,
  CATEGORIES_LOADING,
} from './actionType';
import createDataReducer from '../../util/create-data-reducer';

export default createDataReducer({
  LOADING: CATEGORIES_LOADING,
  DONE: CATEGORIES_DONE,
  key: 'path',
})