import {
  ALL_POSTS_DONE,
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
    default: return state;
  }
}