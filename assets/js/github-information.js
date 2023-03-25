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
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}


/**
 * This function takes an array of repositories 
 * and generates HTML code to display 
 * the list of repositories on the webpage.
 * If the input array is empty, 
 * it returns a message indicating 
 * that there are no repositories to display.
 * If the input array is not empty, 
 * it generates an HTML unordered 
 * list of repositories with links to their GitHub page.
 * The function returns the HTML code as a string.
 */
function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

/**
 * This function is used to fetch user and repository
 * information from the GitHub API and display it on 
 * the webpage.
 * @param {Event} event - The event that triggered 
 * the function call.
 * The function does the following:
 * * Gets the GitHub username entered by the user
 *  in the input field.
 * * If the username is not entered, it displays 
 * a message asking the user to enter a username.
 * * Displays a loader image while the information 
 * is being fetched from the GitHub API.
 * * Makes two API calls to retrieve user and 
 * repository information for the entered username.
 * * If both the API calls are successful, 
 * it retrieves the user and repository data and 
 * displays it on the page.
 * * If there is an error in fetching the data, 
 * it displays an appropriate error message on the page.
*/
function fetchGitHubInformation(event) {
    /**
     * fix the bug so that empty the text box and repos
     */
    $("#gh-user-data").empty();
    $("#gh-repo-data").empty();

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
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function(erroResponse) {
            if (erroResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else if (erroResponse.status === 403) {
                var resetTime = new Date(erroResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(erroResponse);
                $("#gh-user-data").html(`<h2>Error: ${erroResponse.responseJSON.message}</h2>`);
            }
        }
    );
}

// Default loading of octocat profile
// when loading the page
$(document).ready(fetchGitHubInformation);