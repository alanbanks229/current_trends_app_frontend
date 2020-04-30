import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import NewsCards from "../components/NewsCards.js"

const NewsContainer = ({search_submitted, user_location}) => {

    // theoretically what I found is if I wanted to show pages of results I need some kind of state to keep track
    // of in order to do that... News API has a page query parameter, and to get access to the next result I would theoritically
    // have to make another fetch request to page=2 which is stupid af... 

    // so maybe its best ot make it so that I try to limit it to 100 pages maximum and thats it... and creates 5 pages of 20 based on top 100...

    // fetch('https://newsapi.org/v2/top-headlines?
    //         q=Corona&sources=bbc-news,abc-news,ars-technica
    //         &pageSize=100
    //         &apiKey=c2fc6bdd3bcb4a139b303cd57af45cc2')
    //     .then(resp => resp.json())
    //     .then(data => console.log(data))

// 5d94a4280599426498934113df289233 microsoft bing search api
// //BigDataCloud API KEY 08f39e5268b84df2a3d602cce60a519e

    const [ searchparams, searchparamsSet ] = useState(search_submitted)

    const [ cards, cardsSet ] = useState(null)

    const currentCoordinates = useSelector(state => state.coordinates)
    const user_city_state = useSelector(state => state.user_location)
    
    const [ displayedNews, displayedNewsSet ] = useState(null)


    useEffect(() => {
        // debugger
        fetchNews(search_submitted)
    }, [search_submitted])
    
    //only implemented for top-headlinessssss
    function fetchNews(search_params) {
        //Everything search param does not allow country but includes langauge... so .... figure it out...
        //debugger
        if (search_params !== ""){
            const api_key = 'c2fc6bdd3bcb4a139b303cd57af45cc2'
            if (search_params.news_source) {
                let string_of_news_sources = search_params.news_source.join('\,')
                let url = `https://newsapi.org/v2/${search_params.endpoint}?q=${search_params.input}&sources=${string_of_news_sources}&pageSize=100&apiKey=${api_key}`
                fetch(url)
                    .then(res => res.json())
                    .then(data => renderCards(data))
            } else if (search_params.category !== null){
                let url = `https://newsapi.org/v2/${search_params.endpoint}?q=${search_params.input}&country=${search_params.country}&category=${search_params.category}&pageSize=100&apiKey=${api_key}`
                // debugger
                fetch(url)
                    .then(res => res.json())
                    .then(data => renderCards(data))
            } else {
                let url = `https://newsapi.org/v2/${search_params.endpoint}?q=${search_params.input}&country=${search_params.country}&pageSize=100&apiKey=${api_key}`    
                // debugger
                fetch(url)
                    .then(res => res.json())
                    .then(data => renderCards(data))
            }
        }

    }  

    //I dont think i need displayedNewsSet... since the individual cards
    //already have a reference to themselves
    function renderCards(data){
        console.log(data)
        if (data){
            if (data.status === 'ok'){
                cardsSet(data)
                displayedNewsSet(data.articles)
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
                <h3 className="numberResults">List of Articles ({cards.totalResults} results found)</h3>
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
                        card_id={i}
                        article={article}
                        // key={i}
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