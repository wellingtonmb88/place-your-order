import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class CartProductItem extends Component {

    static propTypes = {
        product: PropTypes.object.isRequired,
        _onPress: PropTypes.func.isRequired
    };

    _onPress = () => {
        this.props._onPress();
    };

    render() {
        const { product } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
                <TouchableOpacity onPress={this._onPress}>
                    <Text style={styles.cart}>REMOVE FROM CART</Text>
                </TouchableOpacity>
            </View>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 5,
        marginRight: 8,
        marginLeft: 8,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: 'white',
        elevation: 2
    },
    productName: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        textAlign: 'left',
        color: 'gray'
    },
    cart: {
        fontSize: 20,
        textAlign: 'left',
        color: 'blue'
    }
});
