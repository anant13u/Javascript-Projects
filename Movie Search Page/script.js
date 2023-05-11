const searchInput = document.getElementById('movie-search-input')
const movieYear = document.getElementById('movie-year')
const movieGenre = document.getElementById('movie-genre')
const fetchDetails = document.getElementById('fetch-button')
// const apiKey = '49c895a8'

// searchInput.addEventListener('click', () => {
//     searchInput.innerHTML=''
// })

fetchDetails.addEventListener('click', getMovieDetails)
// searchInput.addEventListener('change', getMovieDetails)

function getMovieDetails() {
    const movieName = searchInput.innerHTML
    console.log(movieName)

    // fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`)
    fetch(`https://www.omdbapi.com/?apikey=49c895a8&t=${movieName}`)
        .then(Response => Response.json())
        .then(data => {
            movieYear.innerHTML=data.Year
            console.log(data.Year)
            movieGenre.innerHTML=data.Genre
            console.log(data.Genre)

        })
}

// Here is your key: 49c895a8
// Please append it to all of your API requests,
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=49c895a8
// http://www.omdbapi.com/?apikey=49c895a8&t=wild%20hogs
