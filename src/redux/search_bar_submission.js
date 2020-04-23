export function input_submission_action(event) {
    event.preventDefault()
    debugger
    return {
      type: "SUBMIT_QUERY",
      payload: event.target.children[0].value

    }
  }
  
export default function submissionReducer( value = '', action ) {
    switch(action.type) {
      case "SUBMIT_QUERY":
        return action.payload
      default:
        return value
    }
  }