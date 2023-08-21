const searchBox = document.getElementById('search-box')
const videosContainer = document.querySelector('.videos-container')
const resultsCount = document.getElementById('results-count')

const ytApiKey = 'AIzaSyCTUTvvpzzcodbELs4jfDdSNOybbmOglOU'

const searchButton = document.querySelector('.search-button-container')
searchButton.addEventListener('click',fetchVideos)

searchBox.addEventListener('click', clearSearchBox)

function clearSearchBox() {
    if (searchBox.innerHTML=='Search') {
        searchBox.innerHTML=''
    }
}

resultsCount.addEventListener('click', clearResultsCounter)

function clearResultsCounter() {
    if (resultsCount.innerHTML=='Results Count') {
        resultsCount.innerHTML=''
    }
}

async function fetchVideos() {
    try {
        // Get the user-selected number of search results
        const maxResults = resultsCount.innerHTML
        // const maxResults = parseInt(resultsCount.innerHTML)
        console.log(maxResults)

        // Construct the URL for the API request
        const searchString = searchBox.innerHTML
        // console.log(`Trailer Search Input will be ${trailerName}`)
        const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&q=${searchString}&part=snippet&type=video&videoDefinition=high&maxResults=${maxResults}`
        // console.log(`searchString is ${searchString}`)

        // Send the API request and get the response
        const response = await fetch(apiURL)
        const data = await response.json()

        videosContainer.innerHTML=''

        for (let i=0; i<data.items.length;i++) {
            // Get the video ID and URL for the video thumbnail
            const videoID = data.items[i].id.videoId;
            // console.log(`Video ID 1 is ${videoID}`)
    
            // const thumbnailUrl = data.items[0].snippet.thumbnails.high.url;
            // console.log(`Thumbnail URL 1 is ${thumbnailUrl}`);
    
            // Construct the URL for the video player
            const embedUrl = `https://www.youtube.com/embed/${videoID}`;
    
            const iframeHtml = `<iframe width="560" height="315" src="${embedUrl}" frameborder="0" style='border-radius:15px' allowfullscreen></iframe>`;
            // console.log(`iFrameHtml is ${iframeHtml1}`)
    
            const videoElement = document.createElement('div')
            videoElement.innerHTML=iframeHtml
    
            videosContainer.appendChild(videoElement)
        }
    } catch (error) {
        console.log(error);
  }
}
