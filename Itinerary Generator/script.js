mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbnQxM3UiLCJhIjoiY2xpMXJoZ2RvMDcyNjNkcGd5bnUwaG04aiJ9.l6C9K2TmrHuGYlHoE_-ZGA';
const citiesContainer = document.getElementById('cities-container')
const searchText = document.getElementById('search-text')
const searchButton = document.getElementById('search-button')

const detailsContainer = document.querySelector('.details-container')
const longitudeOutput = document.getElementById('longitude-output')
const latitudeOutput = document.getElementById('latitude-output')
const locationOutput = document.getElementById('location-output')
const languageOutput = document.getElementById('language-output')
detailsContainer.style.visibility ='hidden'


// Creating a new map instance
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [78.9629, 20.5937], // India's coordinates
    zoom: 5
  });

// Added navigation controls to the map
map.addControl(new mapboxgl.NavigationControl());

map.on('click', async (e) => {
    const { lng, lat } = e.lngLat; // Get the longitude and latitude of the clicked location
    console.log('Selected city coordinates:', lng, lat);
    // Perform actions with the selected city
    // For example: add a marker, store the coordinates, etc.
    try {
        // const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place&access_token=${mapboxgl.accessToken}`);
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place&country=IN&access_token=${mapboxgl.accessToken}`);
        const data = await response.json(); // Retrieve the geocoding data for the selected location
        const place = data.features[0]; // Get the first place result from the geocoding data

        const cityDiv = createCityElement(place.text);
        addCityEventListener(cityDiv);
    } catch (error) {
        console.log('Error: ',error);
    }
});

function createCityElement(cityName) {
    const cityDiv = document.createElement('div');
    cityDiv.innerHTML = cityName;
    cityDiv.classList.add('new-city');
    citiesContainer.appendChild(cityDiv);

    if (citiesContainer.children.length > 9) {
        // Remove the first city div if the container already has 9 or more city divs
        citiesContainer.removeChild(citiesContainer.firstChild);
    }

    return cityDiv;
}
  
// Define a function named addCityEventListener that adds a click event listener to the provided cityDiv element
function addCityEventListener(cityDiv) {
    cityDiv.addEventListener('click', () => {
        const cityName = cityDiv.innerHTML; // Get the name of the city from the innerHTML of the cityDiv element
        // Check if the cityDiv already has the 'selected' class in below line
        const isSelected = cityDiv.classList.contains('selected');
        // Fetch geocoding data for the selected city using the Mapbox Geocoding API
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?types=place&country=IN&access_token=${mapboxgl.accessToken}`)
            .then(response => response.json()) // Retrieve the response data in JSON format
            .then(data => {
                const lng = data.features[0].center[0]; // Get the longitude of the selected city from the API response
                const lat = data.features[0].center[1]; // Get the latitude of the selected city from the API response
                map.setCenter([lng, lat]); // Center the map on the selected city
                // map.setZoom(8); // Set the zoom level of the map to 8

                // Get the current zoom level of the map
                const currentZoom = map.getZoom();

                // Set the zoom level based on whether the city is already selected or not
                if (!isSelected) {
                    map.setZoom(8); // Set the zoom level to 10 if city is already selected
                } else if (isSelected & currentZoom==8) {
                    map.setZoom(9); // Set the zoom level to 8 for the first click on the city
                } else if (isSelected & currentZoom==9) {
                    map.setZoom(10); // Set the zoom level to 8 for the first click on the city
                } else if (isSelected & currentZoom==10) {
                    map.setZoom(11); // Set the zoom level to 8 for the first click on the city
                } else if (isSelected & currentZoom==11) {
                    map.setZoom(12); // Set the zoom level to 8 for the first click on the city
                } else if (isSelected & currentZoom==12) {
                    map.setZoom(8); // Set the zoom level to 8 for the first click on the city
                }

                longitudeOutput.innerHTML=lng
                latitudeOutput.innerHTML=lat
                locationOutput.innerHTML=data.features[0].place_name
                languageOutput.innerHTML=''
                
                // Remove the 'selected' class from all city elements in the citiesContainer
                citiesContainer.querySelectorAll('.new-city').forEach(city => {
                    city.classList.remove('selected');
                });
                cityDiv.classList.add('selected'); // Add the 'selected' class to the clicked cityDiv element
                
                // detailsContainer.style.display = 'block';
                detailsContainer.style.visibility ='visible'
            });
    });
    // longitudeOutput.innerHTML=lng
}

function searchMap() {
    // Center the map on the selected city
    const cityName = searchText.innerHTML[0].toUpperCase() + searchText.innerHTML.slice(1); // Get the name of the selected city
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?types=place&country=IN&access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
            const lng = data.features[0].center[0]; // Get the longitude of the selected city
            // console.log(lng);
            const lat = data.features[0].center[1]; // Get the latitude of the selected city
            // console.log(lat);
            map.setCenter([lng,lat]); // Center the map on the selected city
            map.setZoom(8); // Zoom in to level 8

            const place = data.features[0]; // Get the first place result from the geocoding data
            const cityDiv = createCityElement(cityName) // Create a new div element for the city
            addCityEventListener(cityDiv)
        })
};

// Add an event listener to the searchButton element that triggers the searchMap function when clicked
searchButton.addEventListener('click', searchMap)

// Add an event listener to the searchText element that clears the default text when clicked
searchText.addEventListener('click', () => {
  // Check if the innerHTML of searchText is equal to the default text "Enter city name here"
  if (searchText.innerHTML == 'Enter city name here') {
    searchText.innerHTML = '';
  }
})

// Add an event listener to the searchText element that triggers the searchMap function when the Enter key is pressed
searchText.addEventListener('keydown', (event) => {
  // Check if the key pressed is the Enter key
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default behavior of the Enter key
    searchMap(); // Call the searchMap function
  }
})


// const cities = document.querySelectorAll('.new-city');
// cities.forEach(city => {
//     city.addEventListener('click', () => {
//         cities.forEach(city => city.classList.remove('selected'))
//         city.classList.add('selected')
//     })
// })



// const googleApiKey = 'AIzaSyA_aIEJC_YCrlSlJodYKap6uVcmG6ng-Tk'; // Replace 'YOUR_API_KEY' with your actual API key

// async function getCityDetails(cityName) {
//   try {
//     const cityName = document.getElementById('city-input').innerHTML
//     const response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mumbai&inputtype=textquery&fields=formatted_address,name,geometry&key=${googleApiKey}`);
//     const data = await response.json();

//     if (data.status === 'OK' && data.candidates.length > 0) {
//       const city = data.candidates[0];
//       const cityName = city.name;
//       const formattedAddress = city.formatted_address;
//       const location = city.geometry.location;

//       console.log('City:', cityName);
//       console.log('Formatted Address:', formattedAddress);
//       console.log('Latitude:', location.lat);
//       console.log('Longitude:', location.lng);
//     } else {
//       console.log('City not found');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// cityDetailsButton.addEventListener('click', getCityDetails)
// Example usage:
// getCityDetails('Mumbai');

        
// const apiKey = '579b464db66ec23bdd00000157a04bfcdacb4c91590661b445c89c9b'; // Replace 'YOUR_API_KEY' with your actual API key
// fetch(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?format=json&city=${cityName}&api-key=${apiKey}`)
//     .then(response => response.json())
//     .then(data => {
//     if (data && data.records && data.records.length > 0) {
//         const city = data.records[0];
//         const state = city.state;
//         const language = city.majorlanguages;

//         console.log('City:', cityName);
//         console.log('State:', state);
//         console.log('Language:', language);
//     } else {
//         console.log('City not found');
//     }
//     })
//     .catch(error => {
//     console.error('Error:', error);
//     });
        
// API Key: 579b464db66ec23bdd00000157a04bfcdacb4c91590661b445c89c9b

// Default Public Token: pk.eyJ1IjoiYW5hbnQxM3UiLCJhIjoiY2xpMXJoZ2RvMDcyNjNkcGd5bnUwaG04aiJ9.l6C9K2TmrHuGYlHoE_-ZGA
