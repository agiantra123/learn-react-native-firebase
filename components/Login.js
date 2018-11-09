import React, { Component } from 'react'
import { View, TextInput, Text } from 'react-native'

import firebase from 'react-native-firebase'
import Button from 'react-native-button'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typedEmail: '',
            typedPassword: '',
            errorText: '',
            errorCode: ''
        };
    }

    // START FOR EMAIL AND PASSWORD SIGNING IN
    onRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then((loggedInUser) => {
                console.log(`Register with user : ${JSON.stringify(loggedInUser.toJSON())}`);
            }).catch((error) => {
                console.log(`Register fail with error: ${error}`);
                this.setState({
                    errorText: error.message, // NOTE: (1) Don't use only error (2) You can use error.code
                    errorCode: error.code
                })
            });
    }
    onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then((loggedInUser) => {
                console.log(`Login with user : ${JSON.stringify(loggedInUser.toJSON())}`);
            }).catch((error) => {
                console.log(`Login fail with error: ${error}`);
                this.setState({
                    errorText: error.message, // NOTE: (1) Don't use only error (2) You can use error.code
                    errorCode: error.code
                })
            });
    }
    // END FOR EMAIL AND PASSWORD SIGNING IN

    // START FOR SIGNING IN ANONYMOUSLY
    onAnonymousLogin = () => {
        firebase.auth().signInAnonymously()
            .then(() => {
                console.log(`Login successfully`);
            })
            .catch((error) => {
                console.log(`Login failed. Error = ${error}`);
                this.setState({
                    errorText: error.message, // NOTE: (1) Don't use only error (2) You can use error.code
                    errorCode: error.code
                })
            });
    }
    // END FOR SIGNING IN ANONYMOUSLY

    render() {
        return (
            <View>

                {/* START FOR EMAIL AND PASSWORD SIGNING IN */}
                <Text>Please enter your email & password!</Text>
                <TextInput keyboardType='email-address' placeholder='Enter your email' autoCapitalize='none'
                    onChangeText={(text) => {this.setState({ typedEmail: text });}}/>
                <TextInput keyboardType='default' placeholder='Enter your password' secureTextEntry={true}
                    onChangeText={(text) => {this.setState({ typedPassword: text });}}/>
                <View style={{ flexDirection: 'row' }}>
                    <Button 
                        containerStyle={{ padding: 10, borderRadius: 4, margin: 10, backgroundColor: 'green' }}
                        style={{ fontSize: 17, color: 'white' }}
                        onPress={this.onRegister}
                        >Register</Button>
                    <Button 
                        containerStyle={{ padding: 10, margin: 10, borderRadius: 4, backgroundColor: 'blue' }}
                        style={{ fontSize: 17, color: 'white' }}
                        onPress={this.onLogin}
                        >Login</Button>
                </View>
                {/* END FOR EMAIL AND PASSWORD SIGNING IN */}

                {/* START FOR SIGNING IN ANONYMOUSLY */}
                <Button 
                        containerStyle={{ padding: 10, borderRadius: 4, margin: 10, backgroundColor: 'grey' }}
                        style={{ fontSize: 17, color: 'white' }}
                        onPress={this.onAnonymousLogin}
                        >Login Anonymously</Button>
                {/* END FOR SIGNING IN ANONYMOUSLY */}

                {/* DISPLAYING ERROR */}
                <Text>{ this.state.errorCode + ': ' + this.state.errorText }</Text>
            </View>
        )
    }
}
