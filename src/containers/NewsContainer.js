import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import NewsCards from "../components/NewsCards.js"

const NewsContainer = ({search_submitted, user_location}) => {

//In news container it will receive the form submitted and from the filters applied
//we will render the specific news cards.
// 5d94a4280599426498934113df289233
// //BigDataCloud API KEY 08f39e5268b84df2a3d602cce60a519e

    const [ searchparams, searchparamsSet ] = useState(search_submitted)

    const [ cards, cardsSet ] = useState(null)

    const currentCoordinates = useSelector(state => state.coordinates)
    const user_city_state = useSelector(state => state.user_location)
    



    useEffect(() => {
        // debugger
        fetchNews(search_submitted)
    }, [search_submitted])
    
    function fetchNews(search_params) {
        //Everything search param does not allow country but includes langauge... so .... figure it out...
        debugger
        if (search_params !== ""){
            const api_key = 'c2fc6bdd3bcb4a139b303cd57af45cc2'
            if (search_params.category !== null) {
                let url = `https://newsapi.org/v2/${search_params.endpoint}?q=${search_params.input}&country=${search_params.country}&category=${search_params.category}&apiKey=${api_key}`
                // debugger
                fetch(url)
                    .then(res => res.json())
                    .then(data => renderCards(data))
            } else {
                let url = `https://newsapi.org/v2/${search_params.endpoint}?q=${search_params.input}&country=${search_params.country}&apiKey=${api_key}`    
                // debugger
                fetch(url)
                    .then(res => res.json())
                    .then(data => renderCards(data))
            }
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