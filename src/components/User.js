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


class User extends Component {
    constructor() {
        super();


        this.state = {
            user: null
        };
    }
    componentDidMount() {
        // alert();

        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            // console.log(userId);
            // var userId = "q4UQ9k63mKTPzoOmgk5mmxaxU393";
            // console.log(userId);
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/' + userId);
            speedRef.on('value', snap => {

                var userName = snap.val().FName
                this.setState({ user: userName })
                // console.log(user);
            });
        })

    }


    signOut() {
        //  var flag = true;
        var userId = firebase.auth().currentUser.uid;
        // var userId = "q4UQ9k63mKTPzoOmgk5mmxaxU393";
        // console.log(user);
        if (userId) {
            // alert(userId + " is signed in");
            firebase.auth().signOut().then(function () {
                //  this.setState({ user: "" });
                alert("signOut successfully");

                // return flag;

                //  alert("signOut success");
                // return true;
                this.props.history.push('/Login');
            }.bind(this)).catch(function (error) {
                alert("An error happened");
            });
        } else {
            alert("No user is signed in");
            // this.props.history.push('/Signup');
            // this.props.history.push('/Login');


        }


    }



    render() {
        return (
            //     <div>   
            // {this.state.user?       
            <div>
                <h1 style={{color:'rgb(0, 188, 212)'}}>WELCOME TO USER PANEL  </h1>
     
                <h2 className="username" style={{color:'rgb(0, 188, 212)'}}>{this.state.user}</h2>
                {/* <p><Link to="/User/ParkingLocations">View Parking locations</Link></p>
                <p><Link to="/User/MyBookings">View my bookings</Link></p>
                <p><Link to="/User/MyFeedbacks">My feedbacks</Link></p>
                <p><Link to="/User/SendFeedbacks">Send feedbacks</Link></p> */}
            </div>
            //   :
            //   <h1>
            //     loading...
            //   </h1>
            //   }
            // </div>
        );
    }
}
export default User;