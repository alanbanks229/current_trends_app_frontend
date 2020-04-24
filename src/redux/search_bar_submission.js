//I think this action should take in the filters as well as the input
export function input_submission_action(event, data_from_search) {
    event.preventDefault()
    debugger
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
        return action.payload
      default:
        return value
    }
  }