var topics = ['animals', 'cars', 'minions'];

$(document).on('click', '.topics', displayTopicsInfo);

renderButtons();

function displayTopicsInfo() {

    var topic = $(this).attr("data-type");
    var APIKey = "IcqtslR9hjOS6kk8EC1CldDCskqZoWYT";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + APIKey + "&limit=10" + "&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response) {
        console.log(queryURL);
        console.log(response);
        $('#topics-view').text(JSON.stringify(Response));

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            // create a new Div to store data
            var inputDiv = $('<div>');
            inputDiv.addClass('inputDiv');

            // Include the rating in a paragraph tag
            var rating = results[i].rating;
            var p = $('<p>').text('Rating: ' + rating);

            // storing gif images in a img tag
            var inputImage = $('<img>');

            // src attribute of the image to a property
            inputImage.attr("src", results[i].images.fixed_height.url);

            // append paragraph and image tag to inputDiv
            inputDiv.append(p)
            inputDiv.append(inputImage);

            $("#topics-view").append(inputDiv);
        }

    });
}
// displayTopicsInfo();

function renderButtons() {
    $('#topics-view').empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass('topics');
        button.attr("data-type", topics[i]);
        button.text(topics[i]);
        $('#topics-view').append(button);
    }
}

$('#add-topics').on('click', function(event) {
    event.preventDefault();

    var topics_input = $('#topics-input').val().trim();

    topics.push(topics_input);
    console.log(topics);

    renderButtons();

});