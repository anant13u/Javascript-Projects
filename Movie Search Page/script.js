const searchInput = document.getElementById('movie-search-input')
const movieName = document.getElementById('movie-name')
const movieYear = document.getElementById('movie-year')
const movieGenre = document.getElementById('movie-genre')
const movieRating = document.getElementById('movie-rating')
const movieReleased = document.getElementById('movie-released')
const movieRuntime = document.getElementById('movie-runtime')
const movieActors = document.getElementById('movie-actors')
const moviePlot = document.getElementById('movie-plot')
const moviePoster = document.getElementById('movie-poster')

const fetchDetails = document.getElementById('fetch-button')

const ytApiKey = 'AIzaSyCTUTvvpzzcodbELs4jfDdSNOybbmOglOU'
const trailerButton = document.getElementById('trailer-button')
const movieTrailer1 = document.getElementById('trailer1')
const movieTrailer2 = document.getElementById('trailer2')

// const functions = [getMovieDetails, fetchTrailer]

// const apiKey = '49c895a8'

// fetchDetails.addEventListener('click', () => {
//     getMovieDetails(searchInput.value)
//     setTimeout(2)
//     fetchTrailer(searchInput.value)
// })
// searchInput.addEventListener('input', getMovieDetails)

fetchDetails.addEventListener('click', getMovieDetails)
trailerButton.addEventListener('click',fetchTrailer)

function getMovieDetails() {
    const searchName = searchInput.innerHTML
    console.log(movieName)

    // fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`)
    fetch(`https://www.omdbapi.com/?apikey=49c895a8&t=${searchName}`)
        .then(Response => Response.json())
        .then(data => {
            movieName.innerHTML=data.Title
            // console.log(data.Title)
            movieYear.innerHTML=data.Year
            movieGenre.innerHTML=data.Genre
            movieRating.innerHTML=data.Rated
            movieReleased.innerHTML=data.Released
            movieRuntime.innerHTML=data.Runtime
            movieActors.innerHTML=data.Actors
            moviePlot.innerHTML=data.Plot
            moviePoster.src = data.Poster
        })
}


async function fetchTrailer() {
    try {
        // Construct the URL for the API request
        const trailerName = `${movieName.innerHTML} ${movieYear.innerHTML}`
        console.log(`Trailer Search Input will be ${trailerName}`)
        const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&q=${trailerName} official trailer&part=snippet&type=video&videoDefinition=high&maxResults=2`

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
        // const videoUrl1 = `https://www.youtube.com/watch?v=${videoID1}`
        // console.log(`The Video URL is ${videoUrl1}`)
        const embedUrl1 = `https://www.youtube.com/embed/${videoID1}`;
        console.log(`Embed URL is ${thumbnailUrl1}`)
        // const videoUrl2 = `https://www.youtube.com/watch?v=${videoID2}`
        // console.log(`The Video URL is ${videoUrl2}`)
        const embedUrl2 = `https://www.youtube.com/embed/${videoID2}`;
        console.log(`Embed URL is ${thumbnailUrl2}`)

        const iframeHtml1 = `<iframe width="560" height="315" src="${embedUrl1}" frameborder="0" allowfullscreen></iframe>`;
        console.log(`iFrameHtml is ${iframeHtml1}`)
        const iframeHtml2 = `<iframe width="560" height="315" src="${embedUrl2}" frameborder="0" allowfullscreen></iframe>`;
        console.log(`iFrameHtml is ${iframeHtml2}`)

        movieTrailer1.innerHTML = iframeHtml1
        movieTrailer2.innerHTML = iframeHtml2
        // return { videoUrl, thumbnailUrl };
    } catch (error) {
        console.log(error);
  }
}

// fetchTrailer(movieName)
//   .then(result => console.log(result))
//   .catch(error => console.log(error))


// Here is your key: 49c895a8
// Please append it to all of your API requests,
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=49c895a8
// http://www.omdbapi.com/?apikey=49c895a8&t=wild%20hogs

// YouTube API Key: AIzaSyCTUTvvpzzcodbELs4jfDdSNOybbmOglOU
