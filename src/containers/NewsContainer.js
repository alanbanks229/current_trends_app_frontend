import React, {useEffect} from 'react'
import NewsCards from "../components/NewsCards.js"

const NewsContainer = ({search_submitted}) => {

//In news container it will receive the form submitted and from the filters applied
//we will render the specific news cards.

    let top_headlines;
    let everything;

    

    const TOP_HEADLINES_TRUMP = 'https://newsapi.org/v2/top-headlines?' +
    'q=trump&' +
    'apiKey=API_KEY'

    const POPULAR_APPLE_ARTICLES = 'https://newsapi.org/v2/everything?' + 
                                'q=apple&' +
                                'from=2020-04-22&' +
                                'to=2020-04-22&' +
                                'sortBy=popularity' +
                                'apiKey=c2fc6bdd3bcb4a139b303cd57af45cc2';



    // componentDidMount(){
    //     fetch('http://localhost:3000/pokemon')
    //         .then(res => res.json())
    //         .then(data => {
    //         console.log(data)
    //         this.setState({
    //             entireCollection: data,
    //         })
    //         })
    //         .catch(error => alert(error.message))
    // }
    
    debugger
    return (
        <div className="NewsContainer">
            <NewsCards />
        </div>
    )
}

export default NewsContainer