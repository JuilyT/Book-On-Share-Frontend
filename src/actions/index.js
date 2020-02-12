import {
            SIGN_IN, 
            SIGN_OUT, 
            FETCH_BOOKS,  
            SEARCH_TERM, 
            SELECTED_BOOKS, 
            CLEAR_SELECTED_BOOKS, 
            FETCH_CURRENT_USER, 
            DEACTIVATE_CURRENT_USER,
            MY_BOOKS,
            BORROW_BOOKS_SUCCESS,
            BORROW_BOOKS_ERROR,
            UPLOAD_BOOK_SUCCESS,
            UPLOAD_BOOK_ERROR
        } from './types';
import { 
            BORROW_BOOKS_SUCCESS_MESSAGE, 
            BORROW_BOOKS_ERROR_MESSAGE, 
            UPLOAD_BOOK_SUCCESS_MESSAGE, 
            UPLOAD_BOOK_ERROR_MESSAGE 
        } from '../constants/notificationMessages';        
import jsonServerApi from '../api/jsonserver';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type:SIGN_OUT
    }
}

const fetchBookAPI = async (term, page, dispatch) => {
    const titleQuery = term ? `title=${term}`: "";
    const api = `/books?${titleQuery}&_page=${page}`;
    const response = await jsonServerApi.get(api);
    dispatch({
        type: FETCH_BOOKS,
        payload: response.data
    });
}

export const fetchBooks = (term, page) => async (dispatch) => {
    fetchBookAPI(term, page, dispatch);
}

export const searchTerm = (term) => {
    return {
        type: SEARCH_TERM,
        payload: term
    }
}

export const onSelectedBooks = (book) => {
    return  {
        type: SELECTED_BOOKS,
        payload: book
    }
}

export const borrowBooks = (book) => async (dispatch) => {
    jsonServerApi.put(`/books/${book.id}`, book)
        .then(response => {
            sendNotification(BORROW_BOOKS_SUCCESS, BORROW_BOOKS_SUCCESS_MESSAGE, dispatch);
        })
        .catch(error => {
            sendNotification(BORROW_BOOKS_ERROR, `${BORROW_BOOKS_ERROR_MESSAGE}, error: ${error}`, dispatch);
        });
    fetchBookAPI("", 1, dispatch);
}

export const discardSelectedbooks = () => (dispatch) => {
    dispatch({
        type: CLEAR_SELECTED_BOOKS
    });
}

export const saveCurrentUser = (user) => async (dispatch) => {
    await jsonServerApi.post("/users", user);
    fetchUserAPI(user.id, dispatch);
}

const fetchUserAPI = async (userId, dispatch) => {
    const response = await jsonServerApi.get(`users/${userId}`);
    dispatch({
        type: FETCH_CURRENT_USER,
        payload: response.data
    });
}

export const getUserById = (userId) => async (dispatch) => {
    fetchUserAPI(userId, dispatch);
}

export const deactivateCurrentUser = (userId) => async (dispatch) => {
    await jsonServerApi.delete(`users/${userId}`);
    dispatch({
        type: DEACTIVATE_CURRENT_USER
    });
}

export const uploadBook = (book) => async (dispatch) => {
    await jsonServerApi.post("/books", book)
        .then(response => {
            sendNotification(UPLOAD_BOOK_SUCCESS, UPLOAD_BOOK_SUCCESS_MESSAGE, dispatch);
        })
        .catch(error => {
            sendNotification(UPLOAD_BOOK_ERROR, `${UPLOAD_BOOK_ERROR_MESSAGE}, error: ${error}`, dispatch);
        });
}

export const getMyBooks = (status, page, userId) => async (dispatch) => {
    const api = `/books/?status=${status}`;
    const apiByuser = userId ? `${api}&borrower.id=${userId}` : api;
    const apiPerPage = page ? `${apiByuser}&_page=${page}` : apiByuser;
    const response = await jsonServerApi.get(apiPerPage);
    
    dispatch({
        type: MY_BOOKS,
        payload: response.data
    });
}

const sendNotification = async (type, message, dispatch) => {
    dispatch({
        type,
        payload: {type, message}
    });
}