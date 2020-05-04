export function get_city_state(json_result){
    let user_location;
    if (json_result.localityInfo){
            user_location = {
            county: json_result.localityInfo["administrative"][2].name,
            city: json_result.locality,
            state: json_result.principalSubdivision,
            zip: json_result.postcode
        }
    }else{
        user_location = {
            county: json_result.county,
            city: json_result.city,
            state: json_result.state,
            zip: json_result.zip
        }
    }

    return {
        type: "RETRIEVING_CITY_STATE",
        payload: user_location
    }
}

export default function city_state_Reducer(state = null, action){
    switch(action.type) {
        case "RETRIEVING_CITY_STATE":
            
            return action.payload
        default:
            return state
    }
}