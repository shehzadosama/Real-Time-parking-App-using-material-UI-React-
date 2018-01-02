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
class UsersList extends Component {

    constructor() {
        super();


        this.state = {
            userType: null,
            name: null,
            users: []
        };
    }

    componentDidMount() {
        var obj = [];
        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            //   // console.log(userId);
            // var userId = "TQWfTYxcPKVtaBWQcT31LmcBq0g2";
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/' + userId);
            speedRef.on('value', snap => {

                var type = snap.val().type
                // var userObj = snap.val();
                // console.log(userObj)
                this.setState({ userType: type });
                //  this.setState({name: username});
                // console.log(this.state.userType);
                // this.refs.name.value= this.user.name; 
            });

            var i = 0;
            firebase.database().ref('/users/').orderByChild("type").equalTo('user').on("value", function (snapshot) {
                obj = snapshot.val();
                //  var exists = false;
                // snapshot.forEach(function (childSnapshot) {
                //   // if ('com' === childSnapshot.val().type) {
                //     // alert(childSnapshot.val().desc);
                //     // alert(childSnapshot.val().salary);
                //     //  alert(childSnapshot.val().title);
                //     obj[i] = childSnapshot.val();     
                //   // }
                //   i++;

                // })

                this.setState({ users: obj });
                //  this.setState({ job: obj} );
                // console.log(this.state.companies)
            }.bind(this)
            );
        });
    }






    deleteUser(key) {
        // var user = firebase.auth().currentUser;
        // console.log(user)
        // var user;
        // var ref
        // console.log(key);
        // firebase.database().ref('users/' + key).on("value", function (snapshot) {
        //     user = snapshot.val();
        //     //        
        // })
        // console.log(user)
        // var user1 = firebase.auth().currentUser;
        // console.log(user1)
          firebase.database().ref('users/' + key).remove();
          alert("user deleted")
        //  user.delete().then(function() {
        //             alert("user deleted")
        //   // User deleted.
        // }, function(error) {
        //   // An error happened.
        // });
    }


    render() {

        var user = "";
        var btn = "";
        var key;

        if (this.state.students !== null) {
            user = Object.keys(this.state.users).map((key, index) => {
                // if (this.state.userType === 'admin') {
                // btn = <button onClick={this.deleteUser.bind(this, key)}>DELETE</button>;
                // }
                return (
                    // <li className="view">

                    //     {/* <p>Company Name: {this.state.job[key].Name}</p> */}
                    //     <p>First NAME:  {this.state.users[key].FName}</p>
                    //     <p>Last NAME:  {this.state.users[key].LName}</p>

                    //     <p>  Email:  {this.state.users[key].email}</p>


                    //     <button className="apply" onClick={this.deleteUser.bind(this, key)}>Remove</button>

                    // </li>

                    <Card key={index}>
                        <CardHeader
                            title={`First NAME: ${this.state.users[key].FName}`}
                            // subtitle={`Slot: ${this.state.bookings[key].slotNo}`}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>

                            <br />   Last NAME:  {this.state.users[key].LName}
                            <br />Email:  {this.state.users[key].email}
                            {/* <br /> Hours: {this.state.bookings[key].hours} */}

                        </CardText>
                        <CardActions>
                            <RaisedButton label='DELETE' onClick={this.deleteUser.bind(this, key)} secondary={true} />

                        </CardActions>

                    </Card>
                )
            })
        }
        else {
            return (


                <Card>
                    <CardHeader
                        title="NO USERS AVAILABLE"

                    // actAsExpander={true}
                    // showExpandableButton={true}
                    />
                    <CardActions>

                    </CardActions>

                </Card>

            )
        }



        return (
            // <div className="containerList">

            //     <h1> user list
            //  </h1>
            //     <ul className="theList">
            //         {user}
            //     </ul>

            // </div>
            <div >

                <h1 style={{ color: 'rgb(0, 188, 212)' }}>ALL USERS</h1>

                {user}

            </div>
        );
    }
}
export default UsersList;