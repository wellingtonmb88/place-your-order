import {
    SHOW_ERROR,
    HIDE_ERROR
} from '../actions/ErrorActions';

export function reducer(state = {}, action) {

    switch (action.type) {

        case SHOW_ERROR:
            return {
                ...state,
                show: true
            };
            
        case HIDE_ERROR:
            return {
                ...state,
                show: false
            };

        default:
            return state
    }
};