
import React, { Component } from 'react';
import {
    StyleSheet, View, Text, ActivityIndicator, TextInput, Alert
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as LoginActions from '../../actions/LoginActions';
import * as ErrorActions from '../../actions/ErrorActions';
import If from '../If';
import CustomButton from '../CustomButton';
import { HomeTabNavigator } from '../HomeTabNavigator';

export class LoginScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Login',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'blue',
        }
    });

    state = {
        email: '',
        password: '',
        errorEmail: '',
        errorPassword: ''
    };

    _handleEmailChange = (text) => {
        this.setState({ email: text, errorEmail: '' });
    };

    _handlePasswordChange = (text) => {
        this.setState({ password: text, errorPassword: '' });
    };

    _showAlert = () => {
        Alert.alert(
            'Invalid Email',
            'The email that you typed doesn\'t match any of these patterns:' +
            '\n\n- example@gmail.com\n- example@yahoo.com.br\n- example@gmail.co.uk',
            [
                { text: 'OK' },
            ],
            { cancelable: true }
        )
    };

    _showLoginError = () => {
        const { error, showError } = this.props;
        if (!error || !showError) {
            return;
        }
        Alert.alert(
            'Invalid Login',
            error,
            [
                { text: 'OK', onPress: () => { this.props.hideError(); } },
            ],
            { cancelable: true }
        )
    };

    _handleLogin = () => {
        const { email, password } = this.state;
        const re = new RegExp("[a-zA-Z0-9._-]+@[a-z]+\\.[a-z]+\\.?[a-z]+");
        const match = email.match(re);
        if (!email) {
            this.setState({ errorEmail: "This field is required" });
        } else if (!password) {
            this.setState({ errorPassword: "This field is required" });
        } else if (!match || (match[0] != email)) {
            this.setState({ errorEmail: "This email address is invalid" });
            this._showAlert();
        } else {
            this.props.authUser(email, password);
        }
    };

    render() {
        const { token, showError, loading } = this.props;
        if (showError) {
            this._showLoginError();
        }
        
        return (
            <View style={styles.container}>
                <If test={token !== undefined}>
                    <HomeTabNavigator />
                </If>
                <If test={token === undefined}>
                        <If test={loading === true}>
                            <ActivityIndicator
                                style={styles.activityIndicator}
                                size={100} color="blue" />
                        </If>
                        <If test={loading != true}  >
                            <TextInput
                                style={styles.textInput}
                                onChangeText={this._handleEmailChange}
                                placeholder='Email'
                                value={this.state.email}
                            />
                            <Text style={{ color: 'red' }}> {this.state.errorEmail}</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={this._handlePasswordChange}
                                placeholder='Password'
                                secureTextEntry={true}
                                value={this.state.password}
                            />
                            <Text style={{ color: 'red' }}> {this.state.errorPassword}</Text>
                            <CustomButton
                                buttonStyles={StyleSheet.flatten([styles.button])}
                                textStyles={styles.buttonTitle}
                                disabled={false}
                                text='Sign In'
                                _onPress={this._handleLogin} />
                        </If>
                </If>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    token: state.loginReducer.token,
    error: state.loginReducer.error,
    showError: state.errorReducer.show,
    loading: state.loadingReducer.loading
});

function mapDispatchToProps(dispatch) {
    return {
        authUser: (email, password) => dispatch(LoginActions.authCustomer(email, password)),
        hideError: () => dispatch(ErrorActions.hideError())
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    textInput: {
        height: 40,
        borderColor: 'gray',
        padding: 10,
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
)(LoginScreen);

