import {applyMiddleware} from 'redux'
import {useDispatch} from "react-redux"
import store from './index.js'

  export function geolocation_unavailable() {
      return {
          type: "UNAVAILABLE",
          payload: null
      }
  }

  export function received_location(event, data){
    let coordinates = {lat: data.latitude, long: data.longitude} 
    return {
        type: "GOT_GOODS",
        payload: coordinates
    }
  }

//WHY AM I NOT ABLE TO USE AN OBJECT AS INITIAL STATE
export default function geolocationReducer ( state = null, action){
    switch(action.type) {
            case "UNAVAILABLE":
                return state
            case "GOT_GOODS":
                // debugger
                return action.payload
            default:
                return state
    }
}