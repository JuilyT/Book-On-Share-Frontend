import { 
            FETCH_BOOKS, 
            SELECTED_BOOKS,
            CLEAR_SELECTED_BOOKS,
            BORROW_BOOKS_SUCCESS, 
            BORROW_BOOKS_ERROR  
} from "./types";
import { BORROW_BOOKS_SUCCESS_MESSAGE, BORROW_BOOKS_ERROR_MESSAGE } from "../constants/notificationMessages";
import mongoDBApi from '../api/mongoDbServer';

const fetchBookAPI = async (term, page, dispatch) => {
    const titleQuery = term ? `title=${term}` : "";
    const api = `/books?${titleQuery}&page=${page}`;
    const response = await mongoDBApi.get(api);
    dispatch({
        type: FETCH_BOOKS,
        payload: response.data
    });
};

export const borrowBooks = book => async dispatch => {
    mongoDBApi
    .put(`/books/${book._id}`, book)
        .then(response => {
            sendNotification(
                BORROW_BOOKS_SUCCESS,
                BORROW_BOOKS_SUCCESS_MESSAGE,
                dispatch
            );
            fetchBookAPI("", 1, dispatch);
        })
        .catch(error => {
            sendNotification(
                BORROW_BOOKS_ERROR,
                `${BORROW_BOOKS_ERROR_MESSAGE}, error: ${error}`,
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

export const fetchBooks = (term, page) => async dispatch => {
    fetchBookAPI(term, page, dispatch);
};

export const onSelectedBooks = book => {
    return {
        type: SELECTED_BOOKS,
        payload: book
    };
};
  
export const discardSelectedbooks = () => dispatch => {
    dispatch({
        type: CLEAR_SELECTED_BOOKS
    });
};
  