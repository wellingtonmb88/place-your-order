import React from 'react';
import {
  StyleSheet, View, StatusBar,
  ToolbarAndroid, Platform, Text
} from 'react-native';
import { Constants } from 'expo';
import * as LoginReducers from './src/reducers/LoginReducers';
import * as LoadingReducers from './src/reducers/LoadingReducers';
import * as ErrorReducers from './src/reducers/ErrorReducers';
import * as ProductReducers from './src/reducers/ProductReducers';
import { HomeTabNavigator } from './src/components/HomeTabNavigator';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Font } from 'expo';
import LoginScreen from './src/components/screens/LoginScreen';
import ProductListScreen from './src/components/screens/ProductListScreen';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loginReducer = LoginReducers.reducer;
const loadingReducer = LoadingReducers.reducer;
const errorReducer = ErrorReducers.reducer;
const productReducer = ProductReducers.reducer;

const configureStore = () => {
  const store = createStore(
    combineReducers({ loginReducer, loadingReducer, errorReducer, productReducer }),
    composeEnhancers(
      applyMiddleware(logger, thunk)
    )
  );
  return store;
};

const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
};

const MainNavigator = StackNavigator({
  Home: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'PlaceYourOrder',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'blue',
      }
    }
  },
  ProductListScreen: {
    screen: HomeTabNavigator,
    navigationOptions: {
      title: 'PlaceYourOrder',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'blue',
      }
    }
  },
  ProductListScreen2: {
    screen: ProductListScreen
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <View style={styles.container}>
          <CustomStatusBar backgroundColor={'blue'} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});

