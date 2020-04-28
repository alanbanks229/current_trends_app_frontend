
export function fetch_local_news(user_location){
    debugger
    let data;
    const api = '5d94a4280599426498934113df289233';
    const requestHeaders = {
        headers: {
            'Ocp-Apim-Subscription-Key': api,
        },
    };


    let URL = `https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=${user_location.city}, ${user_location.state}&originalImg=true`
        fetch(URL, requestHeaders)
        .then((response) => response.json())
        .then((newsJSON) => {
            console.log(newsJSON)
            data = newsJSON
            return data
    })
}