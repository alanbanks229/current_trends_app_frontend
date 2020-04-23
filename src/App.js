import React from 'react';
import {useSelector, useDispatch} from "react-redux"

import {update_input_field_action} from "./redux/update_search.js"
import {input_submission_action} from "./redux/search_bar_submission.js"
import FavoritesContainer from "./containers/FavoritesContainer.js"
import NewsContainer from "./containers/NewsContainer.js"

// import { CounterComponent } from './features/counter/Counter';
// import './App.css';

import SelectCountry from "./SearchFormComponents/select_country.js"

function App(props) {
  
  const currentSearch = useSelector(state => state.input_field)
  const currentSubmission = useSelector(state => state.submission)

  const dispatch = useDispatch()
  console.log("currentSearch is : ", currentSearch)
  return (
    <div className="App">
      <h1>Current Trends</h1>
      <h3>Currently you typed: {currentSearch}</h3>
      {/* <button onClick={() => retrieveTopNewsUSA()}>Top Headlines USA</button> */}
      <br></br>
      
      <form id="search_form" onSubmit={(event) => dispatch(input_submission_action(event))}>
          <input type="text" onChange={(event) => dispatch(update_input_field_action(event))}/>
          <div className="radio_endpoint">
            <label>
              <input type="radio" value="top-headlines" name="endpoint" checked/>
              Top Headlines
            </label>
          </div>
          <div className="radio_endpoint">
            <label>
              <input type="radio" value="everything" name="endpoint" />
              Everything
            </label>
          </div>
          <label>
            Search News By Country
            <SelectCountry />
          </label>
          
          
          <input type="submit" value="Search"/>
      </form>

      <FavoritesContainer />
      <br></br>
      <NewsContainer search_submitted={currentSubmission}/>
    </div>
  );
}

export default App;
