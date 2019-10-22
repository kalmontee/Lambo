// Get API key, topics, limit, and rating
var APIKey = "IcqtslR9hjOS6kk8EC1CldDCskqZoWYT";
var topics = ['animals', 'cars', 'minions'];

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=" + APIKey + "&limit=10" + "&rating=g";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});