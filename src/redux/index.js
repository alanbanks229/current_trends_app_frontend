import {createStore, applyMiddleware, combineReducers, compose} from "redux"
import thunk from "redux-thunk";
import inputFieldReducer from './update_search.js'
import submissionReducer from './search_bar_submission.js'
/* 
Import all of your reducer functions here for example:

    import countReducer from "./count"
    import favoriteThingsReducer from "./favoriteThings"
    import youTubeVideoReducer from "./youTubeVideo"

*/


const rootReducer = combineReducers({
  inputFieldReducer,
  submissionReducer
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
