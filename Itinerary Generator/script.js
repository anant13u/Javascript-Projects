mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbnQxM3UiLCJhIjoiY2xpMXJoZ2RvMDcyNjNkcGd5bnUwaG04aiJ9.l6C9K2TmrHuGYlHoE_-ZGA';
const citiesContainer = document.getElementById('cities-container')
const cityDetailsButton = document.getElementById('get-city-details')
const searchText = document.getElementById('search-text')
const searchButton = document.getElementById('search-button')

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

        const cityDiv = document.createElement('div'); // Create a new div element for the city
        cityDiv.innerHTML = place.text; // Set the inner HTML of the div to the city name
        cityDiv.classList.add('new-city'); // Add the 'new-city' class to the div
        console.log('Selected city:', place.text);
        citiesContainer.appendChild(cityDiv); // Append the city div to the cities container
    } catch (error) {
        console.log('Error: ',error);
    }

    const cities = document.querySelectorAll('.new-city');
    cities.forEach(city => {
        city.addEventListener('click', () => {
            // Center the map on the selected city
            const cityName = city.innerHTML; // Get the name of the selected city
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?types=place&country=IN&access_token=${mapboxgl.accessToken}`)
                .then(response => response.json())
                .then(data => {
                    const lng = data.features[0].center[0]; // Get the longitude of the selected city
                    // console.log(lng);
                    const lat = data.features[0].center[1]; // Get the latitude of the selected city
                    // console.log(lat);
                    map.setCenter([lng,lat]); // Center the map on the selected city
                    map.setZoom(8); // Zoom in to level 6

                    cities.forEach(city => city.classList.remove('selected')); // Remove 'selected' class from all cities
                    city.classList.add('selected'); // Add 'selected' class to the clicked city
                });
        });
            // city.addEventListener('dblclick', () => {
                //     map.setZoom(8)
                // })
    });
});

searchButton.addEventListener('click', () => {
    // Center the map on the selected city
    const cityName = searchText.innerHTML; // Get the name of the selected city
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?types=place&country=IN&access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
            const lng = data.features[0].center[0]; // Get the longitude of the selected city
            // console.log(lng);
            const lat = data.features[0].center[1]; // Get the latitude of the selected city
            // console.log(lat);
            map.setCenter([lng,lat]); // Center the map on the selected city
            map.setZoom(8); // Zoom in to level 6
        });
});
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
