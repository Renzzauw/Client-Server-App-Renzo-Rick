/*
var xhttp;
var sortMode = dropDown.val;
var dropDown = $(".dropdown").first();

$("#catalogue").load("/products?sortby="+sortMode);

dropDown.change(function() {
    sortMode = dropDown.val;
    //$("#catalogue").load("/products?sortby="+sortMode);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //document.getElementById("catalogue").appendChild(this.responseText);
          $("#catalogue").empty().load("/products?sortby="+sortMode,this.responseText);
        }
    };
});





xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("catalogue").appendChild(this.responseText);
      $("#catalogue").load("/products", this.responseText);
    }
};
*/

/*
xhttp.open("GET", url, true);
xhttp.send(null);
*/


var xhttp;
var sortMode;
var dropDown = $(".dropdown").first();

//tijdelijk
sortmode = "alphabetical";

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