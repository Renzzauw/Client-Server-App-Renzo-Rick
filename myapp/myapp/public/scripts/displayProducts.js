/*
var xhttp;
var sortMode;
var dropDown = $(".dropdown").first();

sortmode = dropDown.val();//"alphabetical";

if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
    xhttp = new ActiveXObject("Microsoft.XMLHTPP");
}
else {
  alert("your browser doe not support XMLHTTP!");
}

//var url = "?sortby=" + dropDown.nodeValue;

$("#catalogue").empty().load("/products");

$.get("/products?sortby="+sortMode, function ( data ) {
    $("#catalogue").empty().html(data);
    console.log("data loaded");
});
*/






$("#sort").change(function (){
    $("#catalogue").empty().load("/products?sort=" + $("#sort").val(), function(){
        
    });
});


$("#catalogue").empty().load("/products?sort=" + $("#sort").val(), function(){

});

/*
$.get("/products", function(data){
    alert(data);
    $("#catalogue").html(data);
});
*/







/*
var searchButton = $("#search-button").click(function(){
    $.get("/products?" + "search=" + $("#search-bar").val() + "&sort=" + $("#sort").val(), function(data){
        $("#catalogue").html(data);
    });
    
    //$.get("/products");
});
*/