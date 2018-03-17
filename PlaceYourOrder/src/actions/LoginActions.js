
import * as PlaceYourOrderApi from '../services/PlaceYourOrderApi';
import * as LoadingActions from './LoadingActions';
import * as ErrorActions from './ErrorActions';

export const AUTH_USER = 'AUTH_USER';

function authUser(token, error) {
    return {
        type: AUTH_USER,
        token,
        error
    }
};

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const authCustomer = (email, password) => dispatch => {
    dispatch(LoadingActions.startLoading());
    PlaceYourOrderApi.authCustomer(email, password)
        .then(response => {
            dispatch(LoadingActions.stopLoading());
            if (!isJsonString(response)) {
                dispatch(ErrorActions.hideError());
                dispatch(authUser("Bearer " + response, undefined));
            } else {
                dispatch(ErrorActions.showError());
                dispatch(authUser(undefined, JSON.parse(response).error));
            }
        });
};