export const LOAD_ALL_ORDER = 'LOAD_ALL_ORDER';
export const PLACE_ORDER = 'PLACE_ORDER';
import * as PlaceYourOrderApi from '../services/PlaceYourOrderApi';
import * as LoadingActions from './LoadingActions';
import * as ErrorActions from './ErrorActions';

function loadAllOrders(orders) {
    return {
        type: LOAD_ALL_ORDER,
        orders
    }
};

function _placeOrder(order, error, success) {
    return {
        type: PLACE_ORDER,
        order,
        error,
        success
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

export const getAllOrders = (token) => dispatch => {
    dispatch(LoadingActions.startLoading())
    PlaceYourOrderApi.getAllOrders(token)
        .then(orders => {
            dispatch(LoadingActions.stopLoading());
            dispatch(loadAllOrders(orders));
        })
};

export const placeOrder = (token, order) => dispatch => {
    dispatch(LoadingActions.startLoading());
    PlaceYourOrderApi.placeOrder(token, order)
        .then(response => {
            dispatch(LoadingActions.stopLoading());
            const error = JSON.parse(response).error;
            if (!error) {
                dispatch(ErrorActions.hideError());
                dispatch(_placeOrder(order, null, true));
            } else {
                dispatch(ErrorActions.showError());
                dispatch(_placeOrder(order, JSON.parse(response).error, false));
            }
        });
};
