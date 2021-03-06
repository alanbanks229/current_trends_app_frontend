import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const countryOptions = [
  { key: 'ar', value: 'ar', text: 'Argentina' },
  { key: 'au', value: 'au', text: 'Australia' },
  { key: 'at', value: 'at', text: 'Austria' },
  { key: 'be', value: 'be', text: 'Belgium' },
  { key: 'br', value: 'br', text: 'Brazil' },
  { key: 'bg', value: 'bg', text: 'Bulgaria' },
  { key: 'ca', value: 'ca', text: 'Canada' },
  { key: 'cn', value: 'cn', text: 'China' },
  { key: 'co', value: 'co', text: 'Colombia' },
  { key: 'cu', value: 'cu', text: 'Cuba' },
  { key: 'cz', value: 'cz', text: 'Czech Republic' },
  { key: 'eg', value: 'eg', text: 'Egypt' },
  { key: 'fr', value: 'fr', text: 'France' },
  { key: 'de', value: 'de', text: 'Germany' },
  { key: 'gr', value: 'gr', text: 'Greece' },
  { key: 'hk', value: 'hk', text: 'Hong Kong' },
  { key: 'hu', value: 'hu', text: 'Hungary' },
  { key: 'in', value: 'in', text: 'India' },
  { key: 'id', value: 'id', text: 'Indonesia' },
  { key: 'ie', value: 'ie', text: 'Ireland' },
  { key: 'il', value: 'il', text: 'Israel' },
  { key: 'it', value: 'it', text: 'Italy' },
  { key: 'jp', value: 'jp', text: 'Japan' },
  { key: 'lv', value: 'lv', text: 'Latvia' },
  { key: 'lt', value: 'lt', text: 'Lithuania' },
  { key: 'my', value: 'my', text: 'Malaysia' },
  { key: 'mx', value: 'mx', text: 'Mexico' },
  { key: 'ma', value: 'ma', text: 'Morocco' },
  { key: 'nl', value: 'nl', text: 'Netherlands' },
  { key: 'nz', value: 'nz', text: 'New Zealand' },
  { key: 'ng', value: 'ng', text: 'Nigeria' },
  { key: 'no', value: 'no', text: 'Norway' },
  { key: 'ph', value: 'ph', text: 'Philippines' },
  { key: 'pl', value: 'pl', text: 'Poland' },
  { key: 'pt', value: 'pt', text: 'Portugal' },
  { key: 'ro', value: 'ro', text: 'Romania' },
  { key: 'ru', value: 'ru', text: 'Russia' },
  { key: 'sa', value: 'sa', text: 'Saudi Arabia' },
  { key: 'rs', value: 'rs', text: 'Serbia' },
  { key: 'sg', value: 'sg', text: 'Singapore' },
  { key: 'sk', value: 'sk', text: 'Slovakia' },
  { key: 'si', value: 'si', text: 'Slovenia' },
  { key: 'za', value: 'za', text: 'South Africa' },
  { key: 'kr', value: 'kr', text: 'South Korea' },
  { key: 'se', value: 'se', text: 'Sweden' },
  { key: 'ch', value: 'ch', text: 'Switzerland' },
  { key: 'tw', value: 'tw', text: 'Taiwan' },
  { key: 'th', value: 'th', text: 'Thailand' },
  { key: 'tr', value: 'tr', text: 'Turkey' },
  { key: 'ae', value: 'ae', text: 'UAE' },
  { key: 'ua', value: 'ua', text: 'Ukraine' },
  { key: 'gb', value: 'gb', text: 'United Kingdom' },
  { key: 'us', value: 'us', text: 'United States'},
  { key: 've', value: 've', text: 'Venuzuela' },
]

class SelectCountry extends React.Component {

  constructor(){
    super()
    this.state ={
      countryName: 'United States',
      countryCode: 'us'
    }
  }

  onInputChange(event, countries) {
    var match;
    if (event.target.textContent){
      match = countries.filter( country_obj => country_obj.text === (event.target.textContent))
    } else {
      match = countries.filter( country_obj => country_obj.text.includes(event.target.value))
    }
    debugger
    let callBackCountryCode = match[0].value
    this.setState({
      countryName: match[0].text,
      countryCode: match[0].value
    })
    this.props.countrySet(callBackCountryCode)
  }

  render() {
    return (
      <>
      {this.props.newsChecked ? 
      (<><p style={{color: "red"}}>note: <br/>You cannot combine news source and country filter.<br/>Uncheck news source to filter by country</p>
      <Dropdown placeholder='Select Country' disabled selection/></>)
      : 
      (<>
      <Dropdown onChange={(event) => this.onInputChange(event, countryOptions)} placeholder='Select Country' options={countryOptions} search selection/></>)}
      </>
    )
  }
}
  


export default SelectCountry
