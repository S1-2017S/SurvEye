//Premier serveur: afficher la date

"use strict"

var http = require("http");
var mon_serveur;
var port;
var traiter_requete = function (req, res) {
	var fs = require("fs");
	var page = fs.readFileSync("home_page_membre.html", "UTF-8");

res.writeHead(200, {'Content-Type': 'text/html'});
res.write(page);
res.end();
}

mon_serveur = http.createServer(traiter_requete);
port = 5000
mon_serveur.listen(port);
console.log("Serveur écoute sur port" +port);

