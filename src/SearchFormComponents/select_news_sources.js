//All articles published by WSJ and NY Times

// Can't mix this param with Country Or Category Param


import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const newsOptions = [

    { key: 'abc-news', value: 'abc-news', text: 'ABC News'},
    { key: 'abc-news-au', value: 'abc-news-au', text: 'ABC News (AU)'},
    { key: 'ars-technica', value: 'ars-technica', text: 'Ars Technica'},
    { key: 'associated-press', value: 'associated-press', text: 'Associated Press'},
    { key: 'axios', value: 'axios', text: 'Axios'},
    { key: 'bbc-news', value: 'bbc-news', text: 'BBC News'},
    { key: 'bbc-sport', value: 'bbc-sport', text: 'BBC Sports'},
    { key: 'bleacher-report', value: 'bleacher-report', text: 'Bleacer Report'},
    { key: 'bloomberg', value: 'bloomberg', text: 'Bloomberg'},
    { key: 'breitbart-news', value: 'breitbart-news', text: 'Breitbart News'},
    { key: 'business-insider', value: 'business-insider', text: 'Business Insider'},
    { key: 'buzzfeed', value: 'buzzfeed', text: 'Buzzfeed'},
    //Need to get to the letter C's  XD
]

class SelectCountry extends React.Component {

  constructor(){
    super()
    this.state ={
      countryName: 'United States',
      countryCode: 'us'
    }
  }

  onInputChange(event, newsOptions) {
    var match;
    if (event.target.textContent){
      match = newsOptions.filter( news_obj => news_obj.text === (event.target.textContent))
    } else {
      match = newsOptions.filter( news_obj => news_obj.text.includes(event.target.value))
    }
    debugger
    let newsSourceCallBack = match[0].value
    this.setState({
      countryName: match[0].text,
      countryCode: match[0].value
    })
    this.props.countrySet(newsSourceCallBack)
  }

  render() {
    return (
      <>
      <p>Default: (All)</p>
      <Dropdown onChange={(event) => this.onInputChange(event, newsOptions)} placeholder='Select Sources' options={newsOptions} fluid multiple search selection/>
      </>
    )
  }
}
  


export default SelectCountry
