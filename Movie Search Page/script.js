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

// const apiKey = '49c895a8'

// searchInput.addEventListener('click', () => {
//     searchInput.innerHTML=''
// })

fetchDetails.addEventListener('click', getMovieDetails)
// searchInput.addEventListener('input', getMovieDetails)

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

// Here is your key: 49c895a8
// Please append it to all of your API requests,
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=49c895a8
// http://www.omdbapi.com/?apikey=49c895a8&t=wild%20hogs
