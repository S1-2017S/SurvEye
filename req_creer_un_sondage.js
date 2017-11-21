//=========================================================================
// Traitement de "req_creer_un_sondage"
// Auteur : R.LAGNY
// Version : 16/11/2017
//=========================================================================
"use strict";

var fs = require("fs")
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	// AFFICHAGE DE LA PAGE CREATION SONDAGE

	page = fs.readFileSync('res_creation_sondage.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.id = query.id;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;


