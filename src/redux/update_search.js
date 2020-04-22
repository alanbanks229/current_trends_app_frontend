export function update_input_field_action(event) {
    return {
      type: "UPDATE_INPUT_FIELD_ACTION",
      payload: event.target.value
    }
  }
  
export default function inputFieldReducer( input_field = '', action ) {
    switch(action.type) {
      case "UPDATE_INPUT_FIELD_ACTION":
        return action.payload
      default:
        return input_field
    }
  }