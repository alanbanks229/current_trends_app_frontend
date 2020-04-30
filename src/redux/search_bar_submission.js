
export function input_submission_action(event, data_from_search) {

    return {
      type: "SUBMIT_QUERY",
      payload: data_from_search

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
