// THE STORE

import {createStore, applyMiddleware, combineReducers, compose} from "redux"
import thunk from "redux-thunk";
import inputFieldReducer from './update_search.js'
import submissionReducer from './search_bar_submission.js'
import geolocationReducer from './Geolocation.js'
import city_state_Reducer from './CityState.js'
import user_logged_reducer from './logged_in_status.js'
import bookmark_reducer from './bookmarks.js'

//Make some good key names for your reducers
const rootReducer = combineReducers({
  input_field: inputFieldReducer,
  submitted: submissionReducer,
  coordinates: geolocationReducer,
  user_location: city_state_Reducer,
  current_user: user_logged_reducer,
  user_bookmark_ids: bookmark_reducer
})


//we need {compose} to combine applyMiddleWare and window redux helper in our store.
const store = createStore(
  rootReducer,
  compose(
    // applyMiddleware(thunk)
    // Need to comment out the below so others can see the app in deployment, since everyone does not have redux dev tools extension
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => console.log(store.getState()))

export default store
