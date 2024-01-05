const ytApiKey = 'AIzaSyCTUTvvpzzcodbELs4jfDdSNOybbmOglOU'

const searchBox = document.getElementById('search-box')
const videosContainer = document.querySelector('.videos-container')
const resultsCount = document.getElementById('results-count')

const videoTrackingTable = document.getElementById('video-tracking-table')
const tableBody = videoTrackingTable.getElementsByTagName('tbody')[0]
videoTrackingTable.style.visibility ='hidden'

const searchButton = document.querySelector('.search-button-container')
searchButton.addEventListener('click',fetchVideos)

searchBox.addEventListener('click', clearSearchBox)
searchBox.addEventListener('focus', clearSearchBox)
searchBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      fetchVideos()
    }
  });

function clearSearchBox() {
    if (searchBox.innerHTML=='Search') {
        searchBox.innerHTML=''
    }
}

resultsCount.addEventListener('click', clearResultsCounter)
resultsCount.addEventListener('focus', clearResultsCounter)
resultsCount.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      fetchVideos()
    }
  });

function clearResultsCounter() {
    if (resultsCount.innerHTML=='Results Count') {
        resultsCount.innerHTML=''
    }
}

async function fetchVideos() {
    try {
        // Get the user-selected number of search results
        const maxResults = resultsCount.innerText
        if (maxResults=='' || maxResults=='Results Count') {
            alert('Please enter a results count.')
        }
        else if (maxResults>20) {
            alert('Please enter a number less than or equal to 20.')
        } else {
            // const maxResults = parseInt(resultsCount.innerHTML)
            console.log(maxResults)
    
            // Construct the URL for the API request
            const searchString = searchBox.innerText
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

            videoTracker(searchString, maxResults)
            searchBox.innerHTML=''
            resultsCount.innerHTML=''
        }
    } catch (error) {
        console.log(error);
  }
}


function videoTracker(searchString, maxResults) {
    // const maxResults = resultsCount.innerText
    // const searchString = searchBox.innerText

    var row = tableBody.insertRow(0);
    row.classList.add('table-row')

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = searchString
    cell2.innerHTML = maxResults

    videoTrackingTable.style.visibility ='visible'
}

