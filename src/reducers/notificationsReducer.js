import { BORROW_BOOKS_SUCCESS, BORROW_BOOKS_ERROR, UPLOAD_BOOK_SUCCESS, UPLOAD_BOOK_ERROR } from '../actions/types';
const INITIAL_STATE = {type:'',message:''};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case BORROW_BOOKS_SUCCESS:
        case BORROW_BOOKS_ERROR:
        case UPLOAD_BOOK_SUCCESS:
        case UPLOAD_BOOK_ERROR:
            return action.payload;
        default: 
            return state;
    }
}