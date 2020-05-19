
//Look at X-Search-Location query parameter... instead of hardcoding the string 'Potomac, MD' Bing's news search API can give me local news given coordinates.

// This file is just used for a reference to make the fetch calls I will use in the app

const api = '5d94a4280599426498934113df289233';
const requestHeaders = {
    headers: {
        'Ocp-Apim-Subscription-Key': api,
    },
};


let SEATTLE_WA_OG_IMGS_URL = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=Seattle, Wa' + 
                             '&originalImg=true'

    fetch(SEATTLE_WA_OG_IMGS_URL, requestHeaders)
    .then((response) => response.json())
    .then((newsJSON) => console.log(newsJSON))


const TOP_BING_TRUMP = 'https://api.cognitive.microsoft.com/bing/v7.0/news/trump'
    fetch(TOP_BING_TRUMP, requestHeaders)
    .then((response) => response.json())
    .then((newsJSON) => console.log(newsJSON))


let SEARCH_QUERY_POTOMAC = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=Potomac, MD' + 
                           '&originalImg=true'
    fetch(SEARCH_QUERY_POTOMAC, requestHeaders)
    .then((response) => response.json())
    .then((newsJSON) => console.log(newsJSON))

let TOP_BING_NEWS_STORIES = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search'
    fetch(TOP_BING_NEWS_STORIES, requestHeaders)
        .then( res => res.json())
        .then( data => console.log(data))