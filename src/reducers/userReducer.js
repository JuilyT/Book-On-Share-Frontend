import { FETCH_CURRENT_USER, DEACTIVATE_CURRENT_USER } from '../actions/types';

export default (state=null, action) => {
    switch(action.type) {
        case FETCH_CURRENT_USER:
            return action.payload;
        case DEACTIVATE_CURRENT_USER:
            return null;
        default:
            return state;
    }
}