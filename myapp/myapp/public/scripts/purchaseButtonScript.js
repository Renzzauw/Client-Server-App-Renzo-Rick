var product;
var name;
var price;

function buyProduct(productid, productname, productprice) {
    if(document.cookie){
        product = productid;
        name = productname;
        price = productprice;
        $("#confirmation-screen").toggle();
        $("#confirmation-text").html("Are you sure you want to buy " + productname + " for €"+ productprice + "?");
    }
    else {
        alert("You need to log in before you can buy any product!");
    }
    
}

$("#cancel").click(function() {
    $("#confirmation-screen").toggle();
});

$("#confirm").click(function() {
    $.post( "/", { productid: product, productprice: price });
    $("#confirmation-screen").toggle();
    alert("Succesfully purchased " + name);
});


