import React, {useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {geolocation_unavailable} from "../redux/Geolocation.js"
import {received_location} from "../redux/Geolocation.js"
import {get_city_state} from "../redux/CityState.js"
import './navbar.css'
import { Button, Icon } from 'semantic-ui-react'
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import logo_img from './final_logo.jpg'
import WeekContainer from './WeekContainer';
import swal from '@sweetalert/with-react';

const NavBarContainer = (props) => {

    const [ user_location_acquired, user_location_acquiredSet ] = useState(false)
    const [ lat, latSet ] = useState('')
    const [ long, longSet ] = useState('')
    const [ loading, loadingSet ] = useState(false)

    const currentSubmission = useSelector(state => state.submitted)
    const userLocation = useSelector(state => state.user_location)
    const currentUser = useSelector(state => state.current_user)
    const [ displayWeather, displayWeatherSet ] = useState(false)
    const dispatch = useDispatch()

    const override = css`
      display: inline-block;
      margin: 0 auto;
      border-color: linear-gradient(90deg, rgba(58,170,180,1) 0%, rgba(253,237,29,1) 50%, rgba(69,80,252,1) 100%);
    `;
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
      // https://current-trends-app-api.herokuapp.com/ http://localhost:3001/logout
        axios.delete('https://current-trends-app-api.herokuapp.com/logout', {withCredentials: true})
        .then(response => {
          props.props.handleLogout()
          props.props.history.push('/')
        })
        .catch(error => console.log(error))
    }

    const userClickedDisplayWeather = () => {
      displayWeatherSet(!displayWeather)
    }

    const send_user_location_backend = (data) => {
      if (currentUser){
        var userId = currentUser.id
        // http://localhost:3001/users/${userId}
        fetch(`https://current-trends-app-api.herokuapp.com/users/${userId}`, {
          method: 'PATCH',
          headers:  {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => loadingSet(false))
      }
    }

    const calibrateLocationFirst = () => {
      swal({
        text: "You cannot access weather yet: (See Below)",
        icon: "error",
        buttons: {
          cancel: "Close",
        },
        content: (
          <div>
            <br/>
            <p>In order to see your local weather, this app needs access to your approximate location.</p>
            <p>This can be done by clicking the <b>local news icon</b> in the <b>top right navbar</b> when you are logged in!</p>
          </div>
        )
      })
    }
  
    const getUserLocation = (event) => {
      //If user location is already defined we should not run this function, instead render news
      //we cant figure this out so i need a loading icon to appear here.
      if (userLocation == null)
      {
          if (!navigator.geolocation){
              dispatch(geolocation_unavailable)
          } else {
              var options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
              loadingSet(true)
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
          <div className="left-float-li-items">
          <ul>
            
            { userLocation ? (<><li className="weather-btn-li" onClick={userClickedDisplayWeather}>
            <Button animated>
              <Button.Content visible><Icon size='large' name='cloud' /></Button.Content>
              <Button.Content hidden>
                local forecast
              </Button.Content>
            </Button>
            </li>
            <li className="about-li">
              <Link to='/about'> <Button size='large'>About</Button> </Link>
            </li>
            <li className="logo-li">
              <Link to='/'> <button><img src={logo_img} className="logo"/></button></Link>
            </li></>) 
            
            : 
            
            (<>
            
            <li className="weather-btn-li" onClick={calibrateLocationFirst}>
            <Button animated>
              <Button.Content visible><Icon size='large' name='cloud' /></Button.Content>
              <Button.Content hidden>
                local forecast
              </Button.Content>
            </Button>
            </li>
            <li className="about-li">
              <Link to='/about'> <Button size='large'>About</Button> </Link>
            </li>
            <li className="logo-li">
              <Link to='/'> <button><img src={logo_img} className="logo"/></button></Link>
            </li>
            
            </>) }
            
            
          </ul>
          </div>
        { currentUser ? <> 
                          <ul className="right-li-ul-items">
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
                                        Bookmarks
                                        </Button.Content>
                                      </Button>
                                  </Link>
                              </li>
                              {user_location_acquired ?
                              <li className="localnewsbtn">
                                    <div className="local_news_ready_div">
                                    <Link to='/local_news'>
                                      <Button animated>
                                        <Button.Content visible><span>Local</span>{NewsPaperIcon()}</Button.Content>
                                        <Button.Content hidden onClick={(event) => getUserLocation(event)} className="get_local_news_btn">
                                        <p>Go <i class="arrow alternate circle right outline icon large"></i> </p>
                                        </Button.Content>
                                      </Button>
                                      </Link>
                                      </div>
                              </li>
                                  : 
                                  (loading ? (      
                                  <div className="sweet-loading">
                                    <p>Approximating your location, this will take a moment...</p>
                                    <PropagateLoader
                                      css={override}
                                      size={15}
                                      color={"linear-gradient(90deg, rgba(58,170,180,1) 0%, rgba(253,237,29,1) 50%, rgba(69,80,252,1) 100%);"}
                                      loading={loading}
                                    />
                                  </div>
                                  ) : 
                                  ((userLocation ? (
                                  <li className='localnewsbtn'>
                                      <Link to='/local_news'>
                                        <div className='disabled-link'>
                                        <Button animated>
                                          <Button.Content visible><span>Local</span>{NewsPaperIcon()}</Button.Content>
                                          <Button.Content hidden onClick={(event) => getUserLocation(event)} className="get_local_news_btn">
                                            <i class="arrow alternate circle right outline icon large"></i>
                                          </Button.Content>
                                        </Button>
                                        </div>
                                      </Link>
                                  </li>) : 
                                  (<li className='localnewsbtn'>
                                    <div className='disabled-link'>
                                      <Button animated>
                                        <Button.Content visible><span>Local</span>{NewsPaperIcon()}</Button.Content>
                                        <Button.Content hidden onClick={(event) => getUserLocation(event)} className="get_local_news_btn">
                                            Calibrate
                                        </Button.Content>
                                      </Button>
                                    </div>
                                  </li>
                                  )
                                  ))
                                  )
                              }
                           </ul>
                      </> 
                                : 
                                <> 
                                  <ul className="right-li-ul-items">
                                  <li className="login">
                                    <Link to='/login'>
                                      <Button size='large'>Login</Button>
                                    </Link>
                                  </li>

                                  <li className="signup">
                                  <Link to='/signup'>
                                      <Button animated>
                                        <Button.Content visible> <Icon size='large' name='add user'/> </Button.Content>
                                        <Button.Content hidden>
                                            Sign Up!
                                        </Button.Content>
                                      </Button>
                                  </Link>
                              </li>
                                    
                                  </ul>
                                </>
        }
        { props.props.user ? <>
                          <h3 className="welcome_user">Welcome {props.props.user.username}</h3>
                      </> 
                      : null }
        { userLocation ? (( displayWeather ? 
        (<>
            <WeekContainer hide={displayWeather}/>
          </>
          ) 
          : 
          (<><WeekContainer hide={displayWeather} /></>))) : (null) }
        
          </div>
        </>
    )
}

export default NavBarContainer