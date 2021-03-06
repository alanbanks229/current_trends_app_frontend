import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import './LocalNewsContainer.css'
import missing_img from './no-image-available-grid.png';
import {new_bookmark_action, remove_bookmark_action} from '../redux/bookmarks.js'
import swal from '@sweetalert/with-react';
import './cancelbookmark_alertbox.css'
import moment from 'moment';

function Local_News_Card(props){

    const time = moment(props.date_published || moment.now()).fromNow();
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
            //http://localhost:3001/bookmarks  https://current-trends-app-api.herokuapp.com/bookmarks
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
                    <img alt="" src={props.article_img} className="alertbox_img"/>
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
                        //http://localhost:3001/user_bookmarks/${bookmark_id}    https://current-trends-app-api.herokuapp.com/user_bookmarks/${bookmark_id}
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

    console.log("The URL is: ", props.article_url)
    console.log("The Key is: ", props.key)

    return(
        <div className='NewsCard' id={props.id}>
            <header className="card-header">
                <img alt="" src={props.source_provider_img_url} className="source_provider_img"/>
                <h4 className="card-header-title">{props.source_provider_name}</h4>
                <a href={props.article_url} target="_blank" rel="noopener noreferrer">Link Source</a>
            </header>
            {props.article_img ? 
                (<img alt="" src={props.article_img} onLoad={handleImageLoaded} style={{display: 'none'}}/>) : <img alt="" src={missing_img} className="article_img"/>}
                {img_ready ? 
                    (<img alt="" src={props.article_img} className="article_img"/>)
                    :
                    (<div>loading</div>)
                }
            <br></br>
            <div className="img_caption">
                <p className="published_data">Published {time}</p>
            </div>
            <div className="card-body">
                <h2 className="article_title">{props.article_title}</h2>
                <p className="article-desc">{props.description}</p>
                <br></br>
            </div>
            <div className="button">
            {bookmarked ? (<>
                                <label>Bookmarked</label>
                                <button onClick={removeBookMark} data-card-id={props.id} className="news_card_button">X</button>
                               </>
                               )
                                :
                                (<button onClick={createBookMark} data-card-id={props.id} className="news_card_button">bookmark</button>)
                }
            </div>
        </div>
    )
}

export default Local_News_Card