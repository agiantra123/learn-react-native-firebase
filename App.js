/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {View, Text} from 'react-native'

import firebase from 'react-native-firebase'

import Login from './components/Login'

export default class App extends Component {
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }
  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }
  render() {
    if (!this.state.user) {
      return (
        <View>
          <Login />
        </View>
      );
    }
    return (
      <View>
        <Text>Welcome to my awesome app!</Text>
      </View>
    );
  }
}
