import React from 'react';
import {Text, View} from 'react-native';

export default class BarDetailsScreen extends React.Component {

  static navigationOptions = {
    title: "BarDetails"
  };


  render() {
    const {navigation} = this.props;
    const title = navigation.getParam('title', 'No title');
    const artist = navigation.getParam('artist', 'No artist defined');

    return (
      <View>
        <Text>Titlen på albummet er: {title}</Text>
        <Text>Kunstneren på albummet er: {artist}</Text>

      </View>
    );
  }
}