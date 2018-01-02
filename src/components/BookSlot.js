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
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

const style = {
    width: 400,
    margin: 20,
    textAlign: 'left',
    paddingLeft: 60,
    paddingTop: 10,
    display: 'inline-block',
}
class BookSlot extends Component {

    constructor() {
        super();

        this.state = {
            key: "",
            locationName: null,
            noOfSlots: [],
            parkingslots: [],
            error: "",
            user: [],
            uid: "",
            bookings: [],
            // value: 1,
            noOfHours: 1,
            bookingDate: '',
            bookingTime: '',
            open: false,
            error: ''
        };
        this.add = this.add.bind(this);
    }
    componentDidMount() {
        var obj = [];
        var b = this;
        var i = 0;
        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/' + userId);
            speedRef.on('value', snap => {

                obj = snap.val();
                //   console.log(obj)
                this.setState({ uid: userId });
                this.setState({ user: obj });
                var i = 0;
                var slotKey = this.props.location.state.slotKeys.toString();
                var locationName = this.props.location.state.locationName;
                var obj1 = [];
                // firebase.auth().onAuthStateChanged(() => {)
                firebase.database().ref('bookings/').orderByChild("location").equalTo(locationName).on("value", function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        if (slotKey === childSnapshot.val().slotNo) {
                            // console.log('found')

                            obj1[i] = childSnapshot.val();
                        }
                        i++;
                    }.bind(this))
                    // obj1 = snapshot.val();
                    // console.log(obj1);
                    this.setState({ bookings: obj1 });
                    // console.log(this.state.bookings);
                }.bind(this)
                );
                // console.log(this.state.bookings);
            })
        });
    }



    add() {
        // let startTime = this.state.bookingTime;
        // console.log(new Date(startTime.getTime()))
        // console.log(new Date().getTime(), 'current time')


        var bookingDate = '';
        var bookingTime = '';
        var noOfHours = '';

        // var bookingDate = this.refs.bookingDate.value;
        // var bookingTime = this.refs.bookingTime.value;
        // var noOfHours = this.refs.noOfHours.value;
        //         var currentDate = new Date();
        var slotKey = this.props.location.state.slotKeys;
        var locationName = this.props.location.state.locationName;

        if (this.state.bookingDate === '' || this.state.bookingTime === '') {
            // alert("please Fill Complete form")
            this.setState(
                {
                    open: true,
                    error: 'please Fill Complete form'
                }
            )
        } else {
            var date = new Date(this.state.bookingDate);
            console.log(date.getMonth());
            console.log(date.getFullYear());
            console.log(date.getDate());
            var month = date.getMonth();
            var year = date.getFullYear();
            var date = date.getDate();
            var start = new Date(this.state.bookingTime)
            start.setSeconds(0);
            start.setMilliseconds(0);
            start.setMonth(month);
            start.setFullYear(year);
            start.setDate(date);
            var startTimeInMiliSec = start.getTime()
            // start.setSeconds(0)
            console.log(startTimeInMiliSec)
            console.log(start, 'start time')
            var current = new Date()
            current.setSeconds(0);
            current.setMilliseconds(0);
            var currentTime = current.getTime()
            console.log(currentTime, 'current time')
            console.log(startTimeInMiliSec + (this.state.noOfHours * 3600000));
            var a = startTimeInMiliSec + (this.state.noOfHours * 3600000);  /* Calculate milisecs for End Time */
            var end = new Date(a);
            var endTimeInMiliSec = end.getTime();
            // end.setMilliseconds(a);
            console.log(end, 'end time')
            if (startTimeInMiliSec < currentTime) {
                this.setState(
                    {
                        open: true,
                        error: "CAN'T BOOK IN PAST TIME"
                    }
                )
            } else {
                if (this.state.bookings.length === 0) {    /* if there is no booking in this slot*/
                    // alert('no previous bookings');
                    // var time = bookingTime.split(':');
                    // var endTime = Number(time[0]) + Number(noOfHours);
                    // endTime = endTime + ":" + time[1];
                    var ref = firebase.database().ref('bookings')
                    ref.push({
                        location: locationName,
                        slotNo: slotKey.toString(),
                        uid: this.state.uid,
                        uName: this.state.user.FName,
                        // date: bookingDate,
                        startTime: start.toString(),
                        endTime: end.toString(),
                        hours: this.state.noOfHours.toString(),
                    });
                }
                else {
                    // alert('previous bookings')
                    // var time = bookingTime.split(':');
                    // var endTime = Number(time[0]) + Number(noOfHours);
                    // endTime = endTime + ":" + time[1];
                    console.log(this.state.bookings);
                    var keys = Object.keys(this.state.bookings);
                    var key = this.state.bookings;
                    var flag = 0;
                    for (var i in key) {
                        var bookedStartTimeInMiliSec = new Date(this.state.bookings[i].startTime).getTime();
                        var bookedEndTimeInMiliSec = new Date(this.state.bookings[i].endTime).getTime();
                        console.log(bookedStartTimeInMiliSec);
                        console.log(bookedEndTimeInMiliSec);
                        if ((bookedStartTimeInMiliSec === startTimeInMiliSec && bookedEndTimeInMiliSec === endTimeInMiliSec) || (startTimeInMiliSec >= bookedStartTimeInMiliSec && !(startTimeInMiliSec >= bookedEndTimeInMiliSec)) || (startTimeInMiliSec < bookedStartTimeInMiliSec && endTimeInMiliSec > bookedStartTimeInMiliSec)) {
                            this.setState({ open: true, error: "** Already  booked" });
                            flag = 1;
                        }
                    }
                    if (flag === 0) {
                        var ref = firebase.database().ref('bookings');
                        ref.push({
                            location: locationName,
                            slotNo: slotKey.toString(),
                            uid: this.state.uid,
                            uName: this.state.user.FName,
                            startTime: start.toString(),
                            endTime: end.toString(),
                            hours: this.state.noOfHours.toString(),
                        });
                        this.setState({ open: true, error: "** Book successfully" });
                    }
                }
            }
        }
    }

    handleDialog = () => {
        console.log('open')
        this.setState({ open: !this.state.open });
    };

    handleChange = (event, index, value) => this.setState({ noOfHours: value });
    bookingDate = (event, bookingDate) => {
        this.setState({
            bookingDate: String(bookingDate)

        })
    }
    handleStartTime = (event, startTime) => {
        this.setState({
            bookingTime: String(startTime)
            // bookingTime: startTime
        })
    }
    render() {
        console.log(this.state.bookings)
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleDialog.bind(this)}
            />,
        ];
        console.log(this.state.bookingDate, 'bookingDate')
        console.log(this.state.bookingTime, 'bookingTime')
        console.log(this.state.noOfHours, 'no of hours')
        return (

            <div>
                <Dialog
                    title={this.state.error}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleDialog}
                >
                </Dialog>
                <Paper style={style} zDepth={5}>
                    <h1 style={{ color: 'rgb(0, 188, 212)' }}> Location Name: {this.props.location.state.locationName}</h1>
                    <h1 style={{ color: 'rgb(0, 188, 212)' }}> Book parking Slot {this.props.location.state.slotKeys}</h1>

                    <DatePicker
                        autoOk={true}
                        minDate={new Date()}
                        floatingLabelText="Date"
                        onChange={this.bookingDate}
                    />

                    <TimePicker
                        autoOk={true}
                        defaultTime={new Date()}
                        floatingLabelText="Start Time.."
                        onChange={this.handleStartTime}
                    /><br /><br />
                    <h4>No of Hours</h4>
                    <DropDownMenu value={this.state.noOfHours} onChange={this.handleChange}>
                        <MenuItem value={1} primaryText="1" />
                        <MenuItem value={2} primaryText="2" />
                        <MenuItem value={3} primaryText="3" />
                        <MenuItem value={4} primaryText="4" />
                        <MenuItem value={5} primaryText="5" />

                    </DropDownMenu>
                    <br /><br />
                    <RaisedButton label='Book Slot' primary={true} onClick={this.add.bind(this)} />
                    <br /><br />
                </Paper>
            </div>
        );
    }
}
export default BookSlot;