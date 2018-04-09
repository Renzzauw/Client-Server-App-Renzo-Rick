// add event "onchange" listener to sorting menu
$("#sort").change(function (){
    $("#catalogue").empty().load("/products?sort=" + $("#sort").val());
});

// add even "onsubmit" listener to the search form
$("#search-bar").keyup(function (){
    console.log("click");
    $("#catalogue").empty().load("/products?sort=" + $("#sort").val() + "&search=" + $("#search-bar").val());
});

// initialize product sorting with alphabetical order when initially loading index page
$("#catalogue").empty().load("/products?sort=" + $("#sort").val());
