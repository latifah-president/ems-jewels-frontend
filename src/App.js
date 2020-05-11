import React, {useState, useEffect, } from 'react';
import { Route, Switch} from 'react-router-dom';
import Nav from './Containers/Nav/Nav';
import Form from './Components/Forms/Forms';
import HomePage from './Views/HomePage/Home';
import ProfilePage from './Views/Profile/Profile';
import firebase from './firebaseConfig';
import {useDispatch} from 'react-redux';
import {initAuth} from "./Store/Actions/users";
import './App.css';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = user;
        console.log("state change user", user);
          firebase.auth()
          .currentUser.getIdToken()
          .then((idToken) => {
            dispatch(initAuth(email, uid, idToken));
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
    return () => {
      console.log("unsubscribe ");
    };
  }, [dispatch]);

  return (
    <main>
      <Nav/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/profile/:firebase_id' component={ProfilePage} />
        <Route exact path='/register' component={Form}/>
      </Switch>
    </main>

  );
}

export default App