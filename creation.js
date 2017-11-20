/*===============================================================================================
confirmation création sondage
Auteur : Robin
Version : 20/11/2017
===============================================================================================*/

"use strict"
var fs = require('fs');
var remedial = require("remedial");

var create = function (req, res, query) {
	var marqueurs;
	var page;
	var contenu_fichier;
        
    page = fs.readFileSync("./res_confirm_action_sondage.html","utf-8");

	marqueurs = {};
	marqueurs.confirm = "crée";
    marqueurs.derection = "accueil membre"

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = create;