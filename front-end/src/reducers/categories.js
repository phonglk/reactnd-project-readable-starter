import {
  CATEGORIES_DONE,
} from '../consts';

export default function posts(state = {
  category: {},
  list: [],
}, action ) {
  switch (action.type) {
    case CATEGORIES_DONE: {
      const category = {};
      const list = [];
      action.categories.forEach(c => {
        category[c.path] = c;
        list.push(c.path);
      })
      return {
        ...state,
        category,
        list,
      }
    }
    default: return state;
  }
}