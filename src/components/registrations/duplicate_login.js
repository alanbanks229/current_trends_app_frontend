import React, {useEffect, useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Current Trends
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




export default function Login(props) {

  const [ email, emailSet ] = useState('')

  const [ password, passwordSet ] = useState('')

  const [ errors, errorsSet ] = useState('')

  useEffect(() => {
    debugger
    return props.loggedInStatus ? redirect() : null
  }, [])


  const classes = useStyles();

  const redirect = () => {
    console.log("I believe when we hit redirect(), we are taken to localhost:3000/")
    
    //props.history.push('/')
  }

    const handleChange = (event) => {
      // const {name, value} = event.target

      // for example: below will do {email: "abanks229@gmail.com"} depending on what event.target is
      debugger
      if (event.target.name === 'email'){
        emailSet(event.target.value)
      } else {
        passwordSet(event.target.value)
      }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        let user = {
          email: email,
          password: password
        }

        axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
        .then(response => {
          // debugger
          if (response.data.logged_in) {
            let hash = {}
            hash['data'] = response.data
            props.handleLogin(hash)
            redirect() //line 54
          } else {
              errorsSet(response.data.errors)
          }
        })
        .catch(error => {
          alert("Network error occurred, refer to terminal", errors)
          console.log('api errors:', error)})
    };



    console.log("hello", email, password)
    debugger

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon /> 
          {/* use your current trends logo here */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="text"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            value={password}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                {"Back to Search"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" to='/signup'>>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}