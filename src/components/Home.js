import React, {useState} from 'react';
import NewsContainer from "../containers/NewsContainer.js"
import ControlledForm from "../SearchFormComponents"
import {useSelector, useDispatch} from "react-redux"
import NavBarContainer from '../containers/Navbar.js';



export const Home = (props) => {

  const currentSubmission = useSelector(state => state.submitted)
  // console.log("current submitted info is: ", currentSubmission)
  // console.log("user's current coordinates is", userLocation)
  // right below header-nav-bar div we had props.loggedInStatus... just incase put it back if currentUser does not work
  return (
  <>
      <NavBarContainer props={props}/>
      <ControlledForm />
      <br></br>
      <NewsContainer search_submitted={currentSubmission}/>
  </>
  );
};

export default Home