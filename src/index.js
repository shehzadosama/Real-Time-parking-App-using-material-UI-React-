import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyCgoKdDAr48NFqcMAzFpOGGgkqGXi7PGwI",
    authDomain: "js-assignment2.firebaseapp.com",
    databaseURL: "https://js-assignment2.firebaseio.com",
    projectId: "js-assignment2",
    storageBucket: "js-assignment2.appspot.com",
    messagingSenderId: "1050899447421"
};
firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
