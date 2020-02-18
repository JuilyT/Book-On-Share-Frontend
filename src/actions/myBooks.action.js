import { MY_BOOKS } from "./types";
import mongoDBApi from '../api/mongoDbServer';

export const getMyBooks = (status, page, userId) => async dispatch => {
    const api = `/books/?status=${status}`;
    const apiByuser = userId ? `${api}&borrowerId=${userId}` : api;
    const apiPerPage = page ? `${apiByuser}&page=${page}` : apiByuser;
    const response = await mongoDBApi.get(apiPerPage);
  
    dispatch({
      type: MY_BOOKS,
      payload: response.data
    });
};