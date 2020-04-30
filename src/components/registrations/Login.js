import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

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
      
      axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
      .then(response => {
        debugger
        if (response.data.logged_in) {
          let hash = {}
          hash['data'] = response.data
          this.props.handleLogin(hash)
          this.redirect() //line 50
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
          console.log("I believe when we hit redirect(), we are taken to localhost:3000/")
          this.props.history.push('/')
    }

    handleErrors = () => {
        return (
        <div>
            <ul>
            {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
            })
            }
            </ul>
        </div>
        )
    }

    render() {
    const {email, password} = this.state
    
    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={this.handleSubmit}>
            <input
                placeholder="email"
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
            />
            <input
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
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
                this.state.errors ? this.handleErrors() : null
            }
            </div>
        </div>
        );
    }
}
export default Login;