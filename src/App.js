import React from 'react';
import {useSelector, useDispatch} from "react-redux"

import {update_input_field_action} from "./redux/update_search.js"
import {input_submission_action} from "./redux/search_bar_submission.js"
import FavoritesContainer from "./containers/FavoritesContainer.js"
import NewsContainer from "./containers/NewsContainer.js"
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
      <form id="search_form" onSubmit={(event) => input_submission_action(event)}>
          <input type="text" onChange={(e) => dispatch(update_input_field_action(e))}/>
          <input type="submit" value="Search"/>
      </form>
      <FavoritesContainer />
      <br></br>
      <NewsContainer />
    </div>
  );
}

export default App;
