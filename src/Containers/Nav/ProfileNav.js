import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {NavWrapper, } from './../../GlobalStyles/styles';
import {ProfileNavWrapper, ProfileLinkContainer, } from './page-nav-styles';
import {useSelector} from "react-redux";

const ProfileNav = () => {
    const firebase_id = useSelector(state => state.user.firebase_id);
    return (
        <ProfileNavWrapper>
            <ProfileLinkContainer>
                <NavLink className='link' activeClassName='activeRoute' exact to='/'>
                    Home
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={`/orders/${firebase_id}`}>
                    Orders
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={`/address`}>
                    Address
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={`/paymentmethods`}>
                    Payment Methods
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={`/settings`}>
                    Account Settings
                </NavLink>
            </ProfileLinkContainer>
        </ProfileNavWrapper>
    )
};

export default ProfileNav