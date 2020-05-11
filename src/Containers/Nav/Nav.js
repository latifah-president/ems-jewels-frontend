import React from 'react';
import {useSelector} from "react-redux";
import { auth} from './../../firebaseConfig';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {Header, NavWrapper, LinkContainer, Logo, PageNav, MobileLinks, MobileNav} from './../../GlobalStyles/styles';
import {logOut} from './../../Store/Actions/users';

const Nav= (props) => {
    const loggedIn = useSelector(state => state.user.loggedIn);
    const firebase_id = useSelector(state => state.user.firebase_id);
    const logout = () => {
        auth.signOut();
        localStorage.clear();
        props.history.push("/");
      };

      return (
        <Header>
            <NavWrapper endNav>
                <LinkContainer>
                <button className={loggedIn ? null : 'hide'} onClick={logout}>Sign Out</button>
                {/* <NavLink className='link' activeClassName='activeRoute' exact to='/signin'>
                    Sign In
                </NavLink> */}
                <NavLink className='link' activeClassName='activeRoute' exact to={loggedIn ? `/profile/${firebase_id}` : '/register'}>
                    {loggedIn ? 'Account' : 'Create An Account'}
                </NavLink>
                <span className={loggedIn ? 'hide' : null}>or</span>

                <NavLink className={loggedIn ? 'hide' : 'link'} activeClassName='activeRoute' exact to='/signin'>
                        Sign In
                </NavLink>
                <NavLink exact to='/cart'>
                    <FontAwesomeIcon className='icon' icon={faShoppingCart}/>
                </NavLink>
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
                {/* </MobileLinks> */}

                {/* <MobileLinks bottom> */}
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
                {/* </MobileLinks> */}
            </PageNav>

            {/* MOBILE NAV */}
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