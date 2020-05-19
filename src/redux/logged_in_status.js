export function user_logged_in_action(user_info = null){
    return {
        type: "LOGGED_IN",
        payload: user_info
    }
}

export function user_logged_out_action(){
    return {
        type: "LOGGED_OUT",
        payload: null
    }
}

//For some reason this reducer is getting called after I submit search form...
//this is bad because the current user is returning to null if they are already logged in.

//hacky way for now to prevent currentUser to default to null
// I'm not even dispatching the event here how the hell is it getting here.
export default function user_logged_reducer( value = null, action){
    debugger
    switch(action.type){
        case "LOGGED_IN":
            return action.payload
        case "LOGGED_OUT":
            return null
        case "UPDATE_INPUT_FIELD_ACTION":
            return value
        case "RETRIEVING_CITY_STATE":
            return value
        case "GOT_GOODS":
            return value
        case "UNAVAILABLE":
            return value
        case "SUBMIT_QUERY":
            return value
        case "NEW_BOOKMARK":
            return value
        case "REMOVE_BOOKMARK":
            return value
        case "RETRIEVED_BOOKMARKS":
            return value
        case "UPDATE_FILTER":
            return value
        default:
            return null
    }
}