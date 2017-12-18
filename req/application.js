"use strict"

function openNav() {
    document.getElementById("mySidepannel").style.width = "250px";
}
function closeNav() {
	document.getElementById("mySidepannel").style.width = "0px";
}
var trait = function() {
	var x = document.getElementById("opener");
	x.addEventListener("click", openNav);
	document.getElementById("closer").addEventListener("click", closeNav);
}

window.addEventListener("load", trait);