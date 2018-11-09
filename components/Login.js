import React, { Component } from 'react'
import { TextInput, View } from 'react-native'

import firebase from 'react-native-firebase'
import Button from 'react-native-button'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typedEmail: '',
            typedPassword: ''
        };
    }
    onRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then((loggedInUser) => {
                console.log(`Register with user : ${JSON.stringify(loggedInUser.toJSON())}`);
            }).catch((error) => {
                console.log(`Register fail with error: ${error}`);
            });
    }
    onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then((loggedInUser) => {
                console.log(`Login with user : ${JSON.stringify(loggedInUser.toJSON())}`);
            }).catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });
    }
    render() {
        return (
            <View>
                <Text>Please enter your email & password!</Text>
                <TextInput keyboardType='email-address' placeholder='Enter your email' autoCapitalize='none'
                    onChangeText={(text) => {this.setState({ typedEmail: text });}}/>
                <TextInput keyboardType='default' placeholder='Enter your password' secureTextEntry={true}
                    onChangeText={(text) => {this.setState({ typedPassword: text });}}/>
                <View style={{ flexDirection: 'row' }}>
                    <Button containerStyle={{
                        padding: 10,
                        borderRadius: 4,
                        margin: 10,
                        backgroundColor: 'green'
                    }}
                        style={{ fontSize: 17, color: 'white' }}
                        onPress={this.onRegister}
                    >Register</Button>
                    <Button containerStyle={{
                        padding: 10,
                        margin: 10,
                        borderRadius: 4,
                        backgroundColor: 'blue'
                    }}
                        style={{ fontSize: 17, color: 'white' }}
                        onPress={this.onLogin}
                    >Login</Button>
                </View>
            </View>
        )
    }
}
