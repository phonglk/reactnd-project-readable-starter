import { 
  COMMENTS_DONE,
  COMMENTS_LOADING,
  COMMENT_VOTED,
  COMMENT_VOTING,
} from './actionType';
import { GET, POST } from '../../util/request';

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