//=========================================================================
// Traitement du cas "supprimer question"
// Auteur : Robin
// Version : 05/12/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var del = function(req,res,query) {
    var page;
	var marqueurs;
	var contenu_fichier;

	page = fs.readFileSync("./res/res_confirm_delete_compte.html", "UTF-8");

	marqueurs = {};
	marqueurs.id = query.id;
	marqueurs.delete = " votre compte"
	marqueurs.sondage = query.sondage

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = del;
