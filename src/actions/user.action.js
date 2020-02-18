import { FETCH_CURRENT_USER, DEACTIVATE_CURRENT_USER } from "./types";
import mongoDBApi from '../api/mongoDbServer';

export const saveCurrentUser = user => async dispatch => {
    await mongoDBApi.post("/users", user);
    fetchUserAPI(user.id, dispatch);
};

const fetchUserAPI = async (userId, dispatch) => {
    const response = await mongoDBApi.get(`users/${userId}`);
    dispatch({
        type: FETCH_CURRENT_USER,
        payload: response.data
    });
};

export const deactivateCurrentUser = userId => async dispatch => {
    await mongoDBApi.delete(`users/${userId}`);
    dispatch({
      type: DEACTIVATE_CURRENT_USER
    });
  };