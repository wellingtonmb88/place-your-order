import {
    AUTH_USER
} from '../actions/LoginActions';

export function reducer(state = {}, action) {
    const { token, error, type } = action

    switch (type) {

        case AUTH_USER:
            return {
                ...state,
                token,
                error
            };

        default:
            return state
    }
};