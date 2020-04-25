import {applyMiddleware} from 'redux'
import {useDispatch} from "react-redux"
import store from './index.js'

// //BigDataCloud API KEY 08f39e5268b84df2a3d602cce60a519e
// export function geolocation_action(event, result){
//     debugger
//     console.log("result of geolocation_action",result)
//     return result[0]

// }

function requestGeolocation() {
    return function(dispatch) {
      navigator.geolocation.getCurrentPosition(function(position) {
          debugger
        dispatch({
          type: 'RECEIVE_LOCATION',
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            inProgress: false,
          },
        });
      });
    };
  }
  
  export function geolocation_action() {
    if (!navigator.geolocation) {
      return store.dispatch({
        type: 'RECEIVE_LOCATION'
      });
    }
    return store.dispatch(requestGeolocation());
  }

  export function geolocation_unavailable() {
      return {
          type: "UNAVAILABLE",
          payload: null
      }
  }

  export function received_location(event, data, lat, long){
    let coordinate1 = {lat: data.latitude} 
    let coordinate2 = {long: data.longitude}
    debugger
    return {
        type: "GOT_GOODS",
        payload: [coordinate1, coordinate2]
    }
  }

//WHY AM I NOT ABLE TO USE AN OBJECT AS INITIAL STATE
export default function geolocationReducer ( state = null, action){
    switch(action.type) {
            case "UNAVAILABLE":
                return state
            case "GOT_GOODS":
                debugger
                return [action.payload]
            default:
                return state
    }
}