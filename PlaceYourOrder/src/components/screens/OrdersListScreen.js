
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
import OrderItem from '../OrderItem';
import { Entypo } from '@expo/vector-icons';
import * as OrderActions from '../../actions/OrderActions';

export class OrdersListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "My Orders",
        tabBarIcon: () => <Entypo size={24} name="shopping-bag" color="white" />
    };

    componentDidMount() {
        this.props.getOrders(this.props.token);
    };

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <OrderItem
            order={item}
            _onPress={() => { }}
        />
    );

    
    _orderItemExtractor = () => {
        let orders = this.props.orders;
        let keyByProductId = false;
        if (!orders ||
            orders == undefined ||
            orders == null ||
            typeof orders === 'array'
            || orders.length < 1) {
            return [];
        }
        if(orders['undefined']){
            orders = orders['undefined'].orderItems;
            keyByProductId = true;
        }
        return orders.map(order => {
            // console.log('order',order)
            if (!order) {
                return undefined;
            }
            const date = new Date(order.date);
            return {
                id: !keyByProductId? order.id:order.product.id ,
                date: date.toLocaleDateString(),
                status: order.status,
                total: order.total
            }
        }).filter(item => item !== undefined)
    };

    render() {
        const { loading } = this.props;
        const orderList = this._orderItemExtractor();
        return (
            <View style={styles.container}>
                <If test={loading === true}>
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        size={100} color="blue" />
                </If>
                <If test={loading != true && orderList}>{orderList.length < 1 ?
                    <Text style={styles.productEmpty}>Oops! No orders to show!</Text> :
                    <FlatList
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        data={orderList}
                    />}
                </If>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    token: state.loginReducer.token,
    orders: state.orderReducer.orders,
    error: state.loginReducer.error,
    showError: state.errorReducer.show,
    loading: state.loadingReducer.loading
});

function mapDispatchToProps(dispatch) {
    return {
        getOrders: (token) => dispatch(OrderActions.getAllOrders(token))
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
)(OrdersListScreen);

