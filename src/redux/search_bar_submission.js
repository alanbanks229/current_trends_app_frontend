//I think this action should take in the filters as well as the input
export function input_submission_action(event, data_from_search) {
    // event.preventDefault()
    return {
      type: "SUBMIT_QUERY",
      payload: data_from_search

    }
  }


// The payload here needs to include
// endpoint (Top-headlines, everything)
// sources (optional, or [arr, of, sources])
// sort-by (default[publishedAt], or popularity/relevancy/publishedAt )
// 
export default function submissionReducer( value = '', action ) {
    switch(action.type) {
      case "SUBMIT_QUERY":
        debugger
        //{input: "Corona", endpoint: "top-headlines", country: "us"}
        // input: "Corona"
        // endpoint: "top-headlines"
        // country: "us"
        // __proto__: Object
        return action.payload
      default:
        return value
    }
  }


  
  // navigator.geolocation.getCurrentPosition(function success(pos) {
  //   var crd = pos.coords;
  //   console.log('Your current position is:');
  //   console.log(`Latitude : ${crd.latitude}`);
  //   console.log(`Longitude: ${crd.longitude}`);
  //   console.log(`More or less ${crd.accuracy} meters.`);
  // }, function error(err) {
  //   console.log(`ERROR(${err.code}): ${err.message}`);
  // }, {
  //   enableHighAccuracy: true,
  //   timeout: 3000,
  //   maximumAge: 0
  // }).then(response => dispatch({type: 'LOCATION_RECEIVED', payload: response}))