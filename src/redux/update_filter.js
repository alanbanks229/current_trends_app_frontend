//This will be called when some attribute changes inside of the
// Filter component button in our search bar.

export function update_filter_action(event) {
    return {
      type: "UPDATE_FILTER",
      payload: event.target.value
    }
  }
  
export default function filterReducer( input_field = '', action ) {
    switch(action.type) {
      case "UPDATE_FILTER":
        return action.payload
      default:
        return input_field
    }
  }