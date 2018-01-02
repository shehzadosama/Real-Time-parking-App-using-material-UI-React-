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
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const style = {
    width: 400,
    margin: 20,
    textAlign: 'left',
    paddingLeft: 60,
    paddingTop: 10,
    display: 'inline-block',
}

class AddParkingLocation extends Component {

    constructor() {
        super();


        this.state = {
            userType: null,
            name: null,
            students: [],
            error: "",
            noOfSlots: 1,
            // value: 1,
            location: ''

        };
    }







    add() {

        // var location = this.refs.location.value;
        // var slots = this.refs.slots.value;
        var userId = ""
        var userType;
        var slotsData = [];
        if (this.state.location === '' || this.state.noOfSlots === '') {
            // alert("all fields are required");
            this.setState({ open: true, error: "** ALL FIELDS ARE REQUIRED" });
            // this.refs.location.focus();
        }
        else {
            var parkingData = {
                location: this.state.location,
                slots: this.state.noOfSlots,
            };

            for (var i = 0; i < this.state.noOfSlots; i++) {
                slotsData.push({
                    status: 'not booked',
                    slotName: 'Slot No ' + i
                })

            }

            // this.setState({  job: parkingData}),
            // function() {
            //   var applications ="";
            // console.log( this.state.jobData);
            // console.log( this.state.job);
            // do something with new state
            var ref = firebase.database().ref('parkinglocations')
            var key = ref.push({
                location: this.state.location,
                noOfSlots: this.state.noOfSlots

            }
            );




            alert("parking location added successfully");
            // this.setState({ error: "" });
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
    handleChange = (event, index, value) => this.setState({ noOfSlots: value });

    render() {
        console.log(this.state.location,this.state.noOfSlots)
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

            //     <h1> Add parking locations  </h1>
            //     <span id="error">{this.state.error}</span >
            //     <input className="location" type="text" ref="location" placeholder="Location" />  <br />
            //     <input className="slots" type="number" min="1" ref="slots" placeholder="No of slots" /><br /> <br />
            //     <button ref="btnLogin" onClick={this.add.bind(this)}>ADD</button>


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
                    <h1 style={{ color: 'rgb(0, 188, 212)' }}>Add parking locations</h1>

                    <TextField
                        onChange={
                            this.handleForm.bind(this, 'location')

                        }
                        hintText="Enter Your Location"
                        floatingLabelText="Location"
                        // value={this.state.location}
                    /><br />
                    <br />
                    <DropDownMenu value={this.state.noOfSlots} onChange={this.handleChange}>
                        <MenuItem value={1} label="No of slots"primaryText="1" />
                        <MenuItem value={2} primaryText="2" />
                        <MenuItem value={3} primaryText="3" />
                        <MenuItem value={4} primaryText="4" />
                        <MenuItem value={5} primaryText="5" />
                        <MenuItem value={6} primaryText="6" />
                        <MenuItem value={7} primaryText="7" />
                        <MenuItem value={8} primaryText="8" />
                        <MenuItem value={9} primaryText="9" />
                        <MenuItem value={10} primaryText="10" />
                    </DropDownMenu><br />
                    <br />
                    <RaisedButton label='ADD' primary={true} onClick={this.add.bind(this)} />
                    <br /><br />
                </Paper>


            </div>
        );
    }
}
export default AddParkingLocation;