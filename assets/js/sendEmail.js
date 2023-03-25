/**
 * Send email using EmailJS.
 * Passes form values to service, template, and parameters.
 * Logs success and error responses.
 * Prevents default form submission behavior.
*/
function sendMail(contactForm) {
    emailjs.send("mycv_pjmail", "pjcv", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
        .then(
            function (response) {
                console.log("SUCCESS!", response);
            },
            function (error) {
                console.log("FAILED!", error)

            })
    return false;
}