
import React, { Component } from 'react';
import {
    StyleSheet, View, Text, FlatList, ActivityIndicator,Alert
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as ProductActions from '../../actions/ProductActions';
import * as ErrorActions from '../../actions/ErrorActions';
import If from '../If';
import CustomButton from '../CustomButton';
import CartProductItem from '../CartProductItem';
import { Entypo } from '@expo/vector-icons';
import * as CartActions from '../../actions/CartActions';
import * as OrderActions from '../../actions/OrderActions';

export class CartListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "Cart List",
        tabBarIcon: () => <Entypo size={24} name="shopping-cart" color="white" />
    };

    componentDidMount() {
        this.props.getCartList();
    };

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <CartProductItem
            product={item}
            _onPress={() => {
                this.props.removeProductFromCart(item.id);
            }}
        />
    );

    _cartItemExtractor = () => {
        const cart = this.props.cart;
        if (cart === undefined || cart === null) {
            return [];
        }
        return Object.keys(cart).map(key => {
            return {
                id: key,
                storeId: cart[key].storeId,
                name: cart[key].name,
                price: cart[key].price
            }
        }).filter(item => item !== undefined)
    };

    _getTotalPrice = (cartList) => {
        if (cartList == undefined || cartList == null) {
            return 0;
        }
        let total = 0;
        cartList.forEach(p => {
            total += p.price;
        });
        return total;
    };

    _handlePlaceOrder = () => {
        const cartList = this._cartItemExtractor();
        if (cartList == undefined || cartList == null) {
            return;
        }
        const { cleanCart, placeOrder, token } = this.props;
        cleanCart();
        cartList.forEach(p => {
            const order = {
                "deliveryAddress": "Sao paulo",
                "contact": "1999688144",
                "storeId": p.storeId,
                "orderItems": [{
                    "productId": p.id,
                    "product": p,
                    "price": p.price,
                    "quantity": 1,
                    "total": p.price
                }],
                "status": "WAITING"
            }
            placeOrder(token, order);
        })
    };

    _showPlaceOrderError = () => {
        const { error, showError } = this.props;
        if (!error || !showError) {
            return;
        }
        Alert.alert(
            'Error place your Order',
            error,
            [
                { text: 'OK', onPress: () => { this.props.hideError(); } },
            ],
            { cancelable: true }
        )
    };

    _showPlaceOrderSuccess = () => {
        Alert.alert(
            'Great news!',
            'Your order was placed!',
            [
                { text: 'OK', onPress: () => { this.props.hideError(); } },
            ],
            { cancelable: true }
        )
    };

    render() {
        const { loading, showError, successReducer } = this.props;
        const cartList = this._cartItemExtractor();
        if (showError) {
            this._showPlaceOrderError();
        }
        if (successReducer && !loading) {
            this._showPlaceOrderSuccess();
        }
        return (
            <View style={styles.container}>
                <If test={loading === true}>
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        size={100} color="blue" />
                </If>
                <If test={loading != true}>{cartList.length < 1 ?
                    <Text style={styles.productEmpty}>No products to show in your Cart!</Text> :
                    <FlatList
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        data={cartList}
                    />}
                </If>
                <If test={loading != true && cartList.length > 0}>{
                    <CustomButton
                        buttonStyles={StyleSheet.flatten([styles.button])}
                        textStyles={styles.buttonTitle}
                        disabled={false}
                        text={`Place Order | Total: $ ${this._getTotalPrice(cartList)}`}
                        _onPress={this._handlePlaceOrder} />
                }
                </If>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    token: state.loginReducer.token,
    products: state.productReducer.products,
    cart: state.cartReducer.cart,
    orderError: state.orderReducer.error,
    successReducer: state.orderReducer.success,
    error: state.loginReducer.error,
    showError: state.errorReducer.show,
    loading: state.loadingReducer.loading
});

function mapDispatchToProps(dispatch) {
    return {
        getCartList: () => dispatch(CartActions.getAllCart()),
        removeProductFromCart: (id) => dispatch(CartActions.deleteProductFromCart(id)),
        cleanCart: (id) => dispatch(CartActions.deleteAllCart()),
        placeOrder: (token, order) => dispatch(OrderActions.placeOrder(token, order)),
        hideError: () => dispatch(ErrorActions.hideError())
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderRadius: 3,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    buttonTitle: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    productEmpty: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        marginTop: 20,
        marginBottom: 20,
    },
    activityIndicator: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartListScreen);

