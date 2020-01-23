import {SEARCH_TERM} from '../actions/types';

export default (searchTerm=null, action) => {
    switch(action.type) {
        case SEARCH_TERM:
            return action.payload;
        default:
            return searchTerm;
    }
}