import { FETCH_BOOK } from '../actions/types';

export default (state={}, action) => {
    switch(action.type) {
        case FETCH_BOOK:
            return action.payload;
        default:
            return state;
    }
}