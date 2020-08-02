

var cityNames = JSON.parse(localStorage.getItem("search_history")) || [];


$("#city-search").click(function (event){
    event.preventDefault();
    var city = $("#city-name").val();
    getForecast(city);
    $("#city-stats").text(city);
    cityNames.push(city);
    localStorage.setItem("search_history", JSON.stringify(cityNames));
    historyButtonMaker();
})

function historyButtonMaker () {
    $("#list").empty();
    for (var i=0; i < cityNames.length; i++) {
        var listCities = $("<li>").text(cityNames[i]);
        $("#list").append(listCities);
    }
}
historyButtonMaker();

function getForecast (cityname) {
    var apiKey = "dd7f8b34000563dacdc6cada582ea1cf";

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);


});
}


