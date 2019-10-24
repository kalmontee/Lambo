var topics = ['animals', 'cars', 'minions'];

$(document).on('click', '.topics', displayTopicsInfo);

renderButtons();

function displayTopicsInfo() {

    var topic = $(this).attr("data-type");
    var APIKey = "IcqtslR9hjOS6kk8EC1CldDCskqZoWYT";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + APIKey + "&limit=10";

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

            // Include the title of the gif image
            var title = results[i].title;
            var pTitle = $('<p>').text('Title: ' + title);

            // Include the rating in a paragraph tag
            var rating = results[i].rating;
            var p = $('<p>').text('Rating: ' + rating);

            // inputImage.addClass('gif');
            var imgURL = response.data[i].images['480w_still'].url
            var animateURL = response.data[i].images['fixed_height'].url

            var inputImage = $('<img>').attr({
                'data-state': 'still',
                'src': imgURL,
                'data-still': imgURL,
                'data-animate': animateURL,
                'class': 'gif'
            });

            // append paragraph and image tag to inputDiv
            inputDiv.append(pTitle);
            inputDiv.append(p);
            inputDiv.append(inputImage);
            $("#topics-view").append(inputDiv);
        }

        $('.gif').on('click', function() {
            var state = $(this).attr('data-state');

            if (state === 'still') {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");

            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            console.log(state);
        });
    });
}
// displayTopicsInfo();


// Here is where buttons will be created and added
function renderButtons() {
    $('#button-topics').empty();

    for (var i = 0; i < topics.length; i++) {
        // create a button to store arrays of input
        var button = $("<button>");

        // add a class to the button for styling
        button.addClass('topics');

        // attribute source to target topics
        button.attr("data-type", topics[i]);

        // display the buttons topics
        button.text(topics[i]);
        $('#button-topics').append(button);
    }
}

$('#add-topics').on('click', function(event) {
    event.preventDefault();

    var topics_input = $('#topics-input').val().trim();

    topics.push(topics_input);
    console.log(topics);

    // $('.gif').empty();
    // console.log(inputDiv)

    renderButtons();
});