import React from 'react';
import {ActivityIndicator, ImageBackground, Text, TextInput, View} from 'react-native';
import firebase from 'firebase';
import Styles from '../assets/Styles';
import globals from "../assets/Globals";
import Avatar from "react-native-elements/src/avatar/Avatar";
import {Button, Icon, Input} from "react-native-elements";

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    }
  }

  static navigationOptions = {
    header: null,
  };
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size={'small'}/>

    }
  }

  async signIn() {
    const {email, password} = this.state;
    this.setState({
      error: '',
      loading: true,
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onSignInSuccess.bind(this))
      .catch(this.onSignInFailed.bind(this));
  }

  onSignInSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
    globals.uid = firebase.auth().currentUser.uid;
    alert("User signed in successfully");
  }

  onSignInFailed(error) {
    this.setState({
      loading: false,
      error: error.message,
    })
  }

  render() {
    return (

      <ImageBackground
        style={Styles.backgroundImage}
        resizeMode='cover'
        source={require('../assets/images/baggrund.jpg')}>



            <Input
              leftIcon={
                <Icon
                  name='verified-user'
                  color='rgba(171, 189, 219, 1)'
                  size={25}
                />
              }
              style={Styles.loginInput}
              containerStyle={{marginVertical: 250}}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            inputStyle={{marginLeft: 10, color: 'white'}}
            keyboardAppearance="light"
            placeholder="E-mail"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholderTextColor="white"

          />
        <Input
          leftIcon={
            <Icon
              name='verified-user'
              color='rgba(171, 189, 219, 1)'
              size={25}
            />
          }
          style={Styles.loginInput}
          containerStyle={{marginVertical: -225}}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
          inputStyle={{marginLeft: 10, color: 'white'}}
          keyboardAppearance="light"
          placeholder="Password"
          secureTextEntry={true}
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          placeholderTextColor="white"

        />


          <TextInput
            style={Styles.loginInput}
            label={'Password'}
            placeholder={'password'}
            value={this.state.password}
            secureTextEntry={true}
            pointerEvents="none"
          />
          <Button title={'Sign in'} clear style={Styles.buttonStyleLogin} onPress={this.signIn.bind(this)}/>

          <Button title="Create Account" clear style={Styles.buttonStyleText1}
                  onPress={() => this.props.navigation.navigate('Register')}/>
        <Button title="Forgot Password" clear style={Styles.buttonStyleText2}
                onPress={() => this.props.navigation.navigate('ForgotPassword')}/>

          <Text style={Styles.errorStyle}>
            {this.state.error}
          </Text>
          {this.renderButton()}

      </ImageBackground>


    );
  }




}
