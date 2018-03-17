export const LOAD_ALL_CART = 'LOAD_ALL_CART';
export const SAVE_PRODUCT_TO_CART = 'SAVE_PRODUCT_TO_CART';
export const REMOVE_ALL_CART = 'REMOVE_ALL_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
import * as CartService from '../services/CartService';

function loadAllCart(cart) {
    return {
        type: LOAD_ALL_CART,
        cart
    }
};

function _addProductToCart(product) {
    return {
        type: SAVE_PRODUCT_TO_CART,
        product
    }
};

function removeAllCart() {
    return {
        type: REMOVE_ALL_CART
    }
}

function removeProductFromCart(id) {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        id
    }
}

export const getAllCart = () => dispatch => (
    CartService.fetchAllCart()
        .then(cart => dispatch(loadAllCart(JSON.parse(cart))))
);

export const addProductToCart = (product) => dispatch => {
    dispatch(_addProductToCart(product));
};

export const deleteDeck = (id) => dispatch => {
    dispatch(removeProductFromCart(id));
};

export const deleteAllCart = () => dispatch => (
    CartService.clearAllCart()
        .then(dispatch(removeAllCart()))
);
