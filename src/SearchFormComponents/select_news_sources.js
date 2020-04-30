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
    { key: 'cbc-news', value: 'cbc-news', text: 'CBC News'},
    { key: 'cbs-news', value: 'cbs-news', text: 'CBS News'},
    { key: 'cnbc', value: 'cnbc', text: 'CNBC'},
    { key: 'cnn', value: 'cnn', text: 'CNN'},
    { key: 'crypto-coins-news', value: 'crypto-coins-news', text: 'Crypto Coins News'},
    { key: 'engadget', value: 'engadget', text: 'Engadget'},
    { key: 'entertainment-weekly', value: 'entertainment-weekly', text: 'Entertainment Weekly'},
    { key: 'espn', value: 'espn', text: 'ESPN'},
    { key: 'fox-news', value: 'fox-news', text: 'Fox News'},
    { key: 'fox-sports', value: 'fox-sports', text: 'Fox Sports'},
    { key: 'google-news', value: 'google-news', text: 'Google News'},
    { key: 'hacker-news', value: 'hacker-news', text: 'Hacker News'},
    { key: 'ign', value: 'ign', text: 'IGN'},
    { key: 'independent', value: 'independent', text: 'Independent'},
    { key: 'mashable', value: 'mashable', text: 'Mashable'},
    { key: 'medical-news-today', value: 'medical-news-today', text: 'Medical News Today'},
    { key: 'msnbc', value: 'msnbc', text: 'MSNBC'},
    { key: 'mtv-news', value: 'mtv-news', text: 'MTV News'},
    { key: 'national-geographic', value: 'national-geographic', text: 'National Geographic'},
    { key: 'national-review', value: 'national-review', text: 'National Review'},
    { key: 'nbc-news', value: 'nbc-news', text: 'NBC News'},
    { key: 'news24', value: 'news24', text: 'News24'},
    { key: 'new-scientist', value: 'new-scientist', text: 'New Scientist'},
    { key: 'newsweek', value: 'newsweek', text: 'Newsweek'},
    { key: 'new-york-magazine', value: 'new-york-magazine', text: 'New York Magazine'},
    { key: 'next-big-future', value: 'next-big-future', text: 'Next Big Future'},
    { key: 'nfl-news', value: 'nfl-news', text: 'NFL News'},
    { key: 'nhl-news', value: 'nhl-news', text: 'NHL News'},
    { key: 'politico', value: 'politico', text: 'Politico'},
    { key: 'polygon', value: 'polygon', text: 'Polygon'},
    { key: 'recode', value: 'recode', text: 'Recode'},
    { key: 'reddit-r-all', value: 'reddit-r-all', text: 'Reddit /r/all'},
    { key: 'reuters', value: 'reuters', text: 'Reuters'},
    { key: 'talksport', value: 'talksport', text: 'TalkSport'},
    { key: 'techcrunch', value: 'techcrunch', text: 'TechCrunch'},
    { key: 'techradar', value: 'techradar', text: 'TechRadar'},
    { key: 'the-american-conservative', value: 'the-american-conservative', value: 'The American Conservative'},
    { key: 'the-hill', value: 'the-hill', text:'The Hill'},
    { key: 'the-hindu', value: 'the-hindu', text: 'The Hindu'},
    { key: 'the-huffington-post', value: 'the-huffington-post', text: 'The Huffington Post'},
    { key: 'the-irish-times', value: 'the-irish-times', text: 'The Irish Times'},
    { key: 'the-jerusalem-post', value: 'the-jerusalem-post', text: 'The Jerusalem Post'},
    { key: 'the-lad-bible', value: 'the-lad-bible', text: 'The Lad Bible'},
    { key: 'the-next-web', value: 'the-next-web', text: 'The Next Web'},
    { key: 'the-times-of-india', value: 'the-times-of-india', text: 'The Times of India'},
    { key: 'the-verge', value: 'the-verge', text: 'The Verge'},
    { key: 'the-wall-street-journal', value: 'the-wall-street-journal', text: 'The Wall Street Journal'},
    { key: 'the-washington-post', value: 'the-washington-post', text: 'The Washington Post'},
    { key: 'the-washington-times', value: 'the-washington-times', text: 'The Washington Times'},
    { key: 'time', value: 'time', text: 'Time'},
    { key: 'usa-today', value: 'usa-today', text: 'USA Today'},
    { key: 'vice-news', value: 'vice-news', text: 'Vice News'},
    { key: 'wired', value: 'wired', text: 'Wired'}

]

class SelectNewsSource extends React.Component {

  constructor(){
    super()
    this.state = {
      selected_source: '',
      news_sources: []

    }
    
  }

  

  onInputChange(event, newsOptions) {
    
    if (event.target.textContent){
        // this.setState(news_sources => ({
        //   news_sources: [...news_sources, event.target.textContent]
        // }))
        debugger
        this.setState({
          news_sources: [...this.state.news_sources, event.target.textContent]
        })
        let updatedState = [...this.state.news_sources, event.target.textContent]
        let call_back_sources = newsOptions.filter(newsObj => updatedState.includes(newsObj.text)).map(obj => obj.value)

        this.props.updateNewsSource(call_back_sources)
        return

    } else if (event.target.className === "delete icon") {
        debugger
        let filteredArray = this.state.news_sources.filter(news => news !== event.target.parentNode.textContent)
        this.setState({news_sources: filteredArray})
        let call_back_sources = newsOptions.filter(newsObj => filteredArray.includes(newsObj.text)).map(obj => obj.value)

        this.props.updateNewsSource(call_back_sources)
        return
    } else {
      let news_node_collection = event.target.parentNode.getElementsByTagName('a')
      //converting node collection into array... cuz we have to.
      
      // also these are labels...
      let node_tags = [...news_node_collection]
      let stringified_news_arr_of_names = node_tags.map( news_source => news_source.textContent)
      let matches = newsOptions.filter(newsObj => stringified_news_arr_of_names.includes(newsObj.text))
      let call_back_sources = matches.map( obj => obj.value)
      this.setState({news_sources: call_back_sources})
      debugger
      this.props.updateNewsSource(call_back_sources)
    }
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
  


export default SelectNewsSource
