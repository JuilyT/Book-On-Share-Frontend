import {
            SIGN_IN, 
            SIGN_OUT, 
            FETCH_BOOKS, 
            FETCH_BOOK, 
            SEARCH_TERM, 
            SELECTED_BOOKS, 
            CLEAR_SELECTED_BOOKS, 
            FETCH_CURRENT_USER, 
            DEACTIVATE_CURRENT_USER
        } from './types';
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

const fetchBookAPI = async (pageNum, dispatch) => {
    const api = `/books/?_page=${pageNum}`;
    const response = await jsonServerApi.get(api);
    dispatch({
        type: FETCH_BOOKS,
        payload: response.data
    });
}

export const fetchBooks = (pageNum) => async (dispatch) => {
    fetchBookAPI(pageNum, dispatch);
}

export const fetchBooksByTerm = (term, pageNum) => async (dispatch) => {
    const titleQuery = term ? `title=${term}`: "";
    const api = `/books/?${titleQuery}&_page=${pageNum}`;
    const response = await jsonServerApi.get(api);
    dispatch({
        type: FETCH_BOOKS,
        payload: response.data
    });
}

export const fetchBookById = (bookId) => async (dispatch) => {
    const response = await jsonServerApi.get(`/books/${bookId}`);
    dispatch({
        type: FETCH_BOOK,
        payload: response.data
    });
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
    await jsonServerApi.put(`/books/${book.id}`, book);
    fetchBookAPI(1, dispatch);
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