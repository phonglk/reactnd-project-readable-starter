import { 
  POSTS_DONE,
  POSTS_LOADING,
  POST_VOTED,
  POST_VOTING,
  POST_EXIST,
  POST_LOADING,
  POST_DONE,
  POST_DELETE_DONE,
  POST_DELETE_PROGRESS,
  POST_EDIT_DONE,
  POST_EDIT_PROGRESS,
  POST_POST_DONE,
  POST_POST_PROGRESS,
  POSTS_SORT,
} from './actionType';
import { replace } from 'react-router-redux'
import { GET, POST, PUT, DELETE } from '../../util/request';

export const requestPosts = (category = null) =>  async (dispatch) => {
  dispatch({ type: POSTS_LOADING })
  const posts = await GET(`${category !== null ? `/${category}` : '' }/posts`);
  dispatch({
    type: POSTS_DONE,
    payload: posts,
  });
}

export const votePost = (post, option) => {
  return async (dispatch) => {
    dispatch({ type: POST_VOTING, post, option });
    const body = JSON.stringify({ option: `${option}Vote`})
    const updatedPost = await POST(`/posts/${post.id}`, body);
    dispatch({ type: POST_VOTED, post: updatedPost });
  }
}

export const requestPost = (postId) =>  async (dispatch, getState) => {
  if(getState().data.post.ref[postId]) return dispatch({
    type: POST_DONE,
    payload: getState().data.post.ref[postId],
  });
  dispatch({ type: POST_LOADING })
  const post = await GET(`/posts/${postId}`);
  if (Object.keys(post).length === 0) {
    dispatch(replace(`/`));
  } else {
    dispatch({
      type: POST_DONE,
      payload: post,
    });
  }
}

export const postPost = (post) => {
  return async (dispatch) => {
    dispatch({ type: POST_POST_PROGRESS });
    const timestamp = new Date().getTime();
    const id = Math.random().toString(32).substr(-10);
    const finalPost = {
      id,
      voteScore: 1,
      timestamp,
      ...post,
    };
    const body = JSON.stringify(finalPost)
    const updatedComment = await POST(`/posts`, body);
    dispatch({ type: POST_POST_DONE, post: finalPost });
    dispatch(replace(`/${finalPost.category}/${finalPost.id}`));
  }
}

export const deletePost = (post) => {
  return async (dispatch) => {
    dispatch({ type: POST_DELETE_PROGRESS, post });
    const updatedPost = await DELETE(`/posts/${post.id}`);
    dispatch({ type: POST_DELETE_DONE, post: updatedPost });
    dispatch(replace(`/`));
  }
}

export const updatePost = (post) => {
  return async (dispatch) => {
    dispatch({ type: POST_EDIT_PROGRESS, post });
    const body = JSON.stringify(post)
    const updatedPost = await PUT(`/posts/${post.id}`, body);
    dispatch({ type: POST_EDIT_DONE, post: updatedPost });
    dispatch(replace(`/${post.category}/${post.id}`));
  }
}

export const changeSort = (sort) => ({
  type: POSTS_SORT,
  sort,
})