import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import * as firebase from 'firebase';
import Login from "./Login"
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import CircularProgress from 'material-ui/CircularProgress';
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

class Signup extends Component {
    constructor() {
        super();
        this.state = {

            error: null,
            info: null,
            email: '',
            password: '',
            fName: '',
            lName: '',
            open: false
        };
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

    signUp() {
        // const FName = this.refs.txtFName.value;
        // const LName = this.refs.txtLName.value;
        // const email = this.refs.txtEmail.value;
        // const password = this.refs.txtPassword.value;


        let userId = "";
        let userType;
        if (this.state.fName === '' || this.state.lName === '' || this.state.email === '' || this.state.password === '') {

            // alert("all fields are required");
            this.setState({ open: true, error: "** ALL FIELDS ARE REQUIRED" });
            // this.refs.txtEmail.focus();
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((res) => {

                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('/users/' + userId).set({
                    FName: this.state.fName,
                    LName: this.state.lName,
                    email: this.state.email,
                    pass: this.state.password,
                    type: 'user'


                });
                // alert("account created successfully");
                // this.setState({ error: "" });
                // this.setState({ info: "ACCOUNT CREATED" });
                // this.refs.txtFName.focus();
                // this.refs.txtFName.value = "";
                // this.refs.txtLName.value = "";
                // this.refs.txtEmail.value = "";
                // this.refs.txtPassword.value = "";
            }
            ).catch(function (error) {
                // Handle Errors here.
                // var errorCode = error.code;
                this.setState({ open: true, error: error.message });
                // console.log(errorMessage);
            }.bind(this));
        }
    }



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

            <div>
                <Dialog
                    title="ERROR"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleDialog}
                >{this.state.error}
                </Dialog>
                {this.state.loader ? <CircularProgress size={80} thickness={5} /> :
                    <div>

                        <Paper style={style} zDepth={5}>
                            <h1  style={{ color: 'rgb(0, 188, 212)' }}>SIGN UP FORM</h1>

                            <TextField
                                onChange={
                                    this.handleForm.bind(this, 'fName')

                                }
                                hintText="Enter Your First Name"
                                floatingLabelText="First Name"
                            /><br />
                            <br />
                            <TextField
                                onChange={
                                    this.handleForm.bind(this, 'lName')

                                }
                                hintText="Enter Your Last Name"
                                floatingLabelText="Last Name"
                            /><br />
                            <br />
                            <TextField
                                onChange={
                                    this.handleForm.bind(this, 'email')

                                }
                                hintText="Enter Your Email"
                                floatingLabelText="Email"
                            /><br />
                            <br />


                            <PasswordField
                                onChange={
                                    this.handleForm.bind(this, 'password')

                                }
                                floatingLabelText="Password"
                            /> <br /><br />
                            <RaisedButton label='Signup' primary={true} style={{ marginLeft: '30%' }} onClick={this.signUp.bind(this)} />
                            <br /><Link to="/" ><FlatButton label="ALREADY HAVE A ACCOUNT? LOGIN NOW" /></Link>
                            <br /><br />
                        </Paper>
                    </div>
                }
            </div>




            // <div className="container">

            //     <h1>SIGNUP FORM</h1>
            //     <span id="error">{this.state.error}</span >
            //     <span id="info">{this.state.info}</span >
            //     <input className="txtFName" type="text" ref="txtFName" placeholder="First Name" />  <br />  <br />
            //     <input className="txtLName" type="text" ref="txtLName" placeholder="Last Name" />  <br />  <br />
            //     <input className="txtEmail" type="email" ref="txtEmail" placeholder="Email" /><br /> <br />
            //     <input className="txtPassword" type="password" ref="txtPassword" placeholder="Password" /><br /> <br />
            //     <button ref="btnLogin" onClick={this.signUp.bind(this)}>SIGN UP</button>
            //     Already have a account ? <Link to="/">SIGN-IN</Link><br /> <br />
            // </div>
        );
    }
}
export default Signup;
