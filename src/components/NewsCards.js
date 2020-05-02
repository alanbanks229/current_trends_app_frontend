import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import './NewsCard.css'
import '../containers/NewsContainer.css'
import missing_img from './no-image-available-grid.png';
import {new_bookmark_action, remove_bookmark_action} from '../redux/bookmarks.js'
import swal from '@sweetalert/with-react';
import './cancelbookmark_alertbox.css'

function News_Card(props){


    const [ img_ready, img_readySet ] = useState(false)
    const [ bookmarked, bookmarkedSet ] = useState(false)
    const [ bookmark_id, bookmark_id_Set ] = useState(null)
    const currentUser = useSelector(state => state.current_user)
    const handleImageLoaded = () => {
        img_readySet(true)
    }
    const dispatch = useDispatch()

    //goal is to create NEW fetch request to bookmarks
    //Bookmark will have a user_id and card_info
    function createBookMark() {
        debugger
        if (currentUser){
            let payload = {
                user_id: currentUser.id,
                article_data: props.article
            }
            fetch('http://localhost:3001/bookmarks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(data => {
                    bookmarkedSet(true)
                    bookmark_id_Set(data.user_bookmark.id)
                    dispatch(new_bookmark_action(data.user_bookmark))
                    console.log(data.message)
                })
        } else {
            alert('Create an account to use this feature')
        }
        
    }

    function removeBookMark() {
        console.log("removing bookmark")
        if (currentUser){
            swal({
                icon: "warning",
                dangerMode: true,
                buttons: {
                  cancel: {text: "Cancel", value: "Close", visible: true},
                  confirm: {text: "Remove", value: "Confirm"}
                },
                content: (
                  <div className="flex">
                    <img src={props.image} className="alertbox_img"/>
                    <h1>Do you want to remove this bookmark?</h1>
                  </div>
                )
              })
            .then( (value) => {
                switch (value) {
                    case "Close":
                        swal("Canceled Action", "Bookmark will remain", "info")
                        break;
                    case "Confirm":
                        fetch(`http://localhost:3001/user_bookmarks/${bookmark_id}`, {
                            method: 'DELETE',
                            headers: {'Content-Type': 'application/json'}
                        }).then(response => {
                            if (response.ok) {
                                return Promise.resolve('Bookmark Deleted.')
                            } else {
                                return Promise.reject('An error occurred.')
                            }
                        }).then(result => {
                            dispatch(remove_bookmark_action(bookmark_id))
                            bookmark_id_Set(null)
                            bookmarkedSet(false)
                        })
                        break;
                    
                    default:
                        swal("uhh ignore this message bad coding")
                }
            })
        } else {
            console.log("how the heck did you even book mark in the first place if you're not logged in")
        }
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
                {bookmarked ? (<>
                                <label>Bookmarked</label>
                                <button onClick={removeBookMark} data-card-id={props.card_id} className="news_card_button">X</button>
                               </>
                               )
                                :
                                (<button onClick={createBookMark} data-card-id={props.card_id} className="news_card_button">bookmark</button>)
                }
                
            </div>
        </div>
    )
}

export default News_Card