function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const timezoneElement = document.getElementById("timezone");
            const dateTimeElement = document.getElementById("dateTime");

            timezoneElement.textContent = `Timezone: ${data.timezone}`;
            dateTimeElement.textContent = `Local Date and Time: ${data.date_time_txt}`;
        })
        .catch(error => {
            console.error("Error fetching timezone information:", error);
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}