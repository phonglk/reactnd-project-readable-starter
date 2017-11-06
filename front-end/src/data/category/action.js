import { CATEGORIES_DONE, CATEGORIES_LOADING } from './actionType';
import { GET } from '../../util/request';

export const requestCategories = () =>  async (dispatch) => {
  dispatch({ type: CATEGORIES_LOADING })
  const { categories } = await GET('/categories');
  dispatch({
    type: CATEGORIES_DONE,
    payload: categories,
  });
}