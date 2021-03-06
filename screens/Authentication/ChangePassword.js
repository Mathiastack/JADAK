import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import firebase from 'firebase';
import Styles from '../../assets/Styles';
import {Input, ListItem,Icon,Button} from 'react-native-elements';
import {
	Text, TextInput, StyleSheet, View, ActivityIndicator, ScrollView,
	TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { LinearGradient} from "expo";



export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }
  // Reauthenticates the current user and returns a promise.
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateAndRetrieveDataWithCredential(credential);
  }

  // Changes user's password
  onChangePasswordPress = () => {
    var user = firebase.auth().currentUser;
    user.updatePassword(this.state.newPassword).then(() => {
      alert("Password was changed");
    }).catch((error) => { console.log(error.message); });
    this.props.navigation.goBack()
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <LinearGradient  style={{
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: 0,
						top: 0,
					}} colors={['#F2F2F2', '#F2F2F2'] }>

            <Input
              leftIcon={
                <Icon
                  name='lock'
                  color='grey'
                  size={25}
                />
							}

              containerStyle={{marginTop: 230, alignSelf: 'center', justifyContent: 'space-between'}}
              onChangeText={currentPassword => this.setState({currentPassword})}
              value={this.state.currentPassword}
              inputStyle={{marginLeft: 10, color: 'grey'}}
              keyboardAppearance="light"
              placeholder="Nuværende Password"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              secureTextEntry={true}
              placeholderTextColor="grey"

            />
            <Input
              leftIcon={
                <Icon
                  name='lock'
                  color='grey'
                  size={25}
                />
							}

              containerStyle={{marginBottom: 190, alignSelf: 'center', justifyContent: 'space-between'}}
              onChangeText={newPassword => this.setState({newPassword})}
              value={this.state.newPassword}
              inputStyle={{marginLeft: 10, color: 'grey'}}
              keyboardAppearance="light"
              placeholder="Nyt Password"
              secureTextEntry={true}
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholderTextColor="grey"

            />



          <View>
              <Button title="Change Password" clear buttonStyle={Styles.ButtonChangePassword} titleStyle={{fontWeight: 'bold', fontSize: 23, color: 'grey'}} onPress={this.onChangePasswordPress} />
            </View>

          </LinearGradient>
      </TouchableWithoutFeedback>

    );
  }

}


