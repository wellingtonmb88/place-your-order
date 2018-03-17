import {
    LOAD_ALL_CART,
    SAVE_PRODUCT_TO_CART,
    REMOVE_ALL_CART,
    REMOVE_PRODUCT_FROM_CART
} from '../actions/CartActions';

export function reducer(state = {}, action) {
    const { id, product, cart } = action

    switch (action.type) {

        case REMOVE_ALL_CART:
            return {
                ...state,
                cart: []
            };

        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                cart: Object.keys(state.cart).reduce((result, key) => {
                    if (key !== id) {
                        result[key] = state.cart[key];
                    }
                    return result;
                }, {})
            };

        case LOAD_ALL_CART:
            return {
                ...state,
                cart
            };

        case SAVE_PRODUCT_TO_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [product.id]: product
                }
            };

        default:
            return state
    }
};