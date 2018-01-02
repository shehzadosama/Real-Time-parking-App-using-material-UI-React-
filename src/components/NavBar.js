import React, { Component } from 'react'
import * as firebase from 'firebase'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
// import '../App.css';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// import FeedBacks from './feedBack.js'
// import BookParking from './bookParking.js'
// import ViewSlots from './viewSlots.js'
// import AddSlots from './addSlots.js'
// import FeedBack from './feedBack.js'
// import ViewBooking from './viewBooking.js'
// import MyParking from './myParking.js'
// import Login from './login.js'
// import App from '../App.js'
import * as mat from 'material-ui'
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Toggle from 'material-ui/Toggle/Toggle';
let style = {
    button: {
        color: '#fafbfc'
    },
    appBar: {
        backgroundColor: 'rgb(0, 188, 212)',
        color: '#fafbfc',

    },
    list: {
        // backgroundColor: 'rgb(0, 188, 212)',
        color: 'rgb(0, 188, 212)',
        textDecoration: 'none'
    }
}

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            drawerOpened: false,
            type: null,
            // active: null,
            active: false,
            btn: false

        }

    }

    toggleDrawer() {
        // console.log('toggle')
        // alert()
        this.setState({
            drawerOpened: !this.state.drawerOpened
        })
    }
    close() {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        })
    }
    signOut() {
        this.props.history.push('/')
        firebase.auth().signOut().then(function () {
            alert("Logout")
            // localStorage.clear();
            // localStorage.setItem('activeUser', 'offline')
        }).catch(function (err) {
            console.log(err.message);
        })
        this.setState({
            active: false,
            btn: false
        })
        // this.setState({active: null})
    }

    componentDidMount() {
        // alert();
        let db = firebase.database();
        firebase.auth().onAuthStateChanged(() => {
            let userId = null;
            let user = firebase.auth().currentUser;
            if (user !== null) userId = user.uid
            let that = this;
            if (userId !== null) {
                db.ref('/users/' + userId).once('value', function (snapshot) {

                    that.setState({
                        type: snapshot.val().type,
                        active: true,
                        btn: true
                    })
                });
            }
        })
    }



    render() {
        // console.log(this.state.type)
        // console.log(this.state.drawerOpened)
        // if (localStorage.getItem('activeUser') === "offline") 
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar title="Real Time Car Parking App" showMenuIconButton={this.state.btn} onLeftIconButtonClick={() => this.toggleDrawer()}
                        iconElementRight={
                            <span>
                                {this.state.active ?
                                    <FlatButton label="SignOut" default={true} style={style.button} onClick={this.signOut.bind(this)} />
                                    :
                                    <Link to="/signup"> <FlatButton label="Register" style={style.button} default={true} /></Link>
                                }    </span>
                        }

                    />
                </MuiThemeProvider>
                <Drawer open={this.state.drawerOpened} docked={false} onRequestChange={(drawerOpened) => this.toggleDrawer()}>
                    <MenuItem style={style.appBar}>Real Time Parking System</MenuItem>
                    {this.state.type === 'user' ?
                        <div>
                            <MenuItem ><Link to="/User/ParkingLocations" style={style.list} onClick={this.toggleDrawer.bind(this)}>View Parking locations</Link></MenuItem>
                            <Divider />
                            <MenuItem ><Link to="/User/MyBookings" style={style.list} onClick={this.toggleDrawer.bind(this)}>View my bookings</Link></MenuItem>
                            <Divider />
                            <MenuItem ><Link to="/User/MyFeedbacks" style={style.list} onClick={this.toggleDrawer.bind(this)}>My feedbacks</Link></MenuItem>
                            <Divider />
                            <MenuItem><Link to="/User/SendFeedbacks" style={style.list} onClick={this.toggleDrawer.bind(this)}>Send feedbacks</Link></MenuItem>
                            <Divider />
                        </div>
                        : this.state.type === 'admin' ?
                            <div>
                                <MenuItem  ><Link to="/Admin/AddParkingLocation" style={style.list} onClick={this.toggleDrawer.bind(this)}>Add Parking locations</Link></MenuItem>
                                <Divider />
                                <MenuItem><Link to="/Admin/ParkingLocations" style={style.list} onClick={this.toggleDrawer.bind(this)}>View Parking locations</Link></MenuItem>
                                <Divider />
                                <MenuItem ><Link to="/Admin/UsersList" style={style.list} onClick={this.toggleDrawer.bind(this)}>View All users</Link></MenuItem>
                                <Divider />
                                <MenuItem ><Link to="/Admin/AllBookings" style={style.list} onClick={this.toggleDrawer.bind(this)}>View All bookings</Link></MenuItem>
                                <Divider />
                                <MenuItem ><Link to="/Admin/UsersFeedback" style={style.list} onClick={this.toggleDrawer.bind(this)}>Users Feedback</Link></MenuItem>
                                <Divider />
                            </div>
                            : null}
                </Drawer>




            </div>
        )

        // } else {
        //     return (
        //         <div>
        //             <MuiThemeProvider>

        //                 <AppBar title="Real Time Parking Sytem" showMenuIconButton={this.state.btn} onLeftIconButtonTouchTap={() => this._toggelDrawer()}
        //                     iconElementRight={
        //                         <span>
        //                             {this.state.active ?
        //                                 <mat.FlatButton label="SignOut" style={style.button} style={style.button} default={true} onClick={this.signOut.bind(this)} />
        //                                 :
        //                                 <Link to="/signup"> <mat.FlatButton label="Register" style={style.button} primary={true} /></Link>
        //                             }
        //                         </span>
        //                     }
        //                 />
        //             </MuiThemeProvider>
        //             <Drawer open={this.state.drawerOpened} docked={false} onRequestChange={(drawerOpened) => this._toggelDrawer()}>
        //                 <MenuItem style={style.appBar}>Real Time Parking System</MenuItem>
        //                 {this.state.type !== 'user' ?
        //                     <div>
        //                         <MenuItem><Link to="/addSlots" onClick={this._toggelDrawer.bind(this)}>Add Slots</Link></MenuItem>
        //                         <Divider />
        //                         <MenuItem><Link to="/location" onClick={this._toggelDrawer.bind(this)}>Locations</Link></MenuItem>
        //                         <Divider />
        //                         <MenuItem><Link to="/viewBooking" onClick={this._toggelDrawer.bind(this)}>View Bookings</Link></MenuItem>
        //                         <Divider />
        //                         <MenuItem ><Link to="/feedBacks" onClick={this._toggelDrawer.bind(this)}>Feedbacks</Link></MenuItem>
        //                         <Divider />
        //                     </div>
        //                     :
        //                     <div>
        //                         <MenuItem><Link to="/location" onClick={this._toggelDrawer.bind(this)}>Book parking</Link></MenuItem>
        //                         <Divider />
        //                         <MenuItem><Link to="/myParking" onClick={this._toggelDrawer.bind(this)}>My parkings</Link></MenuItem>
        //                         <Divider />
        //                         <MenuItem><Link to="/feedbacks" onClick={this._toggelDrawer.bind(this)}>FeedBacks</Link></MenuItem>
        //                         <Divider />
        //                     </div>
        //                 }
        //             </Drawer>

        //         </div>
        //     )
        // }

    }
}
export default Navbar