/* script to check if a user is signed in or not
 * If user is logged in: display logout button only
 * If user is not logged in: display register and log in button
 */

 // Get the nav menu buttons
var buttonsLoggedIn = document.getElementsByClassName("menu-logged-in");
var buttonsLoggedOut = document.getElementsByClassName("menu-logged-out");

// A session is present
if (document.cookie){
    for (var i = 0; i < buttonsLoggedIn.length; i++){
        buttonsLoggedIn[i].style.visibility = "visible";
    }
    for (var i = 0; i < buttonsLoggedOut.length; i++){
        buttonsLoggedOut[i].style.visibility = "hidden";
    }
}
// A session is not present
else {
    for (var i = 0; i < buttonsLoggedIn.length; i++){
        buttonsLoggedIn[i].style.visibility = "hidden";
    }
    for (var i = 0; i < buttonsLoggedOut.length; i++){
        buttonsLoggedOut[i].style.visibility = "visible";
    }
}