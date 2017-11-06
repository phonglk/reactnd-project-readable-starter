import {
  POSTS_DONE,
  POSTS_LOADING,
  POST_VOTED,
  POST_VOTING,
  POST_LOADING,
  POST_DONE,
  POST_EXIST,
} from './actionType';
import createDataReducer from '../../util/create-data-reducer';

export default createDataReducer({
  LOADING: POSTS_LOADING,
  DONE: POSTS_DONE,
  reducer: (state, action) => {
    switch (action.type) {
      case POST_VOTING: return ({
        ...state,
        ref: {
          ...state.ref,
          [action.post.id]: {
            ...action.post,
            voteScore: action.post.voteScore + (action.option === 'up' ? 1 : -1),
          }
        }
      })
      case POST_VOTED: {
        return {
          ...state,
          ref: {
            ...state.ref,
            [action.post.id]: action.post,
          }
        }
      }
      case POST_LOADING: {
        return {
          ...state,
          isLoading: true,
        }
      }
      case POST_DONE: {
        const { payload: post } = action;
        return {
          ...state,
          ref: {
            ...state.ref,
            [post.id]: post,
          },
          isLoading: false,
        }
      }
      case POST_EXIST: return { ...state, isLoading: false }
      default: return state;
    }
  }
})