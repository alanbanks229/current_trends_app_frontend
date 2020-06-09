import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import './login.css'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      errors: ''
     };
  }
    componentDidMount() {
      console.log("Inside component did mount", this.props.loggedInStatus)
        return this.props.loggedInStatus ? this.redirect() : null
    }
    handleChange = (event) => {
        const {name, value} = event.target

        // for example: below will do {email: "abanks229@gmail.com"} depending on what event.target is
        this.setState({
        [name]: value
        })
    };

    handleSubmit = (event) => {
      event.preventDefault()
      const { email, password} = this.state
      let user = {
        email: email,
        password: password
      }
      // axios.post('http://localhost:3001/login', {user}, {withCredentials: true})   https://current-trends-app-api.herokuapp.com/login
      axios.post('http://localhost:3001/login', {user}, {withCredentials: false})
      .then(response => {
        // debugger
        if (response.data.logged_in) {
          let hash = {}
          hash['data'] = response.data
          this.props.handleLogin(hash)
          this.redirect() //line 54
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => {
        alert("Network error occurred, refer to terminal", this.state.errors)
        console.log('api errors:', error)})
    };

    redirect = () => {
          this.props.history.push('/')
    }

    handleErrors = () => {
        return (
        <div>
            <ul>
            {this.state.errors.map(error => {
            return <li className="li-signup-errors" key={error}>{error}</li>
            })
            }
            </ul>
        </div>
        )
    }

    render() {
    const {email, password} = this.state
    
    return (
      <>

      <>
    <form onSubmit={this.handleSubmit}>
        <div className="container">

          <div className="signup_header_div">
            <h1>Login</h1>
            <p>Fill in this form to login to your account</p>
            <>
            {
            this.state.errors ? this.handleErrors() : null
            }
            </>
          </div>
          <>
            <hr/>
            <label for="email"><b>Email</b></label>
            <input
              placeholder="username"
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
            <hr/>
            <div className="div-with-submit">
            <button placeholder="submit" type="submit" className="registerbtn">
              Login
            </button>
            </div>
            <div class="container signin">
            <p>Don't have an account? <Link to="/signup">Sign Up!</Link></p>
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
export default Login;