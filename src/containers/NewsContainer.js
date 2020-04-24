import React, {useEffect, useState} from 'react'
import NewsCards from "../components/NewsCards.js"

const NewsContainer = ({search_submitted}) => {

//In news container it will receive the form submitted and from the filters applied
//we will render the specific news cards.

    const [ searchparams, searchparamsSet ] = useState(search_submitted)

    const [ cards, cardsSet ] = useState(null)

    const TOP_HEADLINES_TRUMP = 'https://newsapi.org/v2/top-headlines?' +
    'q=trump&' +
    'apiKey=API_KEY'

    const POPULAR_APPLE_ARTICLES = 'https://newsapi.org/v2/everything?' + 
                                'q=apple&' +
                                'from=2020-04-22&' +
                                'to=2020-04-22&' +
                                'sortBy=popularity' +
                                'apiKey=c2fc6bdd3bcb4a139b303cd57af45cc2';


    useEffect(() => {
        // debugger
        fetchNews(search_submitted)
    }, [search_submitted])
    
    function fetchNews(search_params) {
        // debugger
        if (search_params !== ""){
            const api_key = 'c2fc6bdd3bcb4a139b303cd57af45cc2'
            let url = `https://newsapi.org/v2/${search_params.endpoint}?q=${search_params.input}&country=${search_params.country}&apiKey=${api_key}`
            // debugger
            fetch(url)
                .then(res => res.json())
                .then(data => renderCards(data))
        } 

    }

    function renderCards(data){
        console.log(data)
        // debugger
        if (data){
            if (data.status === 'ok'){
                cardsSet(data)
            } else {
                return null
            }
        } 
        return null
    }


    return (

        <div className="NewsContainer">
            {cards ? 
            <div className="total_num_articles_container">
                <h3 className="numberResults">Total Results: {cards.totalResults}</h3>
            </div>
            : 
            null}

            {cards ? 
            <div className="flex">
                {cards.articles.map((article, i) => 
                    (
                    <NewsCards 
                        source={article.source.name}
                        author={article.author}
                        title={article.title}
                        desc={article.description}
                        url={article.url}
                        image={article.urlToImage}
                        published={article.publishedAt}
                        content={article.content}
                        key={i}
                        />
                    )
                )}
            </div>
            : 
            null}

        </div>
    )
}

export default NewsContainer