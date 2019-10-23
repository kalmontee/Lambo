var topics = ['animals', 'cars', 'minions'];

function displayTopicsInfo() {

    var topic = $(this).attr("data-name");
    var APIKey = "IcqtslR9hjOS6kk8EC1CldDCskqZoWYT";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + APIKey + "&limit=10" + "&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response) {
        console.log(queryURL);
        console.log(response);
        $('#topics-view').text(JSON.stringify(Response));

        // var topicsDiv = $("<div class='topics'>");

        // var rating = response.rating;

        // var pOne = $("<p>").text('Rating ' + rating);

    });
}
displayTopicsInfo();

function renderButtons() {
    $('#topics-view').empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass('topics');
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $('#topics-view').append(button);
    }
}
$('#input-button').on('click', function(event) {
    event.preventDefault();

    var topics_input = $('#topics-input').val().trim();

    topics.push(topics_input);
    console.log(topics);

    renderButtons();

});

$(document).on('click', '.topics', displayTopicsInfo);

renderButtons();