import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class OrderItem extends Component {

    static propTypes = {
        order: PropTypes.object.isRequired,
        _onPress: PropTypes.func.isRequired
    };

    _onPress = () => {
        this.props._onPress();
    };

    render() {
        const { order } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.orderName}>{order.date}</Text>
                <Text style={styles.orderName}>Status: {order.status}</Text>
                <Text style={styles.orderPrice}>Total: ${order.total}</Text>
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
    orderName: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    orderPrice: {
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
