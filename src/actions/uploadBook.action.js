import { UPLOAD_BOOK_SUCCESS, UPLOAD_BOOK_ERROR } from "./types";
import { UPLOAD_BOOK_SUCCESS_MESSAGE, UPLOAD_BOOK_ERROR_MESSAGE } from "../constants/notificationMessages";
import mongoDBApi from '../api/mongoDbServer';

export const uploadBook = book => async dispatch => {
    await mongoDBApi
        .post("/books", book)
        .then(response => {
            sendNotification(
                UPLOAD_BOOK_SUCCESS,
                UPLOAD_BOOK_SUCCESS_MESSAGE,
                dispatch
            );
        })
        .catch(error => {
            sendNotification(
                UPLOAD_BOOK_ERROR,
                `${UPLOAD_BOOK_ERROR_MESSAGE}, error: ${error}`,
                dispatch
            );
        });
};

const sendNotification = async (type, message, dispatch) => {
    dispatch({
        type,
        payload: { type, message }
    });
};
  