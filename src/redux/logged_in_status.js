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
export default function user_logged_reducer( value = null, action){
    debugger
    switch(action.type){
        case "LOGGED_IN":
            return action.payload
        case "LOGGED_OUT":
            return null

            //hacky way for now to prevent currentUser to default to null
            // I'm not even dispatching the event here how the hell is it getting here.
        case "SUBMIT_QUERY":
            return value
        case "NEW_BOOKMARK":
            return value
        case "REMOVE_BOOKMARK":
            return value
        case "RETRIEVED_BOOKMARKS":
            return value
        default:
            return null
    }
}