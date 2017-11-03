import {
  M_CATEGORIES_ALL_POSTS_LOADING,
  CATEGORIES_LOADING,
  ALL_POSTS_LOADING,
  CATEGORIES_DONE,
  ALL_POSTS_DONE,
} from '../../consts';
export default function app(state = {
  isContentLoading: true,
  isCategoryLoading: true,
  categories: [],
}, action ) {
  switch (action.type) {
    case M_CATEGORIES_ALL_POSTS_LOADING:
      return {
        ...state,
        isContentLoading: true,
        isCategoryLoading: true,
      }
    case ALL_POSTS_DONE:
      return {
        ...state,
        isContentLoading: false,
      }
    case CATEGORIES_DONE:
      return {
        ...state,
        isCategoryLoading: false,
      }
    default: return state;
  }
}