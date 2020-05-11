import React, {useEffect} from 'react';
import { Route, Switch} from 'react-router-dom';
import firebase from './firebaseConfig';
import {useDispatch} from 'react-redux';
import Nav from './Components/Nav/Nav';
import Form from './Containers/Forms/Forms';
import HomePage from './Views/HomePage/Home';
import ProfilePage from './Views/Profile/Profile';
import AddProductPage from './Views/AddProductPage/AddProduct';
import {initAuth} from "./Store/Actions/users";
import './App.css';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = user;
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
        {/* ROUTES BELOW THIS LINE WILL BE ADMIN ONLY */}
        <Route exact path='/addproduct' component={AddProductPage}/>
      </Switch>
    </main>

  );
}

export default App