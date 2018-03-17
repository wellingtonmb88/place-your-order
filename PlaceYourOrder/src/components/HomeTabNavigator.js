import { Dimensions } from 'react-native';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import ProductListScreen, { ProductListScreenConnected } from './screens/ProductListScreen';
import CartListScreen, { CartListScreenConnected } from './screens/CartListScreen';
import OrdersListScreen, { OrdersListScreenConnected } from './screens/OrdersListScreen';

const deviceScreenWidth = Dimensions.get('window').width;

export const HomeTabNavigator = TabNavigator({
    ProductListScreen: { screen: ProductListScreen },
    CartListScreen: { screen: CartListScreen },
    OrdersListScreen: { screen: OrdersListScreen }
}, {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            bottomNavigationOptions: {
                labelColor: 'white',
                rippleColor: 'white',
                tabs: {
                    ProductListScreen: {
                        barBackgroundColor: 'red'
                    },
                    CartListScreen: {
                        barBackgroundColor: 'blue'
                    },
                    OrdersListScreen: {
                        barBackgroundColor: 'green'
                    }
                },
                style: {
                    width: deviceScreenWidth,
                },
            }
        }
    });

