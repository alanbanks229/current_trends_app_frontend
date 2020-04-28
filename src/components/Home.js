import React, {useState} from 'react';

import axios from 'axios'
import {Link} from 'react-router-dom'
import FavoritesContainer from "../containers/FavoritesContainer.js"
import NewsContainer from "../containers/NewsContainer.js"
import ControlledForm from "../SearchFormComponents"
import {useSelector, useDispatch} from "react-redux"
import {geolocation_unavailable} from "../redux/Geolocation.js"
import {received_location} from "../redux/Geolocation.js"
import {get_city_state} from "../redux/CityState.js"
import {fetch_local_news} from "../helper_methods/fetch_local_news.js"


export const Home = (props) => {

    const currentCoordinates = useSelector(state => state.coordinates)
    const [ coordinate, coordinateSet ] = useState(currentCoordinates)
    
    // if this is true make a button appear above that if a user clicks it, renders local
    // news 
    const [ user_location_acquired, user_location_acquiredSet ] =useState(false)
    const [ user_local_news, user_local_news_Set ] = useState(null)
    const [ lat, latSet ] = useState('')
    const [ long, longSet ] = useState('')

    const currentSubmission = useSelector(state => state.submitted)
    const userLocation = useSelector(state => state.user_location)
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
      //If user location is already defined we should not run this function, instead render news
      if (userLocation == null)
      {
          if (!navigator.geolocation){
              dispatch(geolocation_unavailable)
          } else {
              var options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
                
              const success = (position) => {
                  var coordinates = position.coords;
                  latSet(coordinates.latitude)
                  longSet(coordinates.longitude)
                  // debugger
                  dispatch(received_location(event, coordinates))
                  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=en`)
                    .then(response => response.json())
                    .then(data => dispatch(get_city_state(data)))
              }
      
              const error = (err) => {
                  console.warn(`ERROR(${err.code}): ${err.message}`);
              }
              
              navigator.geolocation.getCurrentPosition(success, error, options)
              user_location_acquiredSet(true)

          }
          
      } else {
        //get rid of this
    }
  }

  console.log("current submitted info is: ", currentSubmission)
  console.log("user's current coordinates is", userLocation)
  return (
   <>
      <div className="header-nav-bar">
        { props.loggedInStatus ? <> 
                                  <Link to='/logout' onClick={handleClick}>Log Out</Link><br/> 
                                </> 
                                : 
                                <> 
                                    <Link to='/login'>Log in</Link><br/>
                                </>
        }
        <Link to='/signup'>Sign Up</Link><br/>
        {user_location_acquired ? <Link to='/local_news'>Local News</Link> : <div>Set up Geolocation to get access to local news </div>}
        <button onClick={(event) => getUserLocation(event)} className="get_local_news_btn">Click to set up Geolocation</button>
        <br/>
        { props.user ? <>
                          <h3>Welcome {props.user.username}</h3>
                          <h3>Current Coords are : </h3>
                      </> 
                      : null }
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

export default Home