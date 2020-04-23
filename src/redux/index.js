import {createStore, applyMiddleware, combineReducers, compose} from "redux"
import thunk from "redux-thunk";
import inputFieldReducer from './update_search.js'
import submissionReducer from './search_bar_submission.js'

//Make some good key names for your reducers
const rootReducer = combineReducers({
  input_field: inputFieldReducer,
  submitted: submissionReducer
  // count: countReducer,
  // favoriteTHings: favoriteThingsReducer,
  // youTubeVideo: youTubeVideoReducer
})


//we need {compose} to combine applyMiddleWare and window redux helper in our store.
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => console.log(store.getState()))

export default store
