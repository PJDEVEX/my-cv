/*
This function takes a user object as input and returns 
an HTML code as a string to display the user i
nformation on the webpage.

The HTML code includes:

A header with the user's name and a link to their 
GitHub profile
A sub-header with the user's username
An avatar image of the user linked to their profile
A paragraph with the user's followers, following, 
and public repositories count
The user object is used to fill in the values for 
each element in the HTML code using template literals.
*/
function userInformationHTML(user) {
    return `<h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
        <h2>
        <div class="gh-conent">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

/**

Function fetches the GitHub user information,
using the username entered in the input field.
If the username is not entered, it displays an error message.
It also displays a loading spinner while fetching the data.
It uses jQuery's $.when() and .then() methods to make an AJAX request
to the GitHub API and handle success and error responses.
*/
function fetchGitHubInformation(event) {
    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading..." />
        </div>`
    );
    $.when(
        $.getJSON(`https://api.github.com/user/${username}`)
    ).then(
        function(response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
        },
        function(erroResponse) {
            if (erroResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(erroResponse);
                $("#gh-user-data").html(`<h2>Error: ${erroResponse.responseJSON.message}</h2>`);
            }
        }
    );
}
