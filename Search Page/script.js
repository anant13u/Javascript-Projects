
const googleButton = document.getElementById('google-container')
const youtubeButton = document.getElementById('youtube-container')
const redditButton = document.getElementById('reddit-container')
const twitterButton = document.getElementById('twitter-container')

googleButton.addEventListener('click',openGoogle)
youtubeButton.addEventListener('click',openYoutube)
redditButton.addEventListener('click',openReddit)
twitterButton.addEventListener('click',openTwitter)

function openGoogle() {
    const searchQuery = document.getElementById('search-box').innerHTML
    if (searchQuery=='Enter the search keyword here'||searchQuery=='') {
        alert('Please enter a search keyword')
    }
    else {
    window.open(`https://www.google.com/search?q=${searchQuery}`)
    }
}

function openYoutube() {
    const searchQuery = document.getElementById('search-box').innerHTML
    if (searchQuery=='Enter the search keyword here'||searchQuery=='') {
        alert('Please enter a search keyword')
    }
    else {
    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`)
    }
}

function openReddit() {
    const searchQuery = document.getElementById('search-box').innerHTML
    if (searchQuery=='Enter the search keyword here'||searchQuery=='') {
        alert('Please enter a search keyword')
    }
    else {
    window.open(`https://www.reddit.com/search/?q=${searchQuery}`)
    }
}

function openTwitter() {
    const searchQuery = document.getElementById('search-box').innerHTML
    if (searchQuery=='Enter the search keyword here'||searchQuery=='') {
        alert('Please enter a search keyword')
    }
    else {
    window.open(`https://twitter.com/search?q=${searchQuery}`)
    }
}


// https://www.google.com/search?q=
// https://www.reddit.com/search/?q=
// https://twitter.com/search?q=