
import React, { Component } from 'react';
import {
    StyleSheet, View, Text, FlatList, ActivityIndicator
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as ProductActions from '../../actions/ProductActions';
import * as ErrorActions from '../../actions/ErrorActions';
import If from '../If';
import CustomButton from '../CustomButton';
import CartProductItem from '../CartProductItem';
import { Entypo } from '@expo/vector-icons';
import * as CartService from '../../services/CartService';
import * as CartActions from '../../actions/CartActions';

export class CartListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "Cart List",
        tabBarIcon: () => <Entypo size={24} name="blackboard" color="white" />
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
                name: cart[key].name,
                price: cart[key].price
            }
        }).filter(item => item !== undefined)
    };


    render() {
        const { loading } = this.props;
        const cartList = this._cartItemExtractor()
        return (
            <View style={styles.container}>
                <If test={loading === true}>
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        size={100} color="blue" />
                </If>
                <If test={loading != true}>{cartList.length < 1 ?
                    <Text style={styles.productEmpty}>Oops! No products to show in your Cart!</Text> :
                    <FlatList
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        data={cartList}
                    />}
                </If>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    token: state.loginReducer.token,
    products: state.productReducer.products,
    cart: state.cartReducer.cart,
    error: state.loginReducer.error,
    showError: state.errorReducer.show,
    loading: state.loadingReducer.loading
});

function mapDispatchToProps(dispatch) {
    return {
        getCartList: () => dispatch(CartActions.getAllCart()),
        removeProductFromCart: (id) => dispatch(CartActions.deleteProductFromCart(id))
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
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        height: 50,
        borderRadius: 3,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray'
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

