import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup"
import Admin from "./components/Admin";
import User from "./components/User";
import MyBookings from "./components/MyBookings"
import ParkingLocations from "./components/ParkingLocations";
import SendFeedbacks from "./components/SendFeedbacks";
import MyFeedbacks from "./components/MyFeedbacks";
import AddParkingLocation from "./components/AddParkingLocation";
import AllBookings from "./components/AllBookings";
import UsersFeedback from "./components/UsersFeedback";
import UsersList from "./components/UsersList";
import LocationDetail from "./components/LocationDetail"
import BookSlot from "./components/BookSlot"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className="App">
            <div>
            <Route  path="/" component={NavBar} />
              {/* <Route exact path="/" component={Login} /> */}
              <Route exact path="/" component={Login} />
              <Route path="/Signup" component={Signup} />
              <Route exact path="/User" component={User} />
              <Route path="/User/MyBookings" component={MyBookings} />
              <Route path="/User/ParkingLocations" component={ParkingLocations} />
              <Route path="/User/SendFeedbacks" component={SendFeedbacks} />
              <Route path="/User/MyFeedbacks" component={MyFeedbacks} />
              <Route path="/User/LocationDetail" component={LocationDetail} />
              <Route path="/User/LocationDetail/BookSlot" component={BookSlot} />
              <Route path="/User/BookSlot" component={BookSlot} />
              <Route exact path="/Admin" component={Admin} />
              <Route path="/Admin/AddParkingLocation" component={AddParkingLocation} />
              <Route path="/Admin/AllBookings" component={AllBookings} />
              <Route path="/Admin/UsersFeedback" component={UsersFeedback} />
              <Route path="/Admin/UsersList" component={UsersList} />
              <Route path="/Admin/ParkingLocations" component={ParkingLocations} />
            </div>
          </div>
        </MuiThemeProvider>
      </Router>

    );
  }
}

export default App;
