
import * as PlaceYourOrderApi from '../services/PlaceYourOrderApi';
import * as LoadingActions from './LoadingActions';
import * as ErrorActions from './ErrorActions';

export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';

function _getProductList(productList) {
    return {
        type: GET_PRODUCT_LIST,
        products: productList
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

export const getProductList = () => dispatch => {
    dispatch(LoadingActions.startLoading());
    PlaceYourOrderApi.getProductList('')
        .then(response => {
            dispatch(LoadingActions.stopLoading());
            dispatch(_getProductList(JSON.parse(response)));
        });
};