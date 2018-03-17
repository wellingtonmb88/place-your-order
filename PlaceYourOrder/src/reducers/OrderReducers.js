import {
    LOAD_ALL_ORDER,
    PLACE_ORDER
} from '../actions/OrderActions';

export function reducer(state = {}, action) {
    const { orders, order, error, success } = action

    switch (action.type) {

        case LOAD_ALL_ORDER:
            return {
                ...state,
                orders
            };

        case PLACE_ORDER:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    [order.id]: order,
                }, 
                error,
                success
            };

        default:
            return state
    }
};