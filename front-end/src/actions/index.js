import { request } from '../util/api';
import {
  M_CATEGORIES_ALL_POSTS_LOADING,
  CATEGORIES_LOADING,
  ALL_POSTS_LOADING,
  CATEGORIES_DONE,
  ALL_POSTS_DONE,
} from '../consts';

const requestCategories = (dispatch) => {
  request('/categories').then(({ categories }) => {
    dispatch({
      type: CATEGORIES_DONE,
      categories,
    });
  });
}

const requestAllPosts = (dispatch) => {
  request('/posts').then((posts) => {
    dispatch({
      type: ALL_POSTS_DONE,
      posts,
    });
  });
}

export const indexInit = () => {
  return async (dispatch, getState) => {
    if (getState().categories.list.length === 0) {
      dispatch({ type: M_CATEGORIES_ALL_POSTS_LOADING});
      requestCategories(dispatch);
      requestAllPosts(dispatch);
    } else {
      requestAllPosts(dispatch);
    }
  }
}