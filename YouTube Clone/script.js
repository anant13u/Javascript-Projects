const searchBox = document.getElementById('search-box') 
const movieTrailer1 = document.getElementById('trailer1')
const movieTrailer2 = document.getElementById('trailer2')

const ytApiKey = 'AIzaSyCTUTvvpzzcodbELs4jfDdSNOybbmOglOU'

const searchButton = document.querySelector('.search-button-container')
searchButton.addEventListener('click',fetchTrailer)

async function fetchTrailer() {
    try {
        // Construct the URL for the API request
        const searchString = searchBox.innerHTML
        // console.log(`Trailer Search Input will be ${trailerName}`)
        const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&q=${searchString}&part=snippet&type=video&videoDefinition=high&maxResults=2`
        console.log(`searchString is ${searchString}`)

        // Send the API request and get the response
        const response = await fetch(apiURL)
        const data = await response.json()

        // Get the video ID and URL for the video thumbnail
        const videoID1 = data.items[0].id.videoId;
        console.log(`Video ID 1 is ${videoID1}`)
        const videoID2 = data.items[1].id.videoId;
        console.log(`Video ID 2 is ${videoID2}`)
        const thumbnailUrl1 = data.items[0].snippet.thumbnails.high.url;
        console.log(`Thumbnail URL 1 is ${thumbnailUrl1}`);
        const thumbnailUrl2 = data.items[1].snippet.thumbnails.high.url;
        console.log(`Thumbnail URL 2 is ${thumbnailUrl2}`);

        // Construct the URL for the video player
        const embedUrl1 = `https://www.youtube.com/embed/${videoID1}`;
        // console.log(`The Video URL is ${videoUrl2}`)
        const embedUrl2 = `https://www.youtube.com/embed/${videoID2}`;
        console.log(`Embed URL is ${thumbnailUrl2}`)

        const iframeHtml1 = `<iframe width="560" height="315" src="${embedUrl1}" frameborder="0" style='border-radius:15px' allowfullscreen></iframe>`;
        console.log(`iFrameHtml is ${iframeHtml1}`)
        const iframeHtml2 = `<iframe width="560" height="315" src="${embedUrl2}" frameborder="0" style='border-radius:15px' allowfullscreen></iframe>`;
        console.log(`iFrameHtml is ${iframeHtml2}`)

        movieTrailer1.innerHTML = iframeHtml1
        movieTrailer2.innerHTML = iframeHtml2

        // return { videoUrl, thumbnailUrl };
    } catch (error) {
        console.log(error);
  }
}
