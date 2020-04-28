import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const categoryOptions = [
  { key: 'business', value: 'business', text: 'Business 💼' },
  { key: 'entertainment', value: 'entertainment', text: 'Entertainment 📺' },
  { key: 'health', value: 'health', text: 'Health ⚕️🏥' },
  { key: 'science', value: 'science', text: 'Science 🧪' },
  { key: 'sports', value: 'sports', text: 'Sports 🏈' },
  { key: 'technology', value: 'technology', text: 'Technology 🖥️' },

]

class SelectCategory extends React.Component {

  constructor(){
    super()
    this.state ={
      categoryName: 'None'
    }
  }

  onInputChange(event, categories) {
    var match;
    if (event.target.textContent){
      match = categories.filter( country_obj => country_obj.text === (event.target.textContent))
    } else {
      match = categories.filter( country_obj => country_obj.text.includes(event.target.value))
    }
    
    let callBackCategory = match[0].value

    this.props.updateCateg(callBackCategory)
  }

  render() {
    return (
      <Dropdown onChange={(event) => this.onInputChange(event, categoryOptions)} placeholder='Select Category' options={categoryOptions} search selection/>
    )
  }
}

export default SelectCategory