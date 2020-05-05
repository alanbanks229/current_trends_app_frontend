import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SelectSubcategory from "./select_subcategory.js"
import SelectNewsSources from "./select_news_sources.js"
import SelectCountry from "./select_country.js"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleExpansionPanel() {
    const classes = useStyles();
    const [ endpoint, endpointSet ] = useState('top-headlines')
    const [ category, categorySet ] = useState(null) //for users looking for news in trending sub-categories
    const [ subCategoryFilter, subCategoryFilterSet ] = useState(false)
    const [ country, countrySet ] = useState('us')
    const [ newsSource, newsSourceSet ] = useState(null)
    const [ newsSourceFilter, newsSourceFilterSet ] = useState(false)

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
    const updateNewsSource = (user_selections) => {
        newsSourceSet(user_selections)
    }

    return (
    <div className={classes.root}>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.heading}>
                    <i class="filter icon"></i>
                    <span class="text">Filters</span>
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
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
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
    );
}