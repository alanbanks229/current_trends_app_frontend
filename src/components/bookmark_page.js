import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux"
import BookmarkedNewsCards from "./BookmarkedCards.js"
import NavBarContainer from '../containers/Navbar.js';


const BookmarkPage = (props) => {

    const user_bookmark_ids = useSelector(state => state.user_bookmark_ids)
    const currentUser = useSelector(state => state.current_user)
    const [ cards, cardsSet ] = useState(null)


    useEffect(() => {
        if (user_bookmark_ids){
            fetch_bookmarks(user_bookmark_ids)
        }
    }, [user_bookmark_ids])

    function fetch_bookmarks(bookmark_ids){
        //debugger

        //fetch('http://localhost:3001/your_bookmarks')    https://current-trends-app-api.herokuapp.com/your_bookmarks
        fetch('http://localhost:3001/your_bookmarks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: currentUser.id})
        })
        .then(res => res.json())
        .then(data => {
            debugger
            if (data.message){
                console.log(data.message)
            } else {
                debugger
                renderCards(data)
            }
        })
    }

    function renderCards(data){
        debugger
        cardsSet(data)
    }

    return(
        <>
        <NavBarContainer props={props}/>
        <div className="NewsContainer">
            {cards ?
            <div className="total_num_bookmarks">
                <h3>Your Bookmarks</h3>
                <h3 className="numberResults">rendered ({cards.length} news cards)</h3>
            </div>
            :
            null}

            {cards ?
            <div className="flex">
                {cards.map((article, i) => ( article.article_data.hasOwnProperty('image') ? (
                        <BookmarkedNewsCards 
                        source={article.article_data.provider[0].name}
                        source_provider_img_url={article.article_data.provider[0].image.thumbnail.contentUrl}
                        author={""}
                        title={article.article_data.name}
                        desc={article.article_data.description}
                        url={article.article_data.url}
                        image={article.article_data.image.contentUrl}
                        published={article.article_data.datePublished}
                        content={""}
                        bookmark_id={article.id}
                        userbookmark_id={article.match_id[0]}
                        article={article.article_data}
                        />
                    ) : (
                        <BookmarkedNewsCards 
                        source={article.article_data.source.name}
                        author={article.article_data.author}
                        title={article.article_data.title}
                        desc={article.article_data.description}
                        url={article.article_data.url}
                        image={article.article_data.urlToImage}
                        published={article.article_data.publishedAt}
                        content={article.article_data.content}
                        bookmark_id={article.id}
                        userbookmark_id={article.match_id[0]}
                        article={article.article_data}
                        />
                    )
                    
                    
                    )
                    
                    
                )}
            </div>
            :
            <div>Looks like there's nothing here, bookmark some cards to see them here!</div>
            }

        </div>
        </>
    )
}

export default BookmarkPage