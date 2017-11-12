import { 
  COMMENTS_DONE,
  COMMENTS_LOADING,
  COMMENT_VOTED,
  COMMENT_VOTING,
  COMMENT_POST_PROGRESS,
  COMMENT_POST_DONE,
  COMMENT_DELETE_DONE,
  COMMENT_DELETE_PROGRESS,
  COMMENT_EDIT_DONE,
  COMMENT_EDIT_PROGRESS,
} from './actionType';
import { GET, POST, PUT, DELETE } from '../../util/request';

export const requestComments = (postId) =>  async (dispatch) => {
  dispatch({ type: COMMENTS_LOADING })
  const comments = await GET(`/posts/${postId}/comments`);
  dispatch({
    type: COMMENTS_DONE,
    payload: comments,
  });
}

export const voteComment = (comment, option) => {
  return async (dispatch) => {
    dispatch({ type: COMMENT_VOTING, comment, option });
    const body = JSON.stringify({ option: `${option}Vote`})
    const updatedComment = await POST(`/comments/${comment.id}`, body);
    dispatch({ type: COMMENT_VOTED, comment: updatedComment });
  }
}

export const postComment = (postId, commentContent, author) => {
  return async (dispatch) => {
    dispatch({ type: COMMENT_POST_PROGRESS });
    const timestamp = new Date().getTime();
    const id = Math.random().toString(32).substr(-10);
    const comment = {
      id,
      voteScore: 1,
      timestamp,
      body: commentContent,
      author,
      parentId: postId,
    };
    const body = JSON.stringify(comment)
    await POST(`/comments`, body);
    dispatch({ type: COMMENT_POST_DONE, comment });
  }
}

export const deleteComment = (comment) => {
  return async (dispatch) => {
    dispatch({ type: COMMENT_DELETE_PROGRESS, comment });
    const updatedComment = await DELETE(`/comments/${comment.id}`);
    dispatch({ type: COMMENT_DELETE_DONE, comment: updatedComment });
  }
}

export const updateComment = (comment) => {
  return async (dispatch) => {
    dispatch({ type: COMMENT_EDIT_PROGRESS, comment });
    const body = JSON.stringify({ ...comment, timestamp: new Date().getTime() })
    const updatedComment = await PUT(`/comments/${comment.id}`, body);
    dispatch({ type: COMMENT_EDIT_DONE, comment: updatedComment });
  }
}