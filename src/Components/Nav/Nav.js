import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { auth} from '../../firebaseConfig';
import { NavLink, withRouter, Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {ClickAwayListener, Typography, Grid} from '@material-ui/core/';
import Divider from '@material-ui/core/Divider';
import Portal from '@material-ui/core/Portal';
import { makeStyles } from "@material-ui/core/styles";
import MoreIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import {categories, Header, NavWrapper, LinkContainer, Logo, PageNav, MobileLinks, MobileNav, purpleColor, fontColor, goldColor, whiteColor} from '../../GlobalStyles/styles';
import {logOut} from '../../Store/Actions/users';
import App from '../../App';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LoginIcon from '@material-ui/icons/LockOpen';
import LocalShipping from '@material-ui/icons/LocalShipping';
import Button from '@material-ui/core/Button';

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -1,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      color: `${purpleColor}`,
      fontSize: "1rem",
    },
  }))(Badge);
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      display: "flex",
        color: `${fontColor}`,
      justifyContent: "center",
      alignItems: "center",
      // border: "5px solid green",
      margin: "4rem auto 0 auto",
      flexDirection: "column",
      position: "fixed",
      [theme.breakpoints.down('xs')]: {
        flexDirection: "column",
        // height: "100vh",
        margin: " 0 auto",

      }
    },
    appBar: {
        display: "flex",
    justifyContent: "space-between",
    backgroundColor: `${purpleColor}`,
    height: "9vh",
    fontWeight: 700,
    fontSize: "1rem",
    borderBottom: `5px solid ${goldColor}`,
    },
    toolBar: {
        display: "flex",
        justifyContent: "space-between"
    },
    menuButton: {
        marginRight: theme.spacing(2),
      },
      icons: {
        // border: "1px solid red",    
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
      icon: {
        color: `${whiteColor}`,
        fontSize: "1.8rem"
      }, 
    sectionMobile: {
      display: 'flex',
      color: "white",
      alignItems: "flex-end",
    // border: "1px solid orange",
      [theme.breakpoints.up('md')]: { 
        display: 'none',
      },
    },
    iconBtn: {
      // border: "1px solid orange",
      display:"flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      margin: 0,
      width: "100%",
      color: `${whiteColor}`
    },
    mobileMenu: {
      color: `${fontColor}`,
      width: "90%",
      paddding: "3",
      // border: "1px solid red",
    },
    active: {
      color: "orange"
    },
    dropdown: {
      position: 'fixed',
      maxWidth: 360,
      width: 300,
      top: "7%",
      right: '.5%',
      //border: `1px solid ${purpleColor}`,
      border: `1px solid black`,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      textTransform: "uppercase",
      // height: 500,
    },
    menuLink: {
      color: `${fontColor}`,
      textDecoration: "none",
      // border: "1px solid green"
    },
    li: {
      textDecoration: "none",
    },
    link: {
      color: "white",
      textDecoration: "none",
      // border: " 1px solid red",
    },
    home: {
      color: `${whiteColor}`,
      textDecoration: "none",
      // border: "2px solid pink",
      width: "100%",
      fontSize: "1.5rem",
      letterSpacing: 4,
      [theme.breakpoints.down('sm')]: { 
        fontSize: "1rem",
      }
    
    },
    title: {
      flexGrow: 1,
      color: "black",
      // border: "4px solid red",
      display: "flex",
      alignItems: "center",
      paddingLeft: "1rem",
      height: 100,
      width: "100%",
      marginTop: "2rem",
      backgroundColor: "#EFEAE1",
      justifyContent: "space-between",
      [theme.breakpoints.down('sm')]: { 
        justifyContent: "center",
      },
    },
    // catNav: {
    //   border: "1px solid red",
    //   // marginBottom: "5rem"
    //   // display: "flex",
    //   // justifyContent: "space-between",
    //   // backgroundColor: "#366E82",
    //   // width: "100%",
    //   // border: "1px solid red",
    //   // height: "32px",
    //   // alignItems: "center",
    //   // padding: "0 .5rem",
     
    // },
    listItem: {
      width: "100%",
      height: "150px",
      // border: "1px solid red",
      padding: 0,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column"
    },
    listItemText: {
      width: "100%",
      // border: "1px solid green",
      listStyle: "none"
    },
    divider: {
      width: "100%", 
      marginBottom: "1rem",
      border: `.5px solid ${purpleColor}`,
      backgroundColor: `${purpleColor}`
    },
    
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
    iconWrapper: {
      display: "flex",
      // border: "1px solid red",
      width: "40%",
      justifyContent: "space-between",
      margin: "3rem 0",
      color: "white",
      [theme.breakpoints.down('sm')]: { 
        display: "none"
       }
    },
    iconText: {
      textDecoration: "none",
      [theme.breakpoints.down('sm')]: { 
       display: "none"
      }
    },
    out: {
      [theme.breakpoints.down('sm')]: { 
        display: "none"
       }
    },
    bottomNav: {
      // position: "absolute",
      // border: "1px solid red",
      width: "100%",
    }
  }));

const Nav= (props) => {
    const loggedIn = useSelector(state => state.user.loggedIn);
    const firebase_id = useSelector(state => state.user.firebase_id);
    const cart = useSelector(state => state.user.cart);


    const qty = useSelector(state => state.user.cart.quantity);
    const admin = useSelector(state => state.user.admin);
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    console.log("loggedin", loggedIn)

    const logout = () => {
        auth.signOut()
            // console.log("logout res: ", res)
            dispatch(logOut())
       
        props.history.push("/");
      };

      const handleClick = () => {
        setOpen((prev) => !prev);
      };
    
      const handleClickAway = () => {
        setOpen(false);
      };
      const loginCart = () => {
        {loggedIn? props.history.push(`/profile/${firebase_id}/cart`) : props.history.push(`/signin`) }
      };
      const login = () => {
        {loggedIn ? logOut() : props.history.push(`/signin`) }
      };
      const handleMenuClick = () => {
        setOpenMenu(!openMenu)
      };

      const profileSignUp = () => {
        {loggedIn ? props.history.push(`/profile/${firebase_id}`) : props.history.push(`/register`) }
      }
      const renderAdminLinks = (
          <React.Fragment className={loggedIn ? null : 'hide'}>
            <NavLink className='link' activeClassName='activeRoute' to='/addproduct'>Add Product</NavLink>
            <NavLink className='link' activeClassName='activeRoute' to='/orders'>Orders</NavLink>
            <NavLink className='link' activeClassName='activeRoute' to='/customers'>Customers</NavLink>
          </React.Fragment>
      );

    //   const renderAdminLinksMobile = (
    //     <React.Fragment className={loggedIn ? null : 'hide'}>
    //     <li className={classes.listItemText}>
    //       <NavLink className={classes.menuLink} activeClassName='activeRoute' to='/addproduct'><Typography>Add Product</Typography></NavLink>
    //       <Divider  className={classes.divider}/>

    //       </li>

    //       <li className={classes.listItemText}>
    //       <NavLink className={classes.menuLink} activeClassName='activeRoute' to='/orders'><Typography>Orders</Typography></NavLink>
    //       <Divider  className={classes.divider}/>

    //       </li> 

    
    //       <li className={classes.listItemText}>

    //       <NavLink className={classes.menuLink} activeClassName='activeRoute' to='/customers'><Typography>Customers</Typography></NavLink>
    //       {/* <Divider  className={classes.divider}/> */}

    //       </li>

    //     </React.Fragment>
    // );
      const subMenu = (
        <List className={classes.catNav} style={{marginTop: "1rem"}}>
          <ListItem button  aria-label="categories menu" onClick={handleMenuClick}>
          <ListItemText style={{color: ` ${fontColor}`}} className={classes.listItemText} primary="Categories"/>
          {openMenu ? <IconExpandLess style={{color: `${goldColor}`}}/> : <IconExpandMore style={{color: `${goldColor}`}}/>}
          </ListItem>
          <Collapse in={openMenu} timeout="auto" unmountOnExit>
            <Divider style={{border: `1px solid ${goldColor}`, backgroundColor: `${goldColor}`}}/>
            <List component="div" disablePadding>
              {categories.map((category) => (
                  console.log("category", category),
                <ListItem style={{textDecoration: "none", color: ` ${fontColor}`}}  key={category} component={ Link } to={`/product/category/?col=category&filter=${category}`} variant="contained" className={classes.menuItem}>
                <ListItemText className={classes.listItemText} inset primary={category} />
              </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      )
      return (
        <Header>
            <div>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <Link to="/" className={classes.home}> Emily's Jewels</Link>

                        <Grid item  className={classes.iconWrapper}>
            <NavLink onClick={profileSignUp} className={classes.iconText}  to={loggedIn ? `/profile/${firebase_id}` : `/register`}>
              <IconButton aria-label={loggedIn ? "account" : "create account"} className={classes.iconBtn}> <AccountCircle  className={classes.icon}/> </IconButton>
              <Typography variant="button" className={classes.iconBtn}>
                {loggedIn ? "ACCOUNT" : "CREATE ACCOUNT"}
              </Typography>
            </NavLink>
            <NavLink className={classes.iconText} to={admin && loggedIn ? `/profile/${firebase_id}` : `/profile/${firebase_id}/cart`}>
            <IconButton
                aria-label={admin ? "orders" : "cart"}
                className={classes.iconBtn}
            >
              <Badge badgeContent={cart.length} color="secondary">
                {admin ? <LocalShipping className={classes.icon}/> :  <ShoppingCartIcon  className={classes.icon}/>}
              </Badge> 
            </IconButton>
            <Typography variant="button" className={classes.iconBtn}> {admin ? "Orders" :  "Cart"} </Typography>
            </NavLink>
            {loggedIn ? 
            <div onClick={logout} className={classes.out}>
              <IconButton  aria-label= "LOGOUT" className={classes.iconBtn}>
               <ExitToAppIcon   className={classes.icon}/> 
             </IconButton> 
             <Typography style={{color: `${whiteColor}`}} variant="button">LOGOUT</Typography>
          </div> 
             :
            <NavLink className={classes.iconText} to={`/signin`}>
              <IconButton aria-label="login" onClick={login} aria-label="LOGIN" className={classes.iconBtn}>
                <LoginIcon   className={classes.icon}/>
              </IconButton>
              <Typography variant="button" style={{color: `${whiteColor}`}}>LOGIN</Typography>
           </NavLink> }
          </Grid>

                
                        {/* <div className={classes.sectionDesktop}>
                        <NavLink className={loggedIn ? 'link' : 'hide'} onClick={logout} to='/'>Sign Out</NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={loggedIn ? `/profile/${firebase_id}` : '/register'}>
                    {loggedIn ? 'Account' : 'Create An Account'}
                </NavLink>
                <span className={loggedIn ? 'hide' : null}>or</span>

                <NavLink className={loggedIn ? 'hide' : 'link'} activeClassName='activeRoute' exact to='/signin'>
                        Sign In
                </NavLink>
                {renderAdminLinks}
                <IconButton aria-label="cart" onClick={() => props.history.push(`/profile/${firebase_id}/cart`)}>
                    <StyledBadge badgeContent={qty}>
                        <ShoppingCartIcon className='icon'/>
                    </StyledBadge>
                </IconButton>
                        </div> */}
                  
                <div className={classes.sectionMobile}> 
            <ClickAwayListener
              onClickAway={handleClickAway}
              className={classes.mobileMenu} 
           > 
            <div >
              <IconButton aria-label="more" style={{color: "#F2CC7E", alignSelf: "flex-end"}} type="button" onClick={handleClick}>
                <MoreIcon/>
              </IconButton>
                {open ? (
                    <Portal>
                      <div className={classes.dropdown}>
                       <nav aria-label="Menu" >
                        <ul className={classes.listItem}>

                           <li className={classes.listItemText}>
                             <NavLink className={classes.menuLink} to={loggedIn ? `/profile/orders${firebase_id}/cart` : `/signin`} href={loginCart}>
                              <Typography>{loggedIn ? `CART` : `LOGIN`}</Typography>
                             </NavLink>
                           </li> 
                          <Divider  className={classes.divider}/>
                          <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to={loggedIn ? `/profile/${firebase_id}` : `/register`} >
                              <Typography>{loggedIn ? `ACCOUNT` : `CREATE ACCOUNT`}</Typography>
                            </NavLink></li>
                            <Divider  className={classes.divider}/>
                          <li className={classes.listItemText}>
                            <NavLink className={classes.menuLink} to='/contact'>
                              <Typography>CONTACT</Typography>
                            </NavLink>
                            <Divider  className={classes.divider}/>

                          </li>
                          <li className={classes.listItemText}>
                            <Button aria-label="logout" onClick={logout}>
                              <Typography className={classes.listItemText}  style={{color: `${fontColor}`}}>LOGOUT</Typography>
                            </Button>


                            <Divider  className={classes.divider}/>

                          </li>
                          {/* {renderAdminLinksMobile} */}
                          {/* <Divider  className={classes.divider}/> */}
                        </ul>
                      </nav>
                      {subMenu}
                  </div>
                  </Portal>
                ) : null}
            </div>
            </ClickAwayListener>
          </div>

          
                    {/* <NavWrapper endNav>
                <LinkContainer>
                <NavLink className={loggedIn ? 'link' : 'hide'} onClick={logout} to='/'>Sign Out</NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={loggedIn ? `/profile/${firebase_id}/orders` : '/register'}>
                    {loggedIn ? 'Account' : 'Create An Account'}
                </NavLink>
                <span className={loggedIn ? 'hide' : null}>or</span>

                <NavLink className={loggedIn ? 'hide' : 'link'} activeClassName='activeRoute' exact to='/signin'>
                        Sign In
                </NavLink>
                {renderAdminLinks}
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={qty}>
                        <ShoppingCartIcon className='icon'/>
                    </StyledBadge>
                </IconButton>
                </LinkContainer>
            </NavWrapper> */}
                    </Toolbar>
                </AppBar>
            </div>
            <Grid className={classes.bottomNav}>
            <Logo>
                
                </Logo>
    
                <PageNav mobile>
                    {/* <MobileLinks> */}
                        <NavLink className='link' activeClassName='activeRoute'  exact to='/earrings'> 
                            earrings
                        </NavLink>
                        <NavLink className='link' activeClassName='activeRoute'  exact to='/necklaces'> 
                            necklaces
                        </NavLink>
                        <NavLink className='link' activeClassName='activeRoute'  exact to='/bracelets'> 
                            bracelets
                        </NavLink>
                        <NavLink className='link' activeClassName='activeRoute'  exact to='/rings'> 
                            rings
                        </NavLink>
                        <NavLink className='link' activeClassName='activeRoute'  exact to='/guypieces'> 
                            guy pieces
                        </NavLink>
                        <NavLink className='link' activeClassName='activeRoute'  exact to='/earringssets'> 
                            earring sets
                        </NavLink>
                        <NavLink className='link' activeClassName='activeRoute'  exact to='/chokers'> 
                            chokers
                        </NavLink>
                        <NavLink className='link' activeClassName='activeRoute'  exact to='/hairclips'> 
                            hairclips
                        </NavLink>
                        <NavLink className='link' activeClassName='activeRoute'  exact to='/anklets'> 
                            anklets
                        </NavLink>
                </PageNav>
    
            </Grid>
            
           
        </Header>    
    )
};

export default withRouter(Nav);