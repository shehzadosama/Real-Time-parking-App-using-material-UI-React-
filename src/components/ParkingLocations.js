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
import LocationDetail from "./LocationDetail"
import UsersList from "./UsersList"
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ParkingLocations extends Component {

    constructor() {
        super();


        this.state = {
            userType: null,
            parkinglocations: []
        };
    }

    componentDidMount() {
        var obj = [];
        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/' + userId);
            speedRef.on('value', snap => {
                var type = snap.val().type
                var userDetails = snap.val();
                this.setState({ userType: type });
                this.setState({ user: userDetails });
                console.log(this.state.user);

            });
            firebase.database().ref('/parkinglocations/').on('value', function (snapshot) {
                obj = snapshot.val();
                this.setState({ parkinglocations: obj });
            }.bind(this)
            );
        });
    }

    deleteParking(key) {
        console.log(key);
        firebase.database().ref('parkinglocations/' + key).remove();
    }



    render() {

        var parking = "";
        var btn = "";
        var key;

        if (this.state.parkinglocations !== null) {
            parking = Object.keys(this.state.parkinglocations).map((key,index) => {
                if (this.state.userType === 'admin') {
                    // btn = <button onClick={this.deleteParking.bind(this, key)}>DELETE</button>;
                    btn = <RaisedButton label='DELETE' secondary={true} onClick={this.deleteParking.bind(this, key)} />

                } else if (this.state.userType === 'user') {
                    btn = <Link
                        to={{
                            pathname: '/User/LocationDetail',
                            state: { keys: key }
                        }}>     <RaisedButton label='VIEW' primary={true} />
                    </Link>;
                }
                return (
                    // <li>
                    //     <p>LOCATION:  {this.state.parkinglocations[key].location}</p>
                    //     <p>  SLOTS:  {this.state.parkinglocations[key].noOfSlots}</p>

                    //     <p>  {btn}</p>
                    // </li>

                    <Card  key={index}>
                        <CardHeader
                            title={`LOCATION NAME: ${this.state.parkinglocations[key].location}`}
                            subtitle={`NO OF SLOTS: ${this.state.parkinglocations[key].noOfSlots}`}
                        // actAsExpander={true}
                        // showExpandableButton={true}
                        />
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
                        title="NO PARKING LOCATIONS AVAILABLE"

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

                {/* <Card>
                    <CardHeader
                        title="LOCATION NAME: tariq road"
                        subtitle="No of slots: 5"
                    // actAsExpander={true}
                    // showExpandableButton={true}
                    />
                    <CardActions>
                        <RaisedButton label='VIEW' primary={true} />

                    </CardActions>

                </Card> */}
                <h1 style={{ color: 'rgb(0, 188, 212)' }}> Parking Locations </h1>

                {parking}

            </div>
        );
    }
}
export default ParkingLocations;