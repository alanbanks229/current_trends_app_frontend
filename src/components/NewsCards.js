import React from 'react'
import './NewsCard.css'
import '../containers/NewsContainer.css'
import missing_img from './no-image-available-grid.png';
function News_Card(props){



    return(
        <div className='NewsCard' key={props.key}>
            <header className="card-header">
                <h4 className="card-header-title">{props.source}</h4>
                <a href={props.url} target="_blank" rel="noopener noreferrer">Link Source</a>
            </header>
            {props.image ? <img src={props.image} className="img-responsive"/> : <img src={missing_img} className="img-responsive"/>}
            
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
                <button className="news_card_button">Favorite</button>
            </div>
        </div>
    )
}

export default News_Card