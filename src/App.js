import React from 'react';
import {useSelector, useDispatch} from "react-redux"

import FavoritesContainer from "./containers/FavoritesContainer.js"
import NewsContainer from "./containers/NewsContainer.js"
import ControlledForm from "./SearchFormComponents"



// import './App.css';

function App(props) {
  const currentSubmission = useSelector(state => state.submitted)
  console.log("current submitted info is: ",currentSubmission)
  return (
    <div className="App">
      <h1>Current Trends</h1>
      {/* <button onClick={() => retrieveTopNewsUSA()}>Top Headlines USA</button> */}
      <br></br>
      <ControlledForm />
      <FavoritesContainer />
      <br></br>
      <NewsContainer search_submitted={currentSubmission}/>
    </div>
  );
}

export default App;
