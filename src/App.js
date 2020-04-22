import React from 'react';
import {useSelector, useDispatch} from "react-redux"

import {update_input_field_action} from "./redux/update_search.js"

// import { CounterComponent } from './features/counter/Counter';
// import './App.css';

function App(props) {
  
  const currentSearch = useSelector(state => state.inputFieldReducer)
  const dispatch = useDispatch()
  console.log("currentSearch is : ", currentSearch)
  return (
    <div className="App">
      <h1>Current Trends</h1>
      <h3>Currently you typed: {currentSearch}</h3>
      <br></br>
      <form id="search_form" /*onSubmit={(event) => submission(event)} */>
          <input type="text" onChange={(e) => {
                                              dispatch(update_input_field_action(e))
                                              }}/>
          <input type="submit" value="Search"/>
      </form>
    </div>
  );
}

export default App;
