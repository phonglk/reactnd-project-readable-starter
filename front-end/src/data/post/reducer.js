import {
  POSTS_DONE,
  POSTS_LOADING,
  POST_VOTED,
  POST_VOTING,
  POST_LOADING,
  POST_DONE,
  POST_EXIST,
  POST_DELETE_DONE,
  POST_DELETE_PROGRESS,
  POST_EDIT_DONE,
  POST_EDIT_PROGRESS,
  POST_POST_DONE,
  POST_POST_PROGRESS
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
      case POST_POST_PROGRESS: {
        return {
          ...state,
          isPosting: true,
        }
      }
      case POST_POST_DONE: {
        const { post } = action;
        return {
          ...state,
          isPosting: false,
          list: state.list.concat(post.id),
          ref: {
            ...state.ref,
            [post.id]: post,
          },
        }
      }
      case POST_DELETE_PROGRESS: {
        return {
          ...state,
          isLoading: true,
        }
      }
      case POST_DELETE_DONE: {
        return {
          ...state,
          isLoading: false,
          list: state.list.filter(id => id !== action.post.id),
        }
      }
      case POST_EDIT_PROGRESS: {
        return {
          ...state,
          isLoading: true,
        }
      }
      case POST_EDIT_DONE: {
        const { post } = action;
        return {
          ...state,
          isLoading: false,
          ref: {
            ...state.ref,
            [post.id]: post,
          }
        }
      }
      default: return state;
    }
  }
})