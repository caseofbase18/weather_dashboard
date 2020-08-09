var apiKey = "dd7f8b34000563dacdc6cada582ea1cf";
var cityNames = JSON.parse(localStorage.getItem("search_history")) || [];

if (cityNames.length > 0) {
    getForecast(cityNames[cityNames.length-1]);
    fiveDayForecast(cityNames[cityNames.length-1]);
}

// this function allows the user to search for the cities and stores the cities into local storage
$("#city-search").click(function (event) {
    event.preventDefault();
    var city = $("#city-name").val();
    getForecast(city);
    cityNames.push(city);
    localStorage.setItem("search_history", JSON.stringify(cityNames));
    historyButtonMaker();
    fiveDayForecast(city);
})

// this function allows the user to refresh the city while appending searched cities
function historyButtonMaker() {
    $("#list").empty();
    for (var i = 0; i < cityNames.length; i++) {
        var listCities = $("<button class='previous-search'>").text(cityNames[i]);

        $("#list").append(listCities);
    }
}
historyButtonMaker();


$(document).on("click", ".previous-search", function (event) {
    event.preventDefault();
    var city = $(this).text();
    console.log(city);
    getForecast(city);
    fiveDayForecast(city);
})

// gets forecast of city
function getForecast(cityname) {

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $(".city-stats").empty();

        var kelvinTemp = response.main.temp;
        var farTemp = (kelvinTemp - 273.15) * 1.80 + 32;

        var date = moment().format('l');
        var name = $("<h2>").text(response.name + " " + "(" + date + ")");
        var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        var temp = $("<p>").text("Temperature: " + Math.round(farTemp) + "°F");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");

        $(".city-stats").append(name, weatherIcon, temp, humidity, windSpeed);

        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        uvIndex(latitude, longitude);
    });
}

// gets UVI for city
function uvIndex(lat, lon) {

    var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var uvIndexVal= response.value;
        var color;

        if (uvIndexVal <= 2) {
            color= "green"
        } else if (uvIndexVal >=3 && uvIndexVal <=5) {
            color= "orange"
        } else {
            color= "red"
        }

        var uvI = $("<p>").text("UV Index: " + response.value).css("color", color);
        console.log(response.value);

        $("#uv-index").append(uvI);

    });
}


// gets five day forecast for searched
function fiveDayForecast(fiveday) {
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day5").empty();

    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${fiveday}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var kelvinTemp1 = response.list[1].main.temp;
        var farTemp1 = (kelvinTemp1 - 273.15) * 1.80 + 32;

        var kelvinTemp2 = response.list[9].main.temp;
        var farTemp2 = (kelvinTemp2 - 273.15) * 1.80 + 32;

        var kelvinTemp3 = response.list[17].main.temp;
        var farTemp3 = (kelvinTemp3 - 273.15) * 1.80 + 32;

        var kelvinTemp4 = response.list[25].main.temp;
        var farTemp4 = (kelvinTemp4 - 273.15) * 1.80 + 32;

        var kelvinTemp5 = response.list[33].main.temp;
        var farTemp5 = (kelvinTemp5 - 273.15) * 1.80 + 32;


        var date1 = $("<p>").text(moment().add(1, 'days').format('l'));
        var weatherIcon1 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[1].weather[0].icon + ".png");
        var temp1 = $("<p>").text("Temp: " + Math.round(farTemp1) + "°F");
        var humidity1 = $("<p>").text("Humidity: " + response.list[1].main.humidity + "%");


        var date2 = $("<p>").text(moment().add(2, 'days').format('l'));
        var weatherIcon2 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[9].weather[0].icon + ".png");
        var temp2 = $("<p>").text("Temp: " + Math.round(farTemp2) + "°F");
        var humidity2 = $("<p>").text("Humidity: " + response.list[9].main.humidity + "%");


        var date3 = $("<p>").text(moment().add(3, 'days').format('l'));
        var weatherIcon3 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[17].weather[0].icon + ".png");
        var temp3 = $("<p>").text("Temp: " + Math.round(farTemp3) + "°F");
        var humidity3 = $("<p>").text("Humidity: " + response.list[17].main.humidity + "%");


        var date4 = $("<p>").text(moment().add(4, 'days').format('l'));
        var weatherIcon4 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[25].weather[0].icon + ".png");
        var temp4 = $("<p>").text("Temp: " + Math.round(farTemp4) + "°F");
        var humidity4 = $("<p>").text("Humidity: " + response.list[25].main.humidity + "%");


        var date5 = $("<p>").text(moment().add(5, 'days').format('l'));
        var weatherIcon5 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[33].weather[0].icon + ".png");
        var temp5 = $("<p>").text("Temp: " + Math.round(farTemp5) + "°F");
        var humidity5 = $("<p>").text("Humidity: " + response.list[33].main.humidity + "%");


        $("#day1").append(date1, weatherIcon1, temp1, humidity1);
        $("#day2").append(date2, weatherIcon2, temp2, humidity2);
        $("#day3").append(date3, weatherIcon3, temp3, humidity3);
        $("#day4").append(date4, weatherIcon4, temp4, humidity4);
        $("#day5").append(date5, weatherIcon5, temp5, humidity5);

    });
}








