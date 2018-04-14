var genreCheckBoxes = [];
var publisherCheckBoxes = [];
var checkGenresQueryJoined = "";
var checkedPublishersQueryJoined = "";

var checkedGenresQuery;
$("#genre-checkboxes").load("/genres", function() {
    genreCheckBoxes = $(".genrecheckboxes");
    $("#genre-checkboxes").on('click', function(){
        checkedGenresQuery = [];
        for (var i = 0; i < $(".genrecheckboxes").length; i++){
            if (genreCheckBoxes[i].checked === true) {
                checkedGenresQuery.push($(".genrecheckboxes")[i].id + "=true");
            } 
            else {
                checkedGenresQuery.push($(".genrecheckboxes")[i].id + "=false");
            }
        }
        checkGenresQueryJoined = checkedGenresQuery.join("&").replace(' ','_');
        console.log(checkGenresQueryJoined);
    });
});

var checkedPublishersQuery;
$("#publisher-checkboxes").load("/publishers", function() {
    publisherCheckBoxes = $(".publishercheckboxes");
    $("#publisher-checkboxes").on('click', function(){
        checkedPublishersQuery = [];
        for (var i = 0; i < $(".genrecheckboxes").length; i++){
            if (publisherCheckBoxes[i].checked === true) {
                checkedPublishersQuery.push($(".publishercheckboxes")[i].id + "=true");
            } 
            else {
                checkedPublishersQuery.push($(".publishercheckboxes")[i].id + "=false");
            }
        }
        checkedPublishersQueryJoined = checkedPublishersQuery.join("&").replace(' ','_');  
        console.log(checkedPublishersQueryJoined);
    });
});


// disable submitting when using the search bar
$("#search-form").submit(false);

// add even "onsubmit" listener to the search form
$("#search-bar").on('input', function(event){
    $("#catalogue").load("/products?sort="                      
                        + $("#sort").val()                      // sort mode
                        + "&search=" + $("#search-bar").val()   // searchbar value
                        + "&" + checkGenresQueryJoined          // genres checkboxes
                        + "&" + checkedPublishersQueryJoined    // publishers checkboxes
                        + "&min=" + $("#price-min").val()       // minimum price range
                        + "&max=" + $("#price-max").val());     // maximum price range
});

// Send search configuration to server and load products
$('#filters-form').change(function(){
    $("#catalogue").load("/products?sort="                      
                        + $("#sort").val()                      // sort mode
                        + "&search=" + $("#search-bar").val()   // searchbar value
                        + "&" + checkGenresQueryJoined          // genres checkboxes
                        + "&" + checkedPublishersQueryJoined    // publishers checkboxes
                        + "&min=" + $("#price-min").val()       // minimum price range
                        + "&max=" + $("#price-max").val());     // maximum price range
});

// initialize product sorting with alphabetical order when initially loading index page
$("#catalogue").load("/products?sort="                      
                        + $("#sort").val()                      // sort mode
                        + "&search=" + $("#search-bar").val()   // searchbar value
                        + "&" + checkGenresQueryJoined          // genres checkboxes
                        + "&" + checkedPublishersQueryJoined    // publishers checkboxes
                        + "&min=" + $("#price-min").val()       // minimum price range
                        + "&max=" + $("#price-max").val());     // maximum price range


