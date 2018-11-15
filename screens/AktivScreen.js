import {Text, View} from "react-native";
import React from "react";
import Styles from "../assets/Styles";
import firebase from 'firebase';
import {Button} from "react-native-elements";


export default class AktivScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      loggedinUserId: 123,
      checkintime: "",
      color: "",
      number: 123,
      amount: 0,
    }
  }

  componentWillMount() {
    this.getActiveTicketAsync();

  }

  componentDidMount() {
    const {currUser} = firebase.auth()
    this.setState({currentUser: currUser})
    console.log()
  }


  /*METODEN SKAL RETTES NÅR OPRET BRUGER ER FÆRDIG MED DE RIGTIGE UID'S*/
  getActiveTicketAsync() {
    let ticketArray = [];
    let that = this;
    firebase.database().ref('Brugere/').once('value', function (snapshot) {
      let user = snapshot.val();

      for (let i = 0; i < 3; i++) {
        ticketArray.push(
          <Text>
            Checkin time : {user.Billetter.Aktive.TicketID.checkind + "\n"}
            Color of ticket : {user.Billetter.Aktive.TicketID.farve + "\n"}
            Your number {user.Billetter.Aktive.TicketID.nummer + "\n"}
            The amount : {user.Billetter.Aktive.TicketID.antal + "\n"}
            {that.renderCheckOutButton()}
          </Text>
        )
      }
      that.setState({
        array: ticketArray
      });
    });
  }

  checkoutTicket() {


  }


  renderCheckOutButton() {
    return (
      <Button title="logout" onPress={() => this.checkoutTicket()}/>
    )
  }

  static navigationOptions = {
    title: 'app.json',
  };


  render() {
    return (

      <View style={Styles.containerTab}>
        <Text style={Styles.welcomeTab}>
          AKTIV
        </Text>
        {this.state.array}

      </View>

    );
  }
}