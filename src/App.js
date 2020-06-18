import React, {useEffect} from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import firebase from './firebaseConfig';
import {useDispatch} from 'react-redux';
import Nav from './Components/Nav/Nav';
import Footer from "./Components/Footer/Footer";
import Form from './Containers/Forms/Forms';
import HomePage from './Views/HomePage/Home';
import ProfilePage from './Views/Profile/Profile';
import AddProductPage from './Views/AddProductPage/AddProduct';
import SignIn from './Containers/Forms/SignIn';
import ProductDetailsPage from "./Views/ProductPage/ProductDetail";
import CartPage from "./Views/Cart/Cart";
import AdminSignUpPage from "./Containers/Forms/AdminSignUp";
import {initAuth, logIn, logOut} from "./Store/Actions/users";
import './App.css';
import { getProducts } from './Store/Actions/products';
import { useSelector } from 'react-redux';

function App(props) {
  const dispatch = useDispatch();
  const authenticate = useSelector(state => state.user.authenticate);
  const admin = useSelector(state => state.user.admin);

  console.log("authenticated", authenticate)
  console.log("admin", admin)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = user;
          firebase.auth()
          .currentUser.getIdToken()
          .then((idToken) => {
            // dispatch(logIn())
            if (props.match.path === "/") {
              dispatch(initAuth(email, uid, idToken));

           }
           
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        dispatch(logOut)
      }
    });
    return () => {
      console.log("unsubscribe ");
    };
  }, [dispatch]);

  return (
    <main style={{ width: "100%"}}>
      <Nav/>
      <main className="wrapper">
      <Switch>

      <Route exact path='/product/:id' component={ProductDetailsPage} />
      <Route exact path='/profile/:id/cart' component={CartPage}/>
      <Route  path='/profile/:firebase_id' component={ProfilePage} />


        {/* <Route exact path='/addproduct' component={AddProductPage}/> */}

        <Route exact path='/register' component={Form}/>
        <Route exact path="/signin" component={SignIn}/>


        {/* ROUTES BELOW THIS LINE WILL BE ADMIN ONLY */}
        <Route exact path='/admin/register' component={AdminSignUpPage}/>
        <Route exact path='/' component={HomePage} />

      </Switch>
      </main>
      <Footer/>

    </main>

  );
}

export default withRouter(App);