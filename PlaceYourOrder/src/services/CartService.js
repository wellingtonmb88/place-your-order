import { AsyncStorage } from 'react-native';

const CART_KEY = "CART_KEY";

export function fetchAllCart() {
    return AsyncStorage.getItem(CART_KEY);
};

export function saveCart(cart) {
    AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export function clearAllCart() {
    return AsyncStorage.clear();
};