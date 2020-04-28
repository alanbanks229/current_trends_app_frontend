import React, {useState} from 'react'
import './NewsCard.css'
import '../containers/NewsContainer.css'
import missing_img from './no-image-available-grid.png';
function News_Card(props){


    const [ img_ready, img_readySet ] = useState(false)

    const handleImageLoaded = () => {
        img_readySet(true)
    }
    

    //goal is to create NEW fetch request to bookmarks
    //Bookmark will have a user_id and card_info
    function createBookMark() {
        let payload = {
            user_id: "session_id or somethin",
            article_data: props.article
        }
        debugger
        fetch('localhost:3000/bookmarks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => console.log(data))
        
    }

    console.log("The URL is: ", props.image)
    console.log("The Key is: ", props.key)

    return(
        <div className='NewsCard'>
            <header className="card-header">
                <h4 className="card-header-title">{props.source}</h4>
                <a href={props.url} target="_blank" rel="noopener noreferrer">Link Source</a>
            </header>
            {props.image ? ( img_ready ? (<img src={props.image} alt={props.title} className="img-responsive"/>) 
                                        : (<div>loading 
                                            <img src={props.image} onLoad={handleImageLoaded} style={{display: 'none'}}/>
                                          </div>)
                            ) 
                        :
                            ((<img src={missing_img} className="article_img"/>))
            }
            <br></br>
            <div className="img_caption">
                {props.author ? <p className="author">By: {props.author}</p>: <p>provided by {props.source}</p>}
                <p className="published_data">Published at: {props.published}</p>
            </div>
            <div className="card-body">
                <h2 className="article_title">{props.title}</h2>
                <p className="article-desc">{props.desc}</p>
                <br></br>
            </div>
            <div className="button">
                <button onClick={createBookMark} data-card-id={props.card_id} className="news_card_button">bookmark</button>
            </div>
        </div>
    )
}

export default News_Card