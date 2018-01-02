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
class LocationDetail extends Component {

    constructor() {
        super();


        this.state = {

            locationName: null,
            noOfSlots: []

        };
    }

    componentDidMount() {
        var key = this.props.location.state.keys;
        var obj;
        var obj1;
        firebase.auth().onAuthStateChanged(() => {
            firebase.database().ref('/parkinglocations/' + key).on('value', function (snapshot) {
                this.setState({ locationName: snapshot.val().location });
                this.setState({ noOfSlots: snapshot.val().noOfSlots });
            }.bind(this)
            );
        })
    }


    render() {

        var parking = "";
        var btn = "";
        var key;

        var slots = [];

        for (var i = 0; i < this.state.noOfSlots; i++) {
            slots.push(i);
        }
        parking = slots.map((i) => {
            var button = <Link
                to={{
                    pathname: '/User/BookSlot',
                    state: {
                        slotKeys: i,
                        locationName: this.state.locationName
                    }
                }}>   <RaisedButton label={`Slot no: ${i}`} primary={true} style={{marginTop:10}}/></Link>;

            return (

         <span> {button} </span>

            )
        })


        return (
            <div >
                <h1 style={{ color: 'rgb(0, 188, 212)' }}> Location details </h1>
                <p style={{ color: 'rgb(0, 188, 212)' }}>Location Name: {this.state.locationName}</p>
                <p style={{ color: 'rgb(0, 188, 212)' }}>No of slots:  {this.state.noOfSlots}</p>

            {parking}

            </div>
        );
    }
}
export default LocationDetail;