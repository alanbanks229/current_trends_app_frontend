import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import './LocalNewsContainer.css'
import missing_img from './no-image-available-grid.png';
import {remove_bookmark_action} from '../redux/bookmarks.js'
import swal from '@sweetalert/with-react';
import './NewsCard.css'
import '../containers/NewsContainer.css'
import './cancelbookmark_alertbox.css'
import moment from 'moment';


function BookmarkedCards(props){


    const [ img_ready, img_readySet ] = useState(false)
    const currentUser = useSelector(state => state.current_user)
    const dispatch = useDispatch()
    const handleImageLoaded = () => {
        img_readySet(true)
    }
    const [ removedBookmark, removedBookmarkSet ] = useState(false)
    const time = moment(props.published || moment.now()).fromNow();

    function ConfirmDelete(){

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
                <h1>This bookmark will be deleted permanently!</h1>
                <p>Are you sure you want to proceed?</p>
              </div>
            )
          })
        .then( (value) => {
            debugger
            switch (value ) {
                case "Close":
                    swal("Canceled action", "Bookmark will stay", "info")
                    break
                case "Confirm":
                    //http://localhost:3001/user_bookmarks/${props.userbookmark_id}      https://current-trends-app-api.herokuapp.com/user_bookmarks/${props.userbookmark_id}
                    fetch(`http://localhost:3001/user_bookmarks/${props.userbookmark_id}`, {
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'}
                    }).then(response => {
                        if (response.ok) {
                            return Promise.resolve('Bookmark Deleted.')
                        } else {
                            return Promise.reject('An error occurred.')
                        }
                    }).then(result => {
                        dispatch(remove_bookmark_action(props.bookmark_id))
                        swal("Bookmark Removed!", "You will no longer see this bookmark on your page", "success");
                        removedBookmarkSet(true)
                    })
                    break;
                default:
                    swal("uh oh oopsie something broke... nothing happened.")
            }
        })
    }

    console.log("The Card is: ", props.article)
    let has_src_img = props.hasOwnProperty('source_provider_img_url')
    return(
        <>
            {removedBookmark ? 
            (null)
            :
            (
            <div className='NewsCard' id={props.id}>
                <header className="card-header">
                    
                     { has_src_img ? (<img src={props.source_provider_img_url} className="source_provider_img"/>) : (null) }
                    <h4 className="card-header-title">{props.source}</h4>
                    <a href={props.url} target="_blank" rel="noopener noreferrer">Link Source</a>
                </header>
                {props.image ? 
                    (<img src={props.image} onLoad={handleImageLoaded} style={{display: 'none'}}/>)
                    :
                    (<img src={missing_img} className="article_img"/>)
                }
                {img_ready ? 
                    (<img src={props.image} className="article_img"/>)
                    :
                    (<div>loading</div>)
                }

                <br></br>
                <div className="img_caption">
                    <p className="published_data">Published {time}</p>
                </div>
                <div className="card-body">
                    <h2 className="article_title">{props.title}</h2>
                    <p className="article-desc">{props.desc}</p>
                    <br></br>
                </div>
                <div className="button">
                    <button onClick={ConfirmDelete} className="news_card_button">Remove</button>
                </div>
            </div>
            )
            }
        </>
        )
}

export default BookmarkedCards