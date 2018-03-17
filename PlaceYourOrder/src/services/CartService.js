import { AsyncStorage } from 'react-native';

const CART_KEY = "CART_KEY";

export function fetchAllCart() {
    return AsyncStorage.getItem(CART_KEY);
};

export function saveProductsToCart(products) {
    AsyncStorage.setItem(CART_KEY, JSON.stringify(products));
};

export function clearAllCart() {
    return AsyncStorage.clear();
};