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
import createDataReducer from '../../util/create-data-reducer';

export default createDataReducer({
  LOADING: COMMENTS_LOADING,
  DONE: COMMENTS_DONE,
  reducer: (state, action) => {
    switch (action.type) {
      case COMMENT_VOTING: return ({
        ...state,
        ref: {
          ...state.ref,
          [action.comment.id]: {
            ...action.comment,
            voteScore: action.comment.voteScore + (action.option === 'up' ? 1 : -1),
          }
        }
      })
      case COMMENT_VOTED: {
        return {
          ...state,
          ref: {
            ...state.ref,
            [action.comment.id]: action.comment,
          }
        }
      }
      case COMMENT_POST_PROGRESS: {
        return {
          ...state,
          isPosting: true,
        }
      }
      case COMMENT_POST_DONE: {
        const { comment } = action;
        return {
          ...state,
          isPosting: false,
          list: state.list.concat(comment.id),
          ref: {
            ...state.ref,
            [comment.id]: comment,
          },
        }
      }
      case COMMENT_DELETE_PROGRESS: {
        return {
          ...state,
          isLoading: true,
        }
      }
      case COMMENT_DELETE_DONE: {
        return {
          ...state,
          isLoading: false,
          list: state.list.filter(id => id !== action.comment.id),
        }
      }
      case COMMENT_EDIT_PROGRESS: {
        return {
          ...state,
          isLoading: true,
        }
      }
      case COMMENT_EDIT_DONE: {
        const { comment } = action;
        return {
          ...state,
          isLoading: false,
          ref: {
            ...state.ref,
            [comment.id]: comment,
          }
        }
      }
      default: return state;
    }
  }
})