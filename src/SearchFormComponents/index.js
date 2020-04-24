import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux"
import {update_input_field_action} from "../redux/update_search.js"
import {input_submission_action} from "../redux/search_bar_submission.js"
import SelectCountry from "./select_country.js"




const ControlledForm = () => {

    
    const currentSearch = useSelector(state => state.input_field)
    const [ inputfield, inputFieldSet ] = useState(currentSearch)
    const [ endpoint, endpointSet ] = useState('top-headlines')
    const [ country, countrySet ] = useState('us')
    console.log("current country code is", country)
    // const currentSubmission = useSelector(state => state.submission)
    const dispatch = useDispatch()
    console.log("currentSearch is : ", currentSearch)

    const updateEndPoint = (e) => {
        
        console.log(endpoint)
        if (endpoint !== e.target.value){
            endpointSet(e.target.value)
        }
    }

    const updateInputField = (e) => {
        inputFieldSet(e.target.value)
    }
        return(
            <div className="SearchForm">
                <form id="search_form" onSubmit={(event) => {
                    event.preventDefault()
                    dispatch(input_submission_action(event, {input: inputfield, endpoint: endpoint, country: country}))}}>
                <input type="text" onChange={(event) => {
                    updateInputField(event)
                    dispatch(update_input_field_action(event))}
                    }/>
                <div className="radio_endpoint">
                    <label>
                    <input type="radio" value="top-headlines" name="endpoint" defaultChecked onClick={(e) => updateEndPoint(e)}/>
                    Top Headlines
                    </label>
                </div>
                <div className="radio_endpoint">
                    <label>
                        <input type="radio" value="everything" name="endpoint" onClick={(e) => updateEndPoint(e)} />
                        Everything
                    </label>
                </div>
                <label>
                    Search News By Country
                    <SelectCountry countrySet={countrySet}/>
                </label>
                
                <input type="submit" value="Search"/>
            </form>
            </div>
        )
    }

export default ControlledForm