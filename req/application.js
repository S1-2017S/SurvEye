"use strict"

function openNav() {
    document.getElementById("mySidepannel").style.width = "250px";
}
function closeNav() {
	document.getElementById("mySidepannel").style.width = "0px";
}
var trait = function() {
	document.getElementById("opener").addEventListener("click", openNav);
	document.getElementById("closer").addEventListener("click", closeNav);
	document.getElementById("q").focus();
}

window.addEventListener("load", trait);