export function new_bookmark_action(bookmark_obj = null){
    return {
        type: "NEW_BOOKMARK",
        payload: bookmark_obj.id
    }
}


export function remove_bookmark_action(bookmark_id){
    return {
        type: "REMOVE_BOOKMARK",
        payload: bookmark_id
    }
}

export function retrieve_user_bookmarks(bookmark_ids){
    return {
        type: "RETRIEVED_BOOKMARKS",
        payload: bookmark_ids
    }
}

//For some reason this reducer is getting called after I submit search form...
//this is bad because the current user is returning to null if they are already logged in.
export default function bookmark_reducer( value = [], action){
    
    switch(action.type){
        case "NEW_BOOKMARK":
    
            if (value){
                return [...value, action.payload]
            } else {
                return [action.payload]
            }
        case "REMOVE_BOOKMARK":
            //need to splice where the action.payload is equal to the index where the same value is located.
            let match = value.indexOf(action.payload)
            let newState = [...value]
            newState.splice(match, 1)
            return newState
        case "RETRIEVED_BOOKMARKS":
            debugger
            return action.payload
        default:
            return null
    }
}