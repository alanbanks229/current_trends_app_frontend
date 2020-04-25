import React, {useState} from 'react';

import axios from 'axios'
import {Link} from 'react-router-dom'
import FavoritesContainer from "../containers/FavoritesContainer.js"
import NewsContainer from "../containers/NewsContainer.js"
import ControlledForm from "../SearchFormComponents"
import {useSelector, useDispatch} from "react-redux"
import {geolocation_unavailable} from "../redux/Geolocation.js"
import {received_location} from "../redux/Geolocation.js"
const Home = (props) => {

    const currentLocation = useSelector(state => state.location)
    const [ coordinate, coordinateSet ] = useState(currentLocation)
    const [ lat, latSet ] = useState('')
    const [ long, longSet ] = useState('')

    const currentSubmission = useSelector(state => state.submitted)
    const userLocation = useSelector(state => state.location)
    const dispatch = useDispatch()

    const handleClick = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(response => {
        props.handleLogout()
        props.history.push('/')
        })
        .catch(error => console.log(error))
    }
  
  const getUserLocation = (event) => {

    if (!navigator.geolocation){
        dispatch(geolocation_unavailable)
    } else {
        var options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
          
        const success = (position) => {
            var coordinates = position.coords;
            latSet(coordinates.latitude)
            longSet(coordinates.longitude)
            debugger
            dispatch(received_location(event, coordinates))
        }

        const error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        navigator.geolocation.getCurrentPosition(success, error, options)
    }
  }

  console.log("current submitted info is: ", currentSubmission)
  console.log("user's current coordinates is", userLocation)
return (
   <>
    <div className="header-nav-bar">
      { props.loggedInStatus ? <> <Link to='/logout' onClick={handleClick}>Log Out</Link><br/> </> : 
                               <> <Link to='/login'>Log in</Link><br/></>
      }
      <Link to='/signup'>Sign Up</Link>
      <button onClick={(event) => getUserLocation(event)} className="get_local_news_btn">Your Local News</button>
      <br/>
      <h3>Current Coords are : </h3>
    </div>
    <h1>Current Trends</h1>
    <br></br>
    <ControlledForm />
    <FavoritesContainer />
    <br></br>
    <NewsContainer search_submitted={currentSubmission} user_location={userLocation}/>
    </>
  );
};
export default Home;