
/*
// add event "onchange" listener to sorting menu
$("#sort").change(function (){
    $("#catalogue").empty().load("/products?sort=" + $("#sort").val());
});*/

$("#genre-checkboxes").load("/genres");
$("#publisher-checkboxes").load("/publishers");

// get all checkboxes and check if they are checked
var checkboxList = $("[type=checkbox]");
var checkQueries = "";

// add event listeners to each checkbox
for (var j = 0; j < checkboxList.length; j++) {
    checkboxList[j].change(function(){
        checkQueries = "";
        // generate query segments for each checkbox
        for (var i = 0; i < checkboxList.length; i++){
            if (checkboxList[i].is(':checked') && i === checkboxList.length - 1){
                checkQueries += checkboxList[i].attr('id') + "=true";
            }    
            else if (checkboxList[i].is(':checked')){
                checkQueries += checkboxList[i].attr('id') + "=true&";
            }
            else if (i === checkboxList.length() - 1) {
                checkQueries += checkboxList[i].attr('id') + "=false";
            }
            else {
                checkQueries += checkboxList[i].attr('id') + "=false&";
            }
        }
    })
}

// get min & max price fields
var min = $("#price-min");
var max = $("#price-max");

// disable submitting when using the search bar
$("#search-form").submit(false);

// add even "onsubmit" listener to the search form
$("#search-bar").on('input', function(event){
    $("#catalogue").load("/products?sort=" + $("#sort").val() + "&search=" + $("#search-bar").val() + "&" + checkQueries);
});

// Send search configuration to server and load products
$('#filters-form').change(function(){
    $("#catalogue").load("/products?sort=" 
                        + $("#sort").val()                      // sort mode
                        + "&search=" + $("#search-bar").val()   // searchbar value
                        + "&" + checkQueries                    // all checkbox restriction values
                        + "&min=" + $("#price-min").val()       // minimum price range
                        + "&max=" + $("#price-max").val());     // maximum price range
});

// initialize product sorting with alphabetical order when initially loading index page
$("#catalogue").load("/products?sort=alphabet");


