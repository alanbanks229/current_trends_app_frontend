import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const languageOptions = [
  { key: 'ar', value: 'ar', text: 'Arabic' },
  { key: 'de', value: 'de', text: 'German' },
  { key: 'en', value: 'en', text: 'English' },
  { key: 'es', value: 'es', text: 'Spanish' },
  { key: 'fr', value: 'fr', text: 'French' },
  { key: 'he', value: 'he', text: 'Hebrew' },
  { key: 'it', value: 'it', text: 'Italian' },
  { key: 'nl', value: 'nl', text: 'Dutch' },
  { key: 'no', value: 'no', text: 'Norwegian' },
  { key: 'pt', value: 'pt', text: 'Portuguese' },
  { key: 'ru', value: 'ru', text: 'Russian' },
  { key: 'se', value: 'se', text: 'Sami' },
  { key: 'zh', value: 'zh', text: 'Chinese' }
]

class SelectLanguage extends React.Component {

  constructor(){
    super()
    this.state ={
        langName: '',
        langCode: ''
    }
  }

  onInputChange(event, languages) {
    var match;
    if (event.target.textContent){
      match = languages.filter( country_obj => country_obj.text === (event.target.textContent))
    } else {
      match = languages.filter( country_obj => country_obj.text.includes(event.target.value))
    }
    debugger
    let callBackLangCode = match[0].value
    this.setState({
      langName: match[0].text,
      langCode: match[0].value
    })
    this.props.langSet(callBackLangCode)
  }

  render() {
    return (
      <Dropdown onChange={(event) => this.onInputChange(event, languageOptions)} 
                placeholder='Select Language' 
                options={languageOptions} search selection/>
    )
  }
}
  


export default SelectLanguage
