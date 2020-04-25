import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux"

import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import About from './components/About'

// import './App.css';

const App = (props) => {

  const [ user, userSet ] = useState({})
  const [ isLoggedIn, isLoggedInSet ] = useState(false)


  useEffect(() => {
    loginStatus()
  }, [])
  
  const loginStatus = () => {axios.get('http://localhost:3001/logged_in', {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response)
        } else {
          handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
  }

  const handleLogin = (data) => {
    isLoggedInSet(true)
    userSet(data.user)
  }

  const handleLogout = () => {
    isLoggedInSet(false)
    userSet({})
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
              exact path='/' 
              render={props => (<Home {...props} handleLogout={handleLogout} handleLogin={handleLogin} loggedInStatus={isLoggedIn}/>)}
            />
            <Route 
              exact path='/login' 
              render={props => (<Login {...props} handleLogin={handleLogin} loggedInStatus={isLoggedIn}/>)}
            />
            <Route 
              exact path='/signup' 
              render={props => (<Signup {...props} handleLogin={handleLogin} loggedInStatus={isLoggedIn}/>)}
            />
          </Switch>
        </BrowserRouter>
    </div>
    )
}


// function App(props) {
//   const currentSubmission = useSelector(state => state.submitted)
//   console.log("current submitted info is: ", currentSubmission)
//   return (
//     <div className="App">
//       <h1>Current Trends</h1>
//       {/* <button onClick={() => retrieveTopNewsUSA()}>Top Headlines USA</button> */}
//       <br></br>
//       <ControlledForm />
//       <FavoritesContainer />
//       <br></br>
//       <NewsContainer search_submitted={currentSubmission}/>
//     </div>
//   );
// }

export default App;
