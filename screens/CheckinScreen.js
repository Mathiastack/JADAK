import {Text, View} from "react-native";
import React from "react";
import Styles from "../assets/Styles";




export default class CheckinScreen extends React.Component {
    static navigationOptions = {
        title: 'app.json',
    };



    render() {
        return (

            <View style={Styles.scrollableTab}>
                <Text style={Styles.welcomeTab}>
                    OFFERS
                </Text>
            </View>
        );
    }
}
