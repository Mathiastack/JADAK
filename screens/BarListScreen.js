import React from 'react';
import firebase from 'firebase';
import {ActivityIndicator, FlatList, Image, View} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class BarListScreen extends React.Component {

  barArray = [];

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentWillMount() {
    this.barsFromApiAsync
  }

  get barsFromApiAsync() {
    const that = this;
    firebase.database().ref('Barer').on('value', function (snapshot) {
      const barer = snapshot.val();

      for (let key in barer) {
        if (!barer.hasOwnProperty(key)) {
          continue;
        }
        const specifikBar = barer[key];
        that.barArray.push(specifikBar);
      }
    });
    this.setState({
      isLoading: false,
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch'}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <FlatList
        style={{flex: 1}}
        data={this.barArray}
        renderItem={({item}) =>
          <ListItem
            avatar={
              <Image
                style={{width: 65, height: 65}}
                source={{uri: item.image}}/>
            }
            title={item.Navn}
            titleStyle={{color: 'tomato', fontWeight: 'bold'}}
            subtitle={item.Adresse || 'unkown address'}
            subtitleStyle={{color: 'tomato'}}
            chevron={true}
            chevronColor='tomato'
            onPress={() => this.props.navigation.navigate('BarDetails ', item)}
            containerStyle={{backgroundColor: 'white'}}
          />
        }
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }
}
