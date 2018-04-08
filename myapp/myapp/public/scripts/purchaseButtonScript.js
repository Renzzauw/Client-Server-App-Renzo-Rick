// get confirmation screen
var confirmationScreen = $("#confirmation-screen");

// function to toggle on the confirmation screen
function toggleConfirmationScreen() {
    confirmationScreen.toggle();
}

var cancel = $("#cancel").click(toggleConfirmationScreen());
