# Weather Dashboard ☀️

A simple weather dashboard that allows users to search for any city and view real-time weather data including temperature, wind, humidity, precipitation, and local time.

This project was built to practice working with APIs, asynchronous JavaScript, and dynamic DOM updates.


## Features

* Search weather by city
* Real-time weather data
* Fahrenheit / Celsius unit toggle
* Displays:

  * Current temperature
  * Daily high and low
  * Feels like temperature
  * Wind speed
  * Humidity
  * Precipitation chance
  * Local date and time of the searched location
* Default weather display on page load
* Error handling for invalid location searches
* Responsive layout


## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Weather API


## API

This project uses the **WeatherAPI** service to retrieve weather and location data.

Data fetched includes:

* Current weather conditions
* Daily forecast data
* Local timezone and time


## How It Works

1. User enters a city in the search field.
2. JavaScript sends a request to the Weather API.
3. The API returns weather and location data.
4. The UI updates dynamically with the results.

Temperature units can be toggled between Fahrenheit and Celsius without reloading the page.


## Error Handling

If the user searches for an invalid location:

* The API request fails
* A message is displayed indicating that the location could not be found
* The UI prevents broken data from rendering


## Project Structure

```
weather-app/
│
├── index.html
├── style.css
├── main.js
└── README.md
```


## Screenshots

<img width="1919" height="941" alt="image" style="border-radius:20" src="https://github.com/user-attachments/assets/935322df-29f9-4d60-a68a-a9c5ba74eb10" />

<img width="605" height="943" alt="image" style="border-radius:20" src="https://github.com/user-attachments/assets/d421007a-29c3-4a98-95cb-1b2ba2e4f6ed" />



## Future Improvements

* Autocomplete location search
* Weather icons based on conditions
* 7-day forecast
* Geolocation (detect user's current location)
* Search history


## Author

Made with ❤️ by Muaz
© 2026 All Rights Reserved
