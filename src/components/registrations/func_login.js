import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useDispatch} from "react-redux"
import {get_city_state} from "../../redux/CityState.js"

const Login = (props) => {

    const [email, emailSet] = useState('')
    const [ password, passwordSet ] = useState('')
    const [ errors, errorsSet ] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        return (props.loggedInStatus ? redirect() : null)
    }, [])

    const handleChange = (event) => {
        const {name, value} = event.target

        // for example: below will do {email: "abanks229@gmail.com"} depending on what event.target is
        
        if (name === 'email'){
            emailSet(value)
        } else {
            passwordSet(value)
        }
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      let user = {
        email: email,
        password: password
      }
      
      axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
      .then(response => {
        
        if (response.data.logged_in) {
          let hash = {}
          hash['data'] = response.data
          props.handleLogin(hash)
          if (response.data.user.location){
            dispatch(get_city_state(response.data.user.location))
          }
          debugger
          redirect() //line 54
        } else {
          errorsSet(response.data.errors)
        }
      })
      .catch(error => {
        alert("Network error occurred, refer to terminal", errors)
        console.log('api errors:', error)})
    }

    const redirect = () => {
          console.log("I believe when we hit redirect(), we are taken to localhost:3000/")
          props.history.push('/')
    }

    const handleErrors = () => {
        return (
        <div>
            <ul>
            {errors.map(error => {
            return <li key={error}>{error}</li>
            })
            }
            </ul>
        </div>
        )
    }
    // const {email, password} = this.state
    
    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
            <input
                placeholder="email"
                type="text"
                name="email"
                value={email}
                onChange={(event)=>handleChange(event)}
            />
            <input
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={(event)=>handleChange(event)}
            />
            <button placeholder="submit" type="submit">
                Log In
            </button>
            <div>
                or <Link to='/signup'>sign up</Link>
            </div>
            
            </form>
            <div>
            {
                errors ? handleErrors() : null
            }
            </div>
        </div>
        );
    }
export default Login;