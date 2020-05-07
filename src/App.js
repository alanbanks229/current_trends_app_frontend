import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux"

import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import About from './components/About'
import LocalNewsPage from './components/local_news'
import BookmarksPage from './components/bookmark_page'
import {user_logged_in_action, user_logged_out_action} from './redux/logged_in_status.js'
import {retrieve_user_bookmarks} from './redux/bookmarks.js'
import {get_city_state} from "./redux/CityState.js"

// import './App.css';

const App = (props) => {

  const [ user, userSet ] = useState(null)
  const [ isLoggedIn, isLoggedInSet ] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    loginStatus()
  }, [])
  
  const loginStatus = () => {axios.get('http://localhost:3001/logged_in', {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response)
          if (response.data.bookmarks){
            dispatch(retrieve_user_bookmarks(response.data.bookmarks))
          }
        } else {
          handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
  }

  const handleLogin = (data) => {
    if (data.status === "created"){
      isLoggedInSet(true)
      userSet(data.user)
      dispatch(user_logged_in_action(data.user))
    } else {
      console.log("handling login")
      isLoggedInSet(true)
      userSet(data.data.user)
      dispatch(user_logged_in_action(data.data.user))
    }
  }

  const handleLogout = () => {
    console.log("handling logout")
    isLoggedInSet(false)
    userSet(null)
    dispatch(user_logged_out_action())
    dispatch(get_city_state(null))
  }

    const currentSubmission = useSelector(state => state.submitted)
    console.log("current submitted info is: ", currentSubmission)
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact path='/about'
              render={props => (<About {...props} />)}
            />
            <Route 
              exact path='/login' 
              render={props => (<Login {...props} handleLogin={handleLogin} loggedInStatus={isLoggedIn}/>)}
            />
            <Route 
              exact path='/signup' 
              render={props => (<Signup {...props} handleLogin={handleLogin} loggedInStatus={isLoggedIn}/>)}
            />
            <Route
              exact path='/local_news'
              render={props => (<LocalNewsPage {...props} handleLogout={handleLogout} loggedInStatus={isLoggedIn}/>)}
            />
            <Route
              exact path='/your_bookmarks'
              render={props => (<BookmarksPage {...props} handleLogout={handleLogout} loggedInStatus={isLoggedIn} user={user}/>)}
            />
            <Route 
              exact path='/' 
              render={props => (<Home {...props} handleLogout={handleLogout} handleLogin={handleLogin} loggedInStatus={isLoggedIn} user={user} /> )}
            />
          </Switch>
        </BrowserRouter>
    </div>
    )
}

export default App;
