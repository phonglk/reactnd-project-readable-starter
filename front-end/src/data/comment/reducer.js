import {
  COMMENTS_DONE,
  COMMENTS_LOADING,
  COMMENT_VOTED,
  COMMENT_VOTING,
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
      default: return state;
    }
  }
})