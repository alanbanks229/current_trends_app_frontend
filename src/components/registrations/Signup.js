import React, { Component } from 'react';
import axios from 'axios';

import swal from '@sweetalert/with-react';
import './signup.css'
import {Link} from 'react-router-dom'


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: '',
      errorsExist: false,
     };
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password, password_confirmation} = this.state
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
    axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        this.props.handleLogin(response.data)
        swal("Congrats!", "🙌Your account is created!🙌", "success");
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors,
          errorsExist: true
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
redirect = () => {
  debugger
    this.props.history.push('/')
  }
handleErrors = () => {
  this.setState({errorsExist: false})
  swal({
    text: "Account Creation Error: (See Below)",
    icon: "error",
    buttons: {
      cancel: "Close",
    },
    content: (
      <div>
        <br/>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul> 
      </div>
    )
  })
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul> 
      </div>
    )
  }
render() {
    const {username, email, password, password_confirmation} = this.state
return (
<>

        <>
      <form onSubmit={this.handleSubmit}>
          <div className="container">

            <div className="signup_header_div">
              <h1>Register</h1>
              <p>Please fill in this form to create an account.</p>
              <>
                {
                  this.state.errorsExist ? this.handleErrors() : null
                }
                {
                  this.state.errors ? (      <div>
                    <ul>{this.state.errors.map((error) => {
                      return <li className="li-signup-errors" key={error}>{error}</li>
                    })}</ul> 
                  </div>) : (null)
                }
              </>
            </div>
            <>
              <hr/>
              <label for="username"><b>Username</b></label>
              <input
                placeholder="username"
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <label for="email"><b>Email</b></label>
              <input
                placeholder="email"
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              <label for="password"><b>Password</b></label>
              <input 
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <label for="password_confirmation"><b>Password Confirmation</b></label>
              <input
                placeholder="password confirmation"
                type="password"
                name="password_confirmation"
                value={password_confirmation}
                onChange={this.handleChange}
              />
              <hr/>
              <div className="div-with-submit">
              <button placeholder="submit" type="submit" className="registerbtn">
                Sign Up
              </button>
              </div>
              <div class="container signin">
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <Link to="/about">About</Link>
              </div>
            </>
          </div>
      </form>
      </>
</>
    );
  }
}
export default Signup;