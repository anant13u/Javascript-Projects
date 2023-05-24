mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbnQxM3UiLCJhIjoiY2xpMXJoZ2RvMDcyNjNkcGd5bnUwaG04aiJ9.l6C9K2TmrHuGYlHoE_-ZGA';


// Creating a new map instance
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [78.9629, 20.5937], // India's coordinates
    zoom: 5
  });

// Added navigation controls to the map
map.addControl(new mapboxgl.NavigationControl());

// Event listener for city selection
map.on('click', async (e) => {
    const { lng, lat } = e.lngLat;
    console.log('Selected city coordinates:', lng, lat);
    // Perform actions with the selected city
    // For example: add a marker, store the coordinates, etc.
    try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place&access_token=${mapboxgl.accessToken}`);
        const data = await response.json();
        const cityName = data.features[0].text;
        console.log('Selected city:', cityName);

    } catch (error) {
        console.log('Error: ',error)
    }
  });



// Default Public Token: pk.eyJ1IjoiYW5hbnQxM3UiLCJhIjoiY2xpMXJoZ2RvMDcyNjNkcGd5bnUwaG04aiJ9.l6C9K2TmrHuGYlHoE_-ZGA




