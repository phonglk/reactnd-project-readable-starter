import {
  ALL_POSTS_DONE,
  VOTE_LOADING,
  VOTE_DONE,
} from '../consts';

export default function posts(state = {
  post: {},
  list: [],
}, action ) {
  switch (action.type) {
    case ALL_POSTS_DONE: {
      const post = {};
      const list = [];
      action.posts.forEach(p => {
        post[p.id] = p;
        list.push(p.id);
      })
      return {
        ...state,
        post,
        list,
      }
    }
    case VOTE_LOADING: {
      const post = state.post[action.postId];
      return {
        ...state,
        post: {
          ...state.post,
          [action.postId]: {
            ...post,
            voteScore: post.voteScore + (action.option === 'up' ? 1 : -1),
          }
        }
      }
    }
    case VOTE_DONE: {
      return {
        ...state,
        post: {
          ...state.post,
          [action.post.id]: action.post,
        }
      }
    }
    default: return state;
  }
}