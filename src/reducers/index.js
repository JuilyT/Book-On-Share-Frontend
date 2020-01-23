import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import booksReducer from '../reducers/booksReducer';
import searchTermReducer from '../reducers/searchTermReducer';
import selectedBooksReducer from '../reducers/selectedBooksReducer';
import userReducer from './userReducer';
import viewBookReducer from './viewBookReducer';

export default combineReducers({
    auth: authReducer,
    books: booksReducer,
    book: viewBookReducer,
    searchTerm: searchTermReducer,
    selectedBooks: selectedBooksReducer,
    currentUser: userReducer
});
