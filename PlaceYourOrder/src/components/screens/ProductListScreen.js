
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
import ProductItem from '../ProductItem';
import { Entypo } from '@expo/vector-icons';

export class ProductListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "Product List",
        tabBarIcon: () => <Entypo size={24} name="blackboard" color="white" />
    };

    componentDidMount() {
        this.props.getProductList();
    };

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <ProductItem
            product={item}
            _onPress={() => { }}
        />
    );

    _productItemExtractor = () => {
        const products = this.props.products;
        setTimeout(() => {
            this.setState({ stopLoading: true });
        }, 1000);

        if (products === undefined || products === null) {
            return [];
        }
        return Object.keys(products).map(key => {
            return {
                id: key,
                name: products[key].name,
                price: products[key].price
            }
        }).filter(item => item !== undefined)
    };

    render() {
        const { loading } = this.props;
        const productList = this._productItemExtractor()
        return (
            <View style={styles.container}>
                <If test={loading === true}>
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        size={100} color="blue" />
                </If>
                <If test={loading != true}>{productList.length < 1 ?
                    <Text style={styles.productEmpty}>Oops! No products to show!</Text> :
                    <FlatList
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        data={productList}
                    />}
                </If>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    token: state.loginReducer.token,
    products: state.productReducer.products,
    error: state.loginReducer.error,
    showError: state.errorReducer.show,
    loading: state.loadingReducer.loading
});

function mapDispatchToProps(dispatch) {
    return {
        getProductList: () => dispatch(ProductActions.getProductList())
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
)(ProductListScreen);

