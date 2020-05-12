import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import { auth} from '../../firebaseConfig';
import { NavLink, withRouter } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Header, NavWrapper, LinkContainer, Logo, PageNav, MobileLinks, MobileNav, purpleColor} from '../../GlobalStyles/styles';
import {logOut} from '../../Store/Actions/users';

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

const Nav= (props) => {
    const loggedIn = useSelector(state => state.user.loggedIn);
    const firebase_id = useSelector(state => state.user.firebase_id);
    const qty = useSelector(state => state.user.cart.qty);
    const dispatch = useDispatch();

    const logout = () => {
        auth.signOut().then(res => {
            console.log("logout res: ", res)
            dispatch(logOut())
        })
        .catch(err => {
            console.log(err)
        })
        localStorage.clear();
        props.history.push("/");
      };

      const renderAdminLinks = (
          <React.Fragment className={loggedIn ? null : 'hide'}>
            <NavLink className='link' activeClassName='activeRoute' to='/addproduct'>Add Product</NavLink>
            <NavLink className='link' activeClassName='activeRoute' to='/orders'>Orders</NavLink>
            <NavLink className='link' activeClassName='activeRoute' to='/customers'>Customers</NavLink>
          </React.Fragment>
      );

      return (
        <Header>
            <NavWrapper endNav>
                <LinkContainer>
                <NavLink className={loggedIn ? 'link' : 'hide'} onClick={logout} to='/'>Sign Out</NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={loggedIn ? `/profile/${firebase_id}` : '/register'}>
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
            </NavWrapper>
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

            <MobileNav>
            <PageNav >
                <MobileLinks>
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
                </MobileLinks>

                <MobileLinks bottom>
                    <NavLink className='link' activeClassName='activeRoute'  exact to='/earringssets'> 
                        earrings sets
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
                </MobileLinks>
            </PageNav>
            </MobileNav>
        </Header>    
    )
};

export default withRouter(Nav);