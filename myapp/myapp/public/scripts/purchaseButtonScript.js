/* 
 * script to handle purchasing of items
 */

// product variables
var product;
var name;
var price;

// this script is called when a product buy button is clicked
function buyProduct(productid, productname, productprice) {
    // check if a user is logged in, if so proceed to displaying confirmation screen
    if(document.cookie){
        product = productid;
        name = productname;
        price = productprice;
        $("#confirmation-screen").toggle();
        $("#confirmation-text").html("Are you sure you want to buy " + productname + " for €"+ productprice + "?");
    }
    // cancel purchase: no user is logged in
    else {
        alert("You need to log in before you can buy any product!");
    } 
}

// cancel purchase, toggle confirmation screen off
$("#cancel").click(function() {
    $("#confirmation-screen").toggle();
});

// confirm purchase, send purchase to server and toggle confirmation screen off
$("#confirm").click(function() {
    $.post( "/", { productid: product, productprice: price });
    $("#confirmation-screen").toggle();
    alert("Succesfully purchased " + name);
});


