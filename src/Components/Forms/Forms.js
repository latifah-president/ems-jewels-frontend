


import React, {useState} from 'react';
import {auth} from './../../firebaseConfig';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {GreenRadient, mainBtnColor} from './../../GlobalStyles/styles'
import {useDispatch} from 'react-redux';
import { register } from "./../../Store/Actions/users";

const useStyles = makeStyles(theme => ({
  wrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "5px solid green",
    marginTop: "2rem",
    [theme.breakpoints.down('sm')]: {
      height: "70%",
    }
  },
  form: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    border: "1px solid red"
  },
  formControl: {
    border: "1px solid blue",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "2rem",
    // minWidth: 120,
    // maxWidth: 280
  },
  textFieldThin: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "200px",
    justifyContent: "left"
  },
  textFieldWide: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "416px",
    justifyContent: "left"
  },
  selectFieldThin: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "200px",
    justifyContent: "left"
  },
  root: {
    justifyContent: "center",
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "500px"
  },
  header: {
    marginBottom: "2rem",
    textAlign: "center"
  },
  btn: {
    margin: "2rem auto",
    color: "white",
    width: "60%",
    backgroundColor: `${GreenRadient}`,

    "&:hover": {
      backgroundColor: `${mainBtnColor}`,

    }
  }
}));

  const Form = (props) => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();

   const signUpWithEmailAndPassword = () => {
    if (!email || !password) {
      setError(true)
      setErrorMsg("Please enter email and password")
    }
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          if (user) {
            console.log("incoming user", user);
            if (user.email) {
              const { email, uid } = user;
              localStorage.setItem("firebase_id", uid)
              console.log("emailuser", user);
              const userObj = {
                email,
                firebase_id: uid,
                first_name: first_name,
                last_name: last_name,
                };
                console.log("userObj", userObj)
                dispatch(register(userObj))
                  props.history.push(`/profile/${userObj.firebase_id}`)
            }
          }
        })
        .catch(err => {
          console.log("Error Authenticating User:", err)
          setError(true)
          setErrorMsg(err.message)
        })
  };

  console.log(email, 'email')
      return (
        <Grid container item xs={12} className={classes.wrapper}>
       
          <form className={classes.form} >
            <FormControl className={classes.formControl}>
            <TextField
              required
              className={classes.textFieldWide}
              id="firstName"
              type="text"
              label="First Name"
              margin="dense"
              variant="outlined"
              value={first_name}
              onChange={e => setFirstName(e.target.value)}
            />
              <TextField
              required
              className={classes.textFieldWide}
              id="lastName"
              type="text"
              label="Last Name"
              margin="dense"
              variant="outlined"
              value={last_name}
              onChange={e => setLastName(e.target.value)}
            />
            </FormControl>
           
            <FormControl className={classes.formControl}>
              <TextField
                  fullWidth
                  required
                  className={classes.textFieldWide}
                  id="email"
                  label="Email"
                  margin="dense"
                  variant="outlined"
                  type="email"
                  value={email}
                  helperText={errorMsg}
                  onChange={e => setEmail(e.target.value)}
                />
                    <TextField
              required
              className={classes.textFieldWide}
              id="password"
              label="Password"
              type="password"
              margin="dense"
              variant="outlined"
              value={password}
              helperText={errorMsg}
              onChange={e => setPassword(e.target.value)}
            />
            </FormControl>
{/* 
           <FormControl className={classes.formControl}>
        <TextField
                required
                className={classes.textFieldWide}
                id="confirm password"
                label="Confirm Password"
                type="password"
                margin="dense"
                variant="outlined"
                value={password2}
                helperText={errorMsg}
                onChange={e => setPassword2(e.target.value)}
              /> 
           </FormControl> */}
          </form>
          <Button className={classes.btn} type="submit" variant="contained" color="primary" onClick={signUpWithEmailAndPassword}>Sign Up</Button>
  
     
      </Grid>
      
  //       <div style={{border: '2rem solid red'}}>
  //           <div className="sign-up-wrapper">
  //     <div className="sign-up-left" />
  //     <div className="sign-up-right">
        
          
            
  //           <form
              
  //             onSubmit={e => e.preventDefault() && false}
  //           >
            
  //           <h2>
  //             Register Account
  //           </h2>
              
  //               <label htmlFor="email">Email Address</label>
  //               <input
  //                 className="input-field"
  //                 id="email"
  //                 name="email"
         
  //                 value={email}
  //                 onChange={e => setEmail(e.target.value)}
  //               />
              
             
  //               <label htmlFor="password">Password</label>
  //               <input
  //                 className="input-field"
  //                 name="password"
  //                 type="password"
  //                 id="password"
             
  //                 value={password}
  //                 onChange={e => setPassword(e.target.value)}
  //               />
             
  //            <label htmlFor="password">First Name</label>
  //               <input
  //                 className="input-field"
  //                 name="fist-name"
  //                 type="text"
  //                 id="first-name"
                 
  //                 value={first_name}
  //                 onChange={e => setFirstName(e.target.value)}
  //               />
                
  //               <label htmlFor="last name">Last name</label>
  //               <input
  //                 className="input-field"
  //                 name="last name"
  //                 type="text"
  //                 id="last-name"
          
  //                 value={last_name}
  //                 onChange={e => setLastName(e.target.value)}
  //               />
  //  <label htmlFor="address">Address</label>
  //               <input
  //                 className="input-field"
  //                 name="address"
  //                 type="text"
  //                 id='address'
          
  //                 value={address}
  //                 onChange={e => setAddress(e.target.value)}
  //               />
  //                  <label htmlFor="city">City</label>
  //               <input
  //                 className="input-field"
  //                 name='city'
  //                 type="text"
  //                 id='city'
          
  //                 value={city}
  //                 onChange={e => setCity(e.target.value)}
  //               />
  //                   <label htmlFor="stateInp">State</label>
  //               <input
  //                 className="input-field"
  //                 name='stateInp'
  //                 type="text"
  //                 id='stateInp'
          
  //                 value={stateInp}
  //                 onChange={e => setStateInp(e.target.value)}
  //               />
  //                    <label htmlFor='zip'>Zip</label>
  //               <input
  //                 className="input-field"
  //                 name='zip'
  //                 type="text"
  //                 id='zip'
          
  //                 value={zip}
  //                 onChange={e => setZip(e.target.value)}
  //               />
  //                   <label htmlFor='phone'>Phone Number</label>
  //               <input
  //                 className="input-field"
  //                 name='phone'
  //                 type="text"
  //                 id='phone'
          
  //                 value={phone}
  //                 onChange={e => setPhone(e.target.value)}
  //               />
  //             <button
  //               type="submit"
               
  //               onClick={signUpWithEmailAndPassword}
  //               className='sign-up-button'
  //             >
  //               Register
  //             </button>
  //             <button
  //               type="submit"
               
  //               onClick={logout}
  //               className='sign-up-button'
  //             >
  //               log out
  //             </button>
             
  //           </form>
          
  //     </div>
  //   </div>
          
  //       </div>
        // <div style={{border: '1px solid red'}}>
        //   <form >
        //     <label htmlFor='email'>Email</label>
        //     <input
        //       id='email'
        //       name='email'
        //       type='text'
        //       value={email}
        //       onChange={(e) => setEmail(e.target.value)}
        //     />
        //      <label htmlFor='first_name'>Fist Name</label>
        //     <input
        //       id='first_name'
        //       name='first_name'
        //       type='text'
        //       value={first_name}
        //       onChange={(e) => setFirstName(e.target.value)}
        //     />
        //       <label htmlFor='last_name'>Last Name</label>
        //     <input
        //       id='last_name'
        //       name='last_name'
        //       type='text'
        //       value={last_name}
        //       onChange={(e) => setLastName(e.target.value)}
        //     />
        //       <label htmlFor='address'>Address</label>
        //     <input
        //       id='address'
        //       name='address'
        //       type='text'
        //       value={address}
        //       onChange={(e) => setAddress(e.target.value)}
        //     />
        //      <label htmlFor='city'>City</label>
        //     <input
        //       id='city'
        //       name='city'
        //       type='text'
        //       value={city}
        //       onChange={(e) => setCity(e.target.value)}
        //     />
        //      <label htmlFor='state'>State</label>
        //     <input
        //       id='state'
        //       name='state'
        //       type='text'
        //       value={stateInp}
        //       onChange={(e) => setStateInp(e.target.value)}
        //     />
        //       <label htmlFor='zip'>Zip</label>
        //     <input
        //       id='zip'
        //       name='zip'
        //       type='text'
        //       value={zip}
        //       onChange={(e) => setZip(e.target.value)}
        //     />
        //        <label htmlFor='phoneNumber'>Phone Number</label>
        //     <input
        //       id='phone'
        //       name='phone'
        //       type='text'
        //       value={phone}
        //       onChange={(e) => setPhone(e.target.value)}
        //     />
        //     <button onClick={signUpWithEmailAndPassword}>Register</button>
        //   </form>
        //   <button onClick={logout}>Log Out</button>
        // </div>
          // <AuthContext>
  
        
      //     <div style={{border: '2rem solid red'}}>
      //        <div style={{border: '2rem solid red'}}>
      //       <div className="sign-up-wrapper">
      // <div className="sign-up-left" />
      // <div className="sign-up-right">
        
          
          
  
            )}
            export default Form