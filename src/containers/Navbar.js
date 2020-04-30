import React, {useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {geolocation_unavailable} from "../redux/Geolocation.js"
import {received_location} from "../redux/Geolocation.js"
import {get_city_state} from "../redux/CityState.js"

const NavBarContainer = (props) => {

    const [ user_location_acquired, user_location_acquiredSet ] = useState(false)
    const [ lat, latSet ] = useState('')
    const [ long, longSet ] = useState('')

    const currentSubmission = useSelector(state => state.submitted)
    const userLocation = useSelector(state => state.user_location)
    const currentUser = useSelector(state => state.current_user)
    const dispatch = useDispatch()

    const handleClick = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(response => {
          props.props.handleLogout()
          props.props.history.push('/')
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
                  dispatch(received_location(event, coordinates))
                  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=en`)
                    .then(response => response.json())
                    .then(data => {
                      user_location_acquiredSet(true)
                      dispatch(get_city_state(data))
                    }
                  )
              }
      
              const error = (err) => {
                  console.warn(`ERROR(${err.code}): ${err.message}`);
              }
              
              navigator.geolocation.getCurrentPosition(success, error, options)
              
          }
          
      } else {
        //get rid of this
    }
  }
    return (
        <>
        <div className="header-nav-bar">
        { currentUser ? <> 
                                <Link to='/logout' onClick={handleClick}>Log Out</Link><br/>
                                <Link to='/your_bookmarks'>Bookmarks</Link><br/>
                                </> 
                                : 
                                <> 
                                    <Link to='/login'>Log in</Link><br/>
                                    <Link to='/signup'>Sign Up</Link><br/>
                                </>
        }
        {user_location_acquired ? <Link to='/local_news'>Local News</Link> : <div>Set up Geolocation to get access to local news </div>}
        <button onClick={(event) => getUserLocation(event)} className="get_local_news_btn">Click to set up Geolocation</button>
        <br/>
        { props.props.user ? <>
                          <h3>Welcome {props.props.user.username}</h3>
                          <h3>Current Coords are : </h3>
                      </> 
                      : null }
        </div>
        </>
    )
}

export default NavBarContainer