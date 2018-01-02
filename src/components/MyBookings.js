import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import * as firebase from 'firebase';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Login from "./Login"
import Signup from "./Signup"
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class MyBookings extends Component {

    constructor() {
        super();


        this.state = {
            bookings: []
        };
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            var obj = [];
            var i = 0;
            firebase.database().ref('/bookings/').orderByChild("uid").equalTo(userId).on("value", function (snapshot) {
                obj = snapshot.val();
                this.setState({ bookings: obj });
                console.log(this.state.bookings);
            }.bind(this)
            );
        })
    }




    deleteBooking(key) {
        console.log(key);
        firebase.database().ref('bookings/' + key).remove();
    }



    render() {

        var bookings = "";
        var btn = "";
        var key;

        if (this.state.bookings !== null) {
            bookings = Object.keys(this.state.bookings).map((key, index) => {

                // btn = <button onClick={this.deleteBooking.bind(this, key)}>DELETE BOOKING</button>;
                btn = <RaisedButton label='DELETE' onClick={this.deleteBooking.bind(this, key)} secondary={true} />
                // let desc = `Location Name:  ${this.state.bookings[key].location}` <br /> `Slot:  ${this.state.bookings[key].slotNo}`
                //     <br />    `Date:  ${this.state.bookings[key].date}`
                //     <br /> `Time:  ${this.state.bookings[key].startTime}`
                //     <br /> Hours: ${this.state.bookings[key].hours}
                return (
                    // <li className="view">
                    //     <p>Location Name:  {this.state.bookings[key].location}</p>
                    //     <p>  Slot:  {this.state.bookings[key].slotNo}</p>
                    //     <p>   Date:  {this.state.bookings[key].date}</p>
                    //     <p> Time:  {this.state.bookings[key].startTime}</p>
                    //     <p>Hours: {this.state.bookings[key].hours}</p>
                    //     <p>  {btn}</p>
                    // </li>

                    <Card key={index}>
                        <CardHeader
                            title={`Location Name:: ${this.state.bookings[key].location}`}
                            subtitle={`Slot: ${this.state.bookings[key].slotNo}`}
                            actAsExpander={true}
                            showExpandableButton={true}



                        />
                        <CardText expandable={true}>

                            <br />    Date:  {this.state.bookings[key].date}
                            <br />Time:  {this.state.bookings[key].startTime}
                            <br /> Hours: {this.state.bookings[key].hours}

                        </CardText>
                        <CardActions>
                            {btn}
                        </CardActions>

                    </Card>
                )
            })
        }
        else {
            return (
                <Card>
                    <CardHeader
                        title="NO BOOKINGS AVAILABLE"

                    // actAsExpander={true}
                    // showExpandableButton={true}
                    />
                    <CardActions>

                    </CardActions>

                </Card>
            )
        }



        return (
            <div >

                <h1 style={{ color: 'rgb(0, 188, 212)' }}>My Bookings </h1>

                {bookings}

            </div>
        );
    }
}
export default MyBookings;