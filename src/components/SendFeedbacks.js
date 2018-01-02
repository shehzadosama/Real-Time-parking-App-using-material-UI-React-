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
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
const style = {
    width: 400,
    margin: 20,
    textAlign: 'left',
    paddingLeft: 60,
    paddingTop: 10,
    display: 'inline-block',
}


class SendFeedbacks extends Component {

    constructor() {
        super();


        this.state = {
            error: "",
            title: '',
            desc: '',
            open: false


        };
    }




    btnSubmit() {
        var username;
        var userId;
        // const title = this.refs.title.value;
        // const desc = this.refs.desc.value;
        if (this.state.title === '' || this.state.desc === '') {
            this.setState({ open: true, error: "** ALL FIELDS ARE REQUIRED" });
            // this.refs.title.focus();
            //  alert("all fields are required");
        } else {
            // this.setState({ error: "" });
            var userId = firebase.auth().currentUser.uid;
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/' + userId);
            speedRef.on('value', snap => {
                username = snap.val().FName;
                console.log(username);
                var feedback = {
                    title: this.state.title,
                    desc: this.state.desc,
                    uid: userId,
                    userName: username
                };
                console.log(feedback);
                var ref = firebase.database().ref('feedbacks')
                ref.push(
                    feedback
                );
                alert("Feedback submitted");
            });

        }
    }
    handleForm(labelState, ev) {
        // console.log(ev.target.value)
        this.setState({
            [labelState]: ev.target.value
        })
    }
    handleDialog = () => {
        console.log('open')
        this.setState({ open: !this.state.open });
    };

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleDialog.bind(this)}
            />,
            // <FlatButton
            //   label="Submit"
            //   primary={true}
            //   keyboardFocused={true}
            //   onClick={this.handleClose}
            // />,
        ];
        return (
            // <div className="containerList">

            //     <h1> SEND FEEDBACKS </h1>
            //     <span id="error">{this.state.error}</span >
            //     <input className="location" type="text" ref="title" placeholder="Title" />  <br />
            //     <textarea className="slots" ref="desc" placeholder="Description" /><br /> <br />
            //     <button ref="btnSubmit" onClick={this.btnSubmit.bind(this)}>SUBMIT FEEDBACK</button>

            // </div>

            <div>
                <Dialog
                    title="ERROR"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleDialog}
                >{this.state.error}
                </Dialog>
                <Paper style={style} zDepth={5}>
                    <h1 style={{ color: 'rgb(0, 188, 212)' }}>Submit Feedback</h1>

                    <TextField
                        onChange={
                            this.handleForm.bind(this, 'title')

                        }
                        hintText="Enter Your Title"
                        floatingLabelText="Title"
                        value={this.state.title}
                    /><br />
                    <br />
                    <TextField
                        multiLine={true}
                        rows={3}
                        rowsMax={4}
                        onChange={
                            this.handleForm.bind(this, 'desc')

                        }
                        value={this.state.desc}
                        floatingLabelText="Enter Your Feedback"
                    /><br />
                    <RaisedButton label='SUBMIT FEEDBACK' primary={true} onClick={this.btnSubmit.bind(this)} />
                    <br /><br />
                </Paper>


            </div>
        );
    }
}
export default SendFeedbacks;