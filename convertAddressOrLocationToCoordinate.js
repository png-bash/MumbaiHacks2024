const axios = require('axios');

async function getCoordinates(address) {
    try {
        // Replace spaces with '+' for URL encoding
        const encodedAddress = encodeURIComponent(address);

        // Send GET request to Nominatim API
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`);

        if (response.data.length === 0) {
            console.log("Location not found.");
            return null;
        }

        // Extract latitude and longitude from the response
        const { lat, lon } = response.data[0];
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        return { latitude: lat, longitude: lon };
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        return null;
    }
}

// Example usage
// const address = "1600 Amphitheatre Parkway, Mountain View, CA";
const address = "Kurla, Mumbai";
// Be Careful while taking the input for the address due to the case when address = "Kurla"
getCoordinates(address);

