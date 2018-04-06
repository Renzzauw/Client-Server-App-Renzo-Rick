var xhttp;
var sortMode;
var dropDown = document.getElementsByClassName("dropdown")[0];

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

$("#catalogue").load("/products");


/*
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("catalogue").appendChild(this.responseText);
      $("#catalogue").load("/products",this.responseText);
    }
};
*/

/*
xhttp.open("GET", url, true);
xhttp.send(null);
*/