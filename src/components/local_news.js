import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux"
import LocalNewsCards from "./Local_News_Cards.js"

const LocalNewsPage = ({user_location}) => {

    //In news container it will receive the form submitted and from the filters applied
    //we will render the specific news cards.
    // 5d94a4280599426498934113df289233
    // //BigDataCloud API KEY 08f39e5268b84df2a3d602cce60a519e
    
        const user_city_state = useSelector(state => state.user_location)
        const [ cards, cardsSet ] = useState(null)

        useEffect(() => {
            debugger
            if (user_city_state){
                fetch_local_news(user_city_state)
            }
        }, [user_location])


        const fetch_local_news = (userLocation) => {
            const api = '5d94a4280599426498934113df289233';
            const requestHeaders = {
                headers: {
                    'Ocp-Apim-Subscription-Key': api,
                },
            };
            // debugger
            let URL = `https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=${userLocation.city}, ${userLocation.state}&originalImg=true`
                fetch(URL, requestHeaders)
                .then((response) => response.json())
                .then((newsJSON) => {
                    debugger
                    cardsSet(newsJSON)
            })
          }
    
        return (
    
            <div className="Local_News_Container">
                {cards ? 
                <div className="total_num_articles_container">
                    <h3>Your Local News: {user_city_state.city}, {user_city_state.state}</h3>
                    <h3 className="numberResults">Total Estimated Matches ({cards.totalEstimatedMatches} results found)</h3>
                </div>
                : 
                null}
    
                {cards ? 
                <div className="flex">
                    {cards.value.map((article, i) => 
                        (
                            //I need this stupid inner conditional because one day app crashed by not having a defined image.contentURL
                            (article.hasOwnProperty('image') ? (     
                            
                            <LocalNewsCards
                                source_provider_name={article.provider[0].name}
                                source_provider_img_url={article.provider[0].image.thumbnail.contentUrl}
                                article_title={article.name}
                                article_url={article.url}
                                article_img={article.image.contentUrl}
                                date_published={article.datePublished}
                                description={article.description}
                                article={article}
                                id={i}
                            />) : (null))

                        ))}
                </div>
                : 
                <div>Set up Geolocation on homepage first to see your local news</div>}
    
            </div>
        )
    }

export default LocalNewsPage