import React from 'react';
import {ActivityIndicator, Button, Text, TextInput, View} from 'react-native';
import firebase from 'firebase';
import Styles from '../assets/Styles';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    }
  }

  onResetPasswordPress = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email)
      .then(() => {
        alert("Password reset email has been sent.");
      }, (error) => {
        alert(error.message);
      })

  };


  render() {
    return (
      <View style={Styles.containerStyle}>
        <Text> FORGOT PASSWORD YOU IDIOT? </Text>

        <TextInput style={Styles.textField}
                   value={this.state.email}
                   onChangeText={(text) => {
                     this.setState({email: text})
                   }}
                   placeholder="Email"
                   keyboardType="email-address"
                   autoCapitalize="none"
                   autoCorrect={false}
        />

        <Button title="Reset Password" onPress={this.onResetPasswordPress}/>
        <Button title="Back to Login..." onPress={() => this.props.navigation.goBack()}/>
      </View>
    )
  }
}