import React, { Component } from 'react';
import logo from './logo.svg';
import '../App.css';
import * as firebase from 'firebase';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
const style = {
  width: 400,
  margin: 20,
  textAlign: 'left',
  paddingLeft: 60,
  paddingTop: 10,
  display: 'inline-block',
}


class Login extends Component {

  constructor() {
    super();
    this.state = {

      error: null,
      loader: true,
      email: '',
      password: '',
      open: false
    };


    // componentDidMount() {
    // alert();
    let db = firebase.database();
    firebase.auth().onAuthStateChanged(() => {
      let userId = null;
      let user = firebase.auth().currentUser;
      if (user !== null) userId = user.uid

      // console.log(userId);
      let that = this;
      if (userId !== null) {
        // console.log('user is logged in')
        db.ref('/users/' + userId).once('value', function (snapshot) {

          // that.setState({
          //   type: snapshot.val().type,
          //   loader: false
          // })
          let userType = snapshot.val().type;
          if (userType === 'user') {
            that.props.history.push('/User');
          } else if (userType === 'admin') {
            that.props.history.push('/Admin');
          }
        });
      } else {
        // console.log('user is not logged in')
        that.setState({
          loader: false
        })
      }
    })
    // }
  }
  handleForm(labelState, ev) {
    // console.log(ev.target.value)
    this.setState({
      [labelState]: ev.target.value
    })
  }
  login() {

    // var email = "";
    // var password = "";
    // email = this.refs.txtEmail.value;
    // password = this.refs.txtPassword.value;
    let userId = "";
    let userType;
    if (this.state.email === '' || this.state.password === '') {

      // alert("all fields are required");
      this.setState({ open: true, error: "** ALL FIELDS ARE REQUIRED" });
      // this.refs.txtEmail.focus();
    } else {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((res) => {
        // console.log(res);
        var userId = firebase.auth().currentUser.uid;
        const rootRef = firebase.database().ref();
        const speedRef = rootRef.child('users/' + userId);
        speedRef.on('value', snap => {

          userType = snap.val().type

          //  alert(userType);
          if (userType === 'user') {
            this.props.history.push('/User');
          } else if (userType === 'admin') {
            this.props.history.push('/Admin');
          }
        });

      }
      ).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          // alert(errorCode);
          this.setState({
            open: true,
            error: "Wrong password."
          });
        } else if (errorMessage) {
          // alert(errorMessage);
          this.setState({ open: true, error: errorMessage });

        }
      }.bind(this));

    }

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
    // console.log(this.state.loader, 'loader');
    console.log(this.state.email, 'email');
    console.log(this.state.password, 'password');
    console.log(this.state.error, 'error');
    console.log(this.state.open, 'drawer');
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
              <h1  style={{ color: 'rgb(0, 188, 212)' }}>Login</h1>

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
              <RaisedButton label='Login' primary={true} onClick={this.login.bind(this)} />
              <br /><br />
            </Paper>
          </div>
        }
      </div>
    );
  }
}
export default Login;
