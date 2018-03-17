import {
    GET_PRODUCT_LIST
} from '../actions/ProductActions';

export function reducer(state = {}, action) {
    const { products, type } = action

    switch (type) {

        case GET_PRODUCT_LIST:
            return {
                ...state,
                products
            };

        default:
            return state
    }
};