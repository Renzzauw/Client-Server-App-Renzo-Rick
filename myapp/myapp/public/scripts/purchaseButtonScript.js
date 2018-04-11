// function to toggle on the confirmation screen
function toggleConfirmationScreen() {
    confirmationScreen.toggle();
}

// purchase confirmed, proceed to send transaction to server
function proceed() {
    // transaction...
    

    // end transaction and close confirmationscreen
    confirmationScreen.toggle();
    alert("Transaction succesful!");
}

// get confirmation screen and its buttons and add event listeners to it
var confirmationScreen = $("#confirmation-screen").toggle();
var cancel = $("#cancel").click(toggleConfirmationScreen());
var confirm = $("#confirm").click(proceed());

// variable for productid
var product;

// function started by clicking on a buy button of a product
function buyProduct(productid){
    product = productid;
    confirmationScreen.toggle();

}







