mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbnQxM3UiLCJhIjoiY2xpMXJoZ2RvMDcyNjNkcGd5bnUwaG04aiJ9.l6C9K2TmrHuGYlHoE_-ZGA';
const citiesContainer = document.getElementById('cities-container')

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
    // map.setZoom(5)
    const { lng, lat } = e.lngLat; // Get the longitude and latitude of the clicked location
    console.log('Selected city coordinates:', lng, lat);
    // Perform actions with the selected city
    // For example: add a marker, store the coordinates, etc.
    try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place&access_token=${mapboxgl.accessToken}`);
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
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?types=place&access_token=${mapboxgl.accessToken}`)
                .then(response => response.json())
                .then(data => {
                    const lng = data.features[0].center[0]; // Get the longitude of the selected city
                    console.log(lng);
                    const lat = data.features[0].center[1]; // Get the latitude of the selected city
                    console.log(lat);
                    map.setCenter([lng,lat]); // Center the map on the selected city
                    map.setZoom(6); // Zoom in to level 6

                    cities.forEach(city => city.classList.remove('selected')); // Remove 'selected' class from all cities
                    city.classList.add('selected'); // Add 'selected' class to the clicked city
                });
        });

        // city.addEventListener('dblclick', () => {
        //     map.setZoom(8)
        // })
    });
});



// cities.forEach(city => {
//     city.addEventListener('click', () => {
//         console.log(cities)
//         console.log(cityName)

//         fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?types=place&access_token=${mapboxgl.accessToken}`)


//                 // Add a class to visually indicate the selected city

//             })
//             .catch(error => {
//                 console.log('Error: ', error)
//             })

//     });
// });



// Default Public Token: pk.eyJ1IjoiYW5hbnQxM3UiLCJhIjoiY2xpMXJoZ2RvMDcyNjNkcGd5bnUwaG04aiJ9.l6C9K2TmrHuGYlHoE_-ZGA
