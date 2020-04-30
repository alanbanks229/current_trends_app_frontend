import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux"
import {update_input_field_action} from "../redux/update_search.js"
import {input_submission_action} from "../redux/search_bar_submission.js"
import SelectCountry from "./select_country.js"
import SelectSubcategory from "./select_subcategory.js"
import SelectNewsSources from "./select_news_sources.js"



const ControlledForm = () => {

    
    const currentSearch = useSelector(state => state.input_field)
    const [ inputfield, inputFieldSet ] = useState(currentSearch)
    const [ endpoint, endpointSet ] = useState('top-headlines')
    const [ country, countrySet ] = useState('us')
    const [ top_headlines_checked, top_headlines_checkedSet ] = useState(true) //probably don't need this use endpoint set that was declared earlier

    const [ category, categorySet ] = useState(null) //for users looking for news in trending sub-categories
    const [ subCategoryFilter, subCategoryFilterSet ] = useState(false)

    const [ newsSource, newsSourceSet ] = useState(null)
    const [ newsSourceFilter, newsSourceFilterSet ] = useState(false)



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

    const updateSubCategFilter = (event) => {
        //this makes it so that when user hides subcategory filter... the category filter = null
        if (event.target.checked === false){
            categorySet(null)
        }
        subCategoryFilterSet(!subCategoryFilter)
    }

    const updateCategory = (user_selection) => {
        debugger
        categorySet(user_selection)
    }

    const updateNewsSourceFilter = (event) => {
        debugger
        if (event.target.checked === true){
            countrySet('')
        } else {
            newsSourceSet(null)
            console.log("This should not get hit after form Submission")
        }
        newsSourceFilterSet(!newsSourceFilter)
    }

    //need to finish implementing this
    const updateNewsSource = (user_selections) => {
        debugger
        newsSourceSet(user_selections)
    }

    const updateInputField = (e) => {
        inputFieldSet(e.target.value)
    }
        return(
            <div className="SearchForm">
                <form id="search_form" onSubmit={(event) => {
                    event.preventDefault()
                    dispatch(input_submission_action(event, {input: inputfield, endpoint: endpoint, country: country, category: category, news_source: newsSource}))}}>
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
                    Filter by sub-category (optional)
                    <input type="checkbox" id="subcategoryBtn" onChange={(event) => updateSubCategFilter(event)}/>
                </label>
                {subCategoryFilter ? (<SelectSubcategory updateCateg={updateCategory}/>): (null)}
                <br/>
                <label>
                    Filter by news-source (optional)
                    <input type="checkbox" className="news_source_btn" onChange={(event) => updateNewsSourceFilter(event)}/>
                </label>
                {newsSourceFilter ? (<SelectNewsSources updateNewsSource={updateNewsSource}/>): (null)}
                <br/>
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