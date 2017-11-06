import { 
  POSTS_DONE,
  POSTS_LOADING,
  POST_VOTED,
  POST_VOTING,
  POST_EXIST,
  POST_LOADING,
  POST_DONE,
} from './actionType';
import { GET, POST } from '../../util/request';

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
  if(getState().data.post.ref[postId]) return {
    type: POST_EXIST,
    postId,
  };
  dispatch({ type: POST_LOADING })
  const post = await GET(`/posts/${postId}`);
  dispatch({
    type: POST_DONE,
    payload: post,
  });
}