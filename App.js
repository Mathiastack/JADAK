import React from 'react';
import {ActivityIndicator, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'firebase';
import LoginForm from "./screens/LoginForm";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      isLoadingComplete: false,
      skipLoadingScreen: false,
    }
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCxecGEtoqgPPDWftVQpXVKIZLdsQNDPAs",
      authDomain: "garderobeapp-49283.firebaseapp.com",
      databaseURL: "https://garderobeapp-49283.firebaseio.com",
      projectId: "garderobeapp-49283",
      storageBucket: "garderobeapp-49283.appspot.com",
      messagingSenderId: "271748622389"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };
  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };
  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      switch (this.state.loggedIn) {
        case true:
          return (
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
              <AppNavigator/>
            </View>
          );
        case false:
          return (
            <View style={styles.container}>
              <LoginForm/>
            </View>
          );
        default:
          return <ActivityIndicator size="large"/>;
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
