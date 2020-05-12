import React from 'react';
import { withRouter } from 'react-router-dom';
import ProfileNav from '../../Components/Nav/ProfileNav';
import {Wrapper, DarkTitle, ContentArea, } from '../../GlobalStyles/styles';

const Profile = (props) => {
    console.log("prams", props)
    return (
      <Wrapper>
        <ContentArea style={{width: '100%'}}>
        <ProfileNav params={props.match.params}/>
        {/*TODO: CHANGE TITLE BASED ON WHICH URL PARAM IS SHOWING EX: ORDERS, PAYMENT METHODS, ECT */}
        <DarkTitle>ORDERS</DarkTitle>
        </ContentArea>
      </Wrapper> 
    )
};

export default withRouter(Profile)