import React, {useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {geolocation_unavailable} from "../redux/Geolocation.js"
import {received_location} from "../redux/Geolocation.js"
import {get_city_state} from "../redux/CityState.js"
import './navbar.css'
import { Button, Icon } from 'semantic-ui-react'

const NavBarContainer = (props) => {

    const [ user_location_acquired, user_location_acquiredSet ] = useState(false)
    const [ lat, latSet ] = useState('')
    const [ long, longSet ] = useState('')

    const currentSubmission = useSelector(state => state.submitted)
    const userLocation = useSelector(state => state.user_location)
    const currentUser = useSelector(state => state.current_user)
    const dispatch = useDispatch()

    const IconExampleIconGroup = () => {
      return (
        <div>
      <Icon.Group size='large'>
        <Icon name='user' />
      </Icon.Group>
      </div>
    )}

    const BookmarkIcon = () => {
      return(
      <Icon.Group size='large'>
        <Icon name='bookmark' />
      </Icon.Group>
      )}

    const NewsPaperIcon = () => {
      return (
        <div>
          <Icon.Group size='large'>
            <Icon name='newspaper outline' />
          </Icon.Group>
        </div>
      )
    }
    const handleClick = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(response => {
          props.props.handleLogout()
          props.props.history.push('/')
        })
        .catch(error => console.log(error))
    }

    const send_user_location_backend = (data) => {
      if (currentUser){
        var userId = currentUser.id
        fetch(`http://localhost:3001/users/${userId}`, {
          method: 'PATCH',
          headers:  {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => console.log(json))
      }
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
                      send_user_location_backend(data)
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
          <h2 className="logo">Current Trends</h2>
        { currentUser ? <> 
                          <ul>
                              <li className="logout">
                                  <Link to='/logout' onClick={handleClick}>
                                      <Button animated>
                                        <Button.Content visible>{IconExampleIconGroup()}</Button.Content>
                                        <Button.Content hidden>
                                            Log Out
                                        </Button.Content>
                                      </Button>
                                  </Link>
                              </li>

                              <li className="bookmark">
                                  <Link to='/your_bookmarks'>
                                      <Button animated>
                                        <Button.Content visible>{BookmarkIcon()}</Button.Content>
                                        <Button.Content hidden>
                                        <p>Bookmarks</p>
                                        </Button.Content>
                                      </Button>
                                  </Link>
                              </li>
                              {user_location_acquired ?
                              <li className="localnewsbtn">
                                  <Link to='/local_news'>Local News</Link>
                              </li>
                                  : 
                                  <Button animated>
                                      <Button.Content visible>{NewsPaperIcon()}</Button.Content>
                                      <Button.Content hidden onClick={(event) => getUserLocation(event)} className="get_local_news_btn">
                                          Local News
                                      </Button.Content>
                                  </Button> 
                              }
                           </ul>
                      </> 
                                : 
                                <> 
                                  <ul>
                                    <li className="login"><Link to='/login'>Log in</Link></li>
                                    <li className="signup"><Link to='/signup'>Sign Up</Link></li>
                                    
                                  </ul>
                                </>
        }
        <h3>Current weather in your area:</h3>
        {user_location_acquired ? <Link to='/local_news'>Local News</Link> : <div><li>Set up Geolocation to get access to local news</li></div>}
        <button onClick={(event) => getUserLocation(event)} className="get_local_news_btn">Click to set up Geolocation</button>
        <br/>
        { props.props.user ? <>
                          <h3>Welcome {props.props.user.username}</h3>
                          <h3>Current Weather is:</h3>
                      </> 
                      : null }
        </div>
        </>
    )
}

export default NavBarContainer