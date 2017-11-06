export default ({
  LOADING,
  DONE,
  key = 'id',
  reducer = state => state
}) => (state = {
  ref: {},
  list: [],
  isLoading: true,
}, action ) => {
  const myReducer = {
    [LOADING]: () => ({
      ...state,
      isLoading: true,
    }),
    [DONE]: () => {
      const ref = {};
      const list = [];
      action.payload.forEach(entity => {
        ref[entity[key]] = entity;
        list.push(entity[key]);
      })
      return {
        ref,
        list,
        isLoading: false,
      }
    }
  }
  if (myReducer[action.type]) return myReducer[action.type]();
  else return reducer(state, action);
}