import React, {useState} from 'react'
import './LocalCard.css'
import './LocalNewsContainer.css'
import missing_img from './no-image-available-grid.png';


function Local_News_Card(props){


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

    console.log("The URL is: ", props.article_url)
    console.log("The Key is: ", props.key)

    return(
        <div className='NewsCard' id={props.id}>
            <header className="card-header">
                <img src={props.source_provider_img_url} className="source_provider_img"/>
                <h4 className="card-header-title">{props.source_provider_name}</h4>
                <a href={props.article_url} target="_blank" rel="noopener noreferrer">Link Source</a>
            </header>
            {props.article_img ? 
                (<img src={props.article_img} onLoad={handleImageLoaded} style={{display: 'none'}}/>) : <img src={missing_img} className="article_img"/>}
                {img_ready ? 
                    (<img src={props.article_img} className="article_img"/>)
                    :
                    (<div>loading</div>)
                }
            <br></br>
            <div className="img_caption">
                <p className="published_data">Published at: {props.date_published}</p>
            </div>
            <div className="card-body">
                <h2 className="article_title">{props.article_title}</h2>
                <p className="article-desc">{props.description}</p>
                <br></br>
            </div>
            <div className="button">
                <button onClick={createBookMark} data-card-id={props.id} className="news_card_button">bookmark</button>
            </div>
        </div>
    )
}

export default Local_News_Card