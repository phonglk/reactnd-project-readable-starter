import { request } from '../util/api';
import {
  M_CATEGORIES_ALL_POSTS_LOADING,
  CATEGORIES_LOADING,
  ALL_POSTS_LOADING,
  CATEGORIES_DONE,
  ALL_POSTS_DONE,
  VOTE_LOADING,
  VOTE_DONE,
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

const requestVote = async (postId, option) => {
  const body = JSON.stringify({ option: `${option}Vote`})
  const response = await request.post(`/posts/${postId}`, body);
  return response;
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

export const postVote = (postId, option) => {
  return async (dispatch) => {
    dispatch({ type: VOTE_LOADING, postId, option });
    const post = await requestVote(postId, option);
    dispatch({ type: VOTE_DONE, post });
  }
}