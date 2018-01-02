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

class MyFeedbacks extends Component {

    constructor() {
        super();


        this.state = {

            feedbacks: []
        };
    }

    componentDidMount() {
        var obj = [];

        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;

            var i = 0;
            firebase.database().ref('/feedbacks/').orderByChild("uid").equalTo(userId).on("value", function (snapshot) {
                obj = snapshot.val();
                console.log(obj);
                this.setState({ feedbacks: obj });
            }.bind(this)
            );
        });
    }







    deleteFeedback(key) {
        console.log(key);
        firebase.database().ref('feedbacks/' + key).remove();
    }



    render() {

        var feedbacks = "";
        var btn = "";
        var key;

        if (this.state.feedbacks !== null) {
            feedbacks = Object.keys(this.state.feedbacks).map((key, index) => {
                // btn = <button onClick={this.deleteFeedback.bind(this, key)}>DELETE FEEDBACK</button>;
                btn = <RaisedButton label='DELETE' onClick={this.deleteFeedback.bind(this, key)} secondary={true} />
                return (
                    <Card key={index}>
                        <CardHeader
                            title={`TITLE: ${this.state.feedbacks[key].title}`}
                            subtitle={`DESCRIPTION: ${this.state.feedbacks[key].desc}`}
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
                        title="NO FEEDBACKS AVAILABLE"

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

                <h1 style={{ color: 'rgb(0, 188, 212)' }}>My Feedbacks </h1>

                {feedbacks}

            </div>
        );
    }
}
export default MyFeedbacks;