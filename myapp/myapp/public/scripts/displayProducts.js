var amount = 5;

// function to create url with all the queries
function createURL() {
    var url = "/products?sort="
            + $("#sort").val()                              // sort mode
            + "&search=" + $("#search-bar").val()           // searchbar value
            + "&min=" + $("#price-min").val()               // minimum price range
            + "&max=" + $("#price-max").val()               // maximum price range
            + "&amount=" + amount;                          // amount shown 
    // get selected genres
    if ($("#action").is(":checked")){url += "&action=true"} else {url += "&action=false"}
    if ($("#shooter").is(":checked")){url += "&shooter=true"} else {url += "&shooter=false"}
    if ($("#racing").is(":checked")){url += "&racing=true"} else {url += "&racing=false"}
    if ($("#platformer").is(":checked")){url += "&platformer=true"} else {url += "&platformer=false"}
    if ($("#sports").is(":checked")){url += "&sports=true"} else {url += "&sports=false"}
    if ($("#othergenre").is(":checked")){url += "&othergenre=true"} else {url += "&othergenre=false"}
    // get selected publishers
    if ($("#activision").is(":checked")){url += "&activision=true"} else {url += "&activision=false"}
    if ($("#ubisoft").is(":checked")){url += "&ubisoft=true"} else {url += "&ubisoft=false"}
    if ($("#ea").is(":checked")){url += "&ea=true"} else {url += "&ea=false"}
    if ($("#nintendo").is(":checked")){url += "&nintendo=true"} else {url += "&nintendo=false"}
    if ($("#otherpublisher").is(":checked")){url += "&otherpub=true"} else {url += "&otherpub=false"}

    return url;
}


// disable submitting when using the search bar
$("#search-form").submit(false);

// add even "onsubmit" listener to the search form
$("#search-bar").on('input', function(event){
    $("#catalogue").load(createURL());
});

// Send search configuration to server and load products
$('#filters-form').change(function(){
    $("#catalogue").load(createURL());
});

// initialize product loading
$("#catalogue").load(createURL());

$("#load-more-button").click(function(){
    amount += 5;
    $("#catalogue").load(createURL());
});