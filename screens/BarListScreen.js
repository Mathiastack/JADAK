import {Text, View} from "react-native";
import React from "react";
import Styles from "../assets/Styles";


export default class BarListScreen extends React.Component {

  render() {
    return (
      <View style={Styles.scrollableTab}>
        <Text style={Styles.welcomeTab}>
          LiSte MED barerS
        </Text>
      </View>

    );
  }
}