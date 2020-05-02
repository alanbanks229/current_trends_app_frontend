import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux"
import BookmarkedNewsCards from "./BookmarkedCards.js"
import NewsCards from "./NewsCards.js"

const BookmarkPage = ({user}) => {

    const user_bookmark_ids = useSelector(state => state.user_bookmark_ids)
    const currentUser = useSelector(state => state.current_user)
    const [ cards, cardsSet ] = useState(null)


    useEffect(() => {
        debugger
        if (user_bookmark_ids){
            fetch_bookmarks(user_bookmark_ids)
        }
    }, [])

    function fetch_bookmarks(bookmark_ids){
        //create custom route called /your_bookmarks in backend ... bruh i just need to pass in the user id lol
        debugger
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
        cardsSet(data)
    }

    return(
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
                {cards.map((article, i) =>
                    (
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
                        // key={i}
                        />
                    ))}
            </div>
            :
            <div>Look like there's nothing here, bookmark some cards to see them here!</div>
            }

        </div>
    )
}

export default BookmarkPage