import { SELECTED_BOOKS, CLEAR_SELECTED_BOOKS } from '../actions/types';

const INITIAL_STATE = [];

const addNewBook = (books, book) => {
    const newBookList = [...books];
    if (!newBookList.some(o => o._id === book._id)) {
        newBookList.push(book);
        return newBookList;
    } 
    const reducedList = newBookList.filter(obj=>{return obj._id!==book._id}); 
    console.log(reducedList);
    return reducedList;
}


export default (state=INITIAL_STATE, action) => {

    switch (action.type) {
        case SELECTED_BOOKS:
            return [...addNewBook(state, action.payload)];
        case CLEAR_SELECTED_BOOKS:
            return [...[]];
        default:
            return state;
    }
}
