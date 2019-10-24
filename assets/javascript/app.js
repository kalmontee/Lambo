var topics = ['animals', 'cars', 'minions'];

$(document).on('click', '.topics', displayTopicsInfo);

renderButtons();

function displayTopicsInfo() {

    var name = $(this).attr("data-type");
    var APIKey = "IcqtslR9hjOS6kk8EC1CldDCskqZoWYT";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=" + APIKey + "&limit=10";

    // Each time user clicks a different button we want to empty out the previous gif imgs 
    $('#topics-view').empty();

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response) {
        // Testing purposes only
        console.log(queryURL);
        console.log(response);
        $('#topics-view').text(JSON.stringify(Response));

        var results = response.data;

        // Loop through response.data to retrieve info
        for (var i = 0; i < results.length; i++) {
            // create a new Div to store data
            var inputDiv = $('<div>');

            // add a class to the inputDiv
            inputDiv.addClass('inputDiv');

            // Include the title of the gif image
            var title = $('<p>').text('Title: ' + results[i].title);

            // Include the rating in a paragraph tag
            var rating = $('<p>').text('Rating: ' + results[i].rating);

            // Get the still URL gif img
            var imgURL = response.data[i].images['480w_still'].url

            // Get the animate URL gif img
            var animateURL = response.data[i].images['fixed_height'].url

            // Target the img attr data-state, data-still, and data-animate to pause and play gif img
            var inputImage = $('<img>').attr({
                'data-state': 'still',
                'src': imgURL,
                'data-still': imgURL,
                'data-animate': animateURL,
                'class': 'gif'
            });

            // append paragraph and image tag to inputDiv
            inputDiv.append(title);
            inputDiv.append(rating);
            inputDiv.append(inputImage);
            $("#topics-view").append(inputDiv);
        }

        // Set the click events gif img to display still and animate.
        $('.gif').on('click', function() {
            var state = $(this).attr('data-state');

            if (state === 'still') {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");

            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
}

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

    // Push whatever topic to topic inputs. Will be set as a button
    topics.push(topics_input);

    renderButtons();
});