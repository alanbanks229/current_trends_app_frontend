import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux"
import {update_input_field_action} from "../redux/update_search.js"
import {input_submission_action} from "../redux/search_bar_submission.js"
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Icon } from 'semantic-ui-react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel'; 
import SelectCountry from "./select_country.js"
import SelectSubcategory from "./select_subcategory.js"
import SelectNewsSources from "./select_news_sources.js"
import SelectLanguage from "./languageFilter.js"
// import Filters from "./filter.js"
import './searchform.css'


const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

//   const useStyles = makeStyles((theme) => ({
//     root: {
      
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//       fontWeight: theme.typography.fontWeightRegular,
//     },
//   }));



export default function ControlledForm() {
   // const openFilter = filterOpen()
    const classes = useStyles();
    const currentSearch = useSelector(state => state.input_field)
    const [ inputfield, inputFieldSet ] = useState(currentSearch)
    const [ endpoint, endpointSet ] = useState('top-headlines')
    const [ country, countrySet ] = useState('us')
    const [ category, categorySet ] = useState(null) //for users looking for news in trending sub-categories
    const [ subCategoryFilter, subCategoryFilterSet ] = useState(false)
    const [ newsSourceChecked, newsSourceCheckedSet ] = useState(false)
    const [ newsSource, newsSourceSet ] = useState(null)
    const [ newsSourceFilter, newsSourceFilterSet ] = useState(false)
    const [ langFilter, langFilterSet ] = useState(false)
    const [ lang, langSet ] = useState('')
    const [ sortBy, sortBySet ] = useState('publishedAt')



    console.log("current country code is", country)
    const currentSubmission = useSelector(state => state.submission)
    const dispatch = useDispatch()
    console.log("currentSearch is : ", currentSearch)

    const updateEndPoint = (e) => {
        console.log(endpoint)
        if (endpoint !== e.target.value){
            endpointSet(e.target.value)
        }
    }

    const updateSortBy = (e) => {
        if (sortBy !== e.target.value){
            sortBySet(e.target.value)
        }
    }

    const updateSubCategFilter = (event) => {
        //this makes it so that when user hides subcategory filter... the category filter = null
        if (event.target.checked === false){
            categorySet(null)
        }
        subCategoryFilterSet(!subCategoryFilter)
    }

    const updateLangFilter = (event) => {
        if (event.target.checked === false){
            langSet('')
        }
        langFilterSet(!langFilter)
    }

    const updateCategory = (user_selection) => {
        // debugger
        categorySet(user_selection)
    }

    const updateNewsSourceFilter = (event) => {
        // debugger
        if (event.target.checked === true){
            countrySet('')
            newsSourceCheckedSet(true)
        } else {
            newsSourceSet(null)
            newsSourceCheckedSet(false)
            console.log("This should not get hit after form Submission")
        }
        newsSourceFilterSet(!newsSourceFilter)
    }

    //need to finish implementing this
    const updateNewsSource = (user_selections) => {
        // debugger
        newsSourceSet(user_selections)
    }


    const updateInputField = (e) => {
        inputFieldSet(e.target.value)
    }
        return(
            <div className="SearchForm">
                <h1 className="search_header">Current Trends</h1>
                <br/>
                <form id="search_form" onSubmit={(event) => {
                    event.preventDefault()
                    dispatch(input_submission_action(event, {input: inputfield, endpoint: endpoint, country: country, category: category, news_source: newsSource, sortBy: sortBy, lang: lang}))}}>
                <div className="centerSearchBarDiv">
                    <div class="ui large icon input">
                        <input type="text" placeholder="search..." onChange={(event) => {
                            updateInputField(event)
                            dispatch(update_input_field_action(event))}
                            }/>
                        <i className="search icon"></i>
                    </div>
                    <input type="submit" value="Search"/>
                </div>
                <div className={classes.root}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography className={classes.heading}>
                                <Icon color='black' name='filter' />
                                <span class="text">Filters</span>
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="endpoint" defaultValue={endpoint}>
                                    <div className="direct_container_top_headlines_filters">
                                    <FormControlLabel value="top-headlines" control={<Radio color="primary" />} label="Top Headlines" onClick={(e) => updateEndPoint(e)}/>
                                    </div>

                                    <div className="direct_container_everything_filters">
                                    <FormControlLabel value="everything" control={<Radio color="primary" />} label="Everything" onClick={(e) => updateEndPoint(e)} />
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <br></br>
                            <br/>

                            <div className="outer_div_containing_both_filter_properties">
                            {endpoint === 'top-headlines' ? 
                            (<>
                            {/* <ul className="filter-settings-inline">
                                <li className="everything-filters-li-grayed"> */}
                                <div className="everything-filters-div-grayed">
                                        <label>
                                            <b>Sort by</b> (newest, relevancy, popularity)<br/>
                                            <FormControl component="fieldset">        
                                                <RadioGroup row aria-label="position" name="sort-by" defaultValue={sortBy}>
                                                    <FormControlLabel value="publishedAt" control={<Radio color="secondary" />} label="Newest Articles" onClick={(e) => updateSortBy(e)}/>
                                                    <FormControlLabel value="relevancy" control={<Radio color="secondary" />} label="Relevancy" onClick={(e) => updateSortBy(e)} />
                                                    <FormControlLabel value="popularity" control={<Radio color="secondary" />} label="Popularity" onClick={(e) => updateSortBy(e)} />
                                                </RadioGroup>
                                            </FormControl>
                                        </label>
                                        <br/>
                                        <br/>
                                        <label>
                                            <b>Filter by language</b>
                                            <input type="checkbox" className="lang_btn" onChange={(event) => updateLangFilter(event)}/> 
                                            {langFilter ? (<SelectLanguage langSet={langSet}/>) : (<br/>)}
                                            <br />
                                            <em style={{fontSize: "12px", display: 'inline-block', marginLeft: '2%'}}>Default: (all languages)</em><br/><br/>
                                        </label>
                                </div>
                                    <div className="top-headlines-filters-div">
                                        <label>
                                            <b>Search News By Country:</b> {newsSourceChecked ? (<SelectCountry newsChecked={newsSourceChecked} countrySet={countrySet}/>) : (<SelectCountry newsChecked={newsSourceChecked} countrySet={countrySet}/>) }
                                            <br/>
                                            <em style={{fontSize: "12px", display: 'inline-block', marginLeft: '2%'}}>Default: (USA)</em><br/>
                                            
                                        </label>
                                        <br/>
                                        <label>
                                            <b>Filter by sub-category</b> (optional)
                                            {newsSourceChecked ? (<input type="checkbox" id="subcategoryBtn" disabled/>): (<input type="checkbox" id="subcategoryBtn" onChange={(event) => updateSubCategFilter(event)}/>)}
                                            
                                        </label>
                                        <br></br>
                                        {subCategoryFilter ? (<SelectSubcategory updateCateg={updateCategory}/>): (null)}
                                        <br/>
                                        <label>
                                            <b>Filter by news-source</b> (optional)
                                            {subCategoryFilter ? (<input type="checkbox" className="news_source_btn" disabled />): (<input type="checkbox" className="news_source_btn" onChange={(event) => updateNewsSourceFilter(event)}/>)}
                                        </label>
                                        {newsSourceFilter ? (<SelectNewsSources updateNewsSource={updateNewsSource}/>): (null)}
                                        <br/>
                                        <br/>
                                    </div>
                                {/* // </li> */}
                                {/* // </ul> */}
                                </>
                                ) 
                                : 
                                (
                                <>
                                {/* <ul className="filter-settings-inline">
                                <li className="everything-filters-li-grayed"> */}
                                <div className="everything-filters-div">
                                        <label>
                                            <b>Sort by</b> (newest, relevancy, popularity)<br/>
                                            <FormControl component="fieldset">        
                                                <RadioGroup row aria-label="position" name="sort-by" defaultValue={sortBy}>
                                                    <FormControlLabel value="publishedAt" control={<Radio color="secondary" />} label="Newest Articles" onClick={(e) => updateSortBy(e)}/>
                                                    <FormControlLabel value="relevancy" control={<Radio color="secondary" />} label="Relevancy" onClick={(e) => updateSortBy(e)} />
                                                    <FormControlLabel value="popularity" control={<Radio color="secondary" />} label="Popularity" onClick={(e) => updateSortBy(e)} />
                                                </RadioGroup>
                                            </FormControl>
                                        </label>
                                        <br/>
                                        <br/>
                                        <label>
                                            <b>Filter by language</b>
                                            <input type="checkbox" className="lang_btn" onChange={(event) => updateLangFilter(event)}/> 
                                            {langFilter ? (<SelectLanguage langSet={langSet}/>) : (<br/>)}
                                            <br />
                                            <em style={{fontSize: "12px", display: 'inline-block', marginLeft: '2%'}}>Default: (all languages)</em><br/><br/>
                                        </label>
                                </div>
                                {/* </li>
                                <li className="top-headlines-filters-li-grayed"> */}
                                    <div className="top-headlines-filters-div-grayed">
                                        <label>
                                            <b>Search News By Country:</b> {newsSourceChecked ? (<SelectCountry newsChecked={newsSourceChecked} countrySet={countrySet}/>) : (<SelectCountry newsChecked={newsSourceChecked} countrySet={countrySet}/>) }
                                            <br/>
                                            <em style={{fontSize: "12px", display: 'inline-block', marginLeft: '2%'}}>Default: (USA)</em><br/>
                                            
                                        </label>
                                        <br/>
                                        <label>
                                            <b>Filter by sub-category</b> (optional)
                                            {newsSourceChecked ? (<input type="checkbox" id="subcategoryBtn" disabled/>): (<input type="checkbox" id="subcategoryBtn" onChange={(event) => updateSubCategFilter(event)}/>)}
                                            
                                        </label>
                                        <br/>
                                        {subCategoryFilter ? (<SelectSubcategory updateCateg={updateCategory}/>): (null)}
                                        <br/>
                                        <label>
                                            <b>Filter by news-source</b> (optional)
                                            {subCategoryFilter ? (<input type="checkbox" className="news_source_btn" disabled />): (<input type="checkbox" className="news_source_btn" onChange={(event) => updateNewsSourceFilter(event)}/>)}
                                        </label>
                                        {newsSourceFilter ? (<SelectNewsSources updateNewsSource={updateNewsSource}/>): (null)}
                                        <br/>
                                        <br/>
                                    </div>
                                    {/* </li>
                                </ul> */}
                                </>
                                )
                            }
                            </div>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </form>
            </div>
        )
    }