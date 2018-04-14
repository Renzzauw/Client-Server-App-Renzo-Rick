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
    if ($("#adventure").is(":checked")){url += "&adventure=true"} else {url += "&adventure=false"}
    if ($("#horror").is(":checked")){url += "&horror=true"} else {url += "&horror=false"} 
    if ($("#interactivefilm").is(":checked")){url += "&interactivefilm=true"} else {url += "&interactivefilm=false"}
    if ($("#mmorpg").is(":checked")){url += "&mmorpg=true"} else {url += "&mmorpg=false"}
    if ($("#platformer").is(":checked")){url += "&platformer=true"} else {url += "&platformer=false"}
    if ($("#rpg").is(":checked")){url += "&rpg=true"} else {url += "&rpg=false"}
    if ($("#racing").is(":checked")){url += "&racing=true"} else {url += "&racing=false"}
    if ($("#shooter").is(":checked")){url += "&shooter=true"} else {url += "&shooter=false"}
    if ($("#sports").is(":checked")){url += "&sports=true"} else {url += "&sports=false"}
    if ($("#strategy").is(":checked")){url += "&strategy=true"} else {url += "&strategy=false"}

    // get selected publishers
    if ($("#ubisoft").is(":checked")){url += "&ubisoft=true"} else {url += "&ubisoft=false"}
    if ($("#telltale").is(":checked")){url += "&telltale=true"} else {url += "&telltale=false"}
    if ($("#teammeat").is(":checked")){url += "&teammeat=true"} else {url += "&teammeat=false"}
    if ($("#studiomdhr").is(":checked")){url += "&studiomdhr=true"} else {url += "&studiomdhr=false"}
    if ($("#redbarrels").is(":checked")){url += "&redbarrels=true"} else {url += "&redbarrels=false"}
    if ($("#pubgcorporation").is(":checked")){url += "&pubgcorporation=true"} else {url += "&pubgcorporation=false"}
    if ($("#nintendo").is(":checked")){url += "&nintendo=true"} else {url += "&nintendo=false"}
    if ($("#monolith").is(":checked")){url += "&monolith=true"} else {url += "&monolith=false"}
    if ($("#guerrillagames").is(":checked")){url += "&guerrillagames=true"} else {url += "&guerrillagames=false"}
    if ($("#ghostgames").is(":checked")){url += "&ghostgames=true"} else {url += "&ghostgames=false"}
    if ($("#fromsoftware").is(":checked")){url += "&fromsoftware=true"} else {url += "&fromsoftware=false"}
    if ($("#firaxisgames").is(":checked")){url += "&firaxisgames=true"} else {url += "&firaxisgames=false"}
    if ($("#ensemblestudios").is(":checked")){url += "&ensemblestudios=true"} else {url += "&ensemblestudios=false"}
    if ($("#ea").is(":checked")){url += "&ea=true"} else {url += "&ea=false"}
    if ($("#elinemedia").is(":checked")){url += "&elinemedia=true"} else {url += "&elinemedia=false"}
    if ($("#dontnod").is(":checked")){url += "&dontnod=true"} else {url += "&dontnod=false"}
    if ($("#crystaldynamics").is(":checked")){url += "&crystaldynamics=true"} else {url += "&crystaldynamics=false"}
    if ($("#cdprojektred").is(":checked")){url += "&cdprojektred=true"} else {url += "&cdprojektred=false"}
    if ($("#bungie").is(":checked")){url += "&bungie=true"} else {url += "&bungie=false"}
    if ($("#blizzard").is(":checked")){url += "&blizzard=true"} else {url += "&blizzard=false"}
    if ($("#activision").is(":checked")){url += "&activision=true"} else {url += "&activision=false"}

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