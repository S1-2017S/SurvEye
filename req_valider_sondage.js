//=========================================================================
// Traitement de "valider_sondage"
// Auteur : Robin
// Version : 29/11/2017
//=========================================================================

"use strict";

var fs = require("fs")
require('remedial');

var valider = function (req, res, query) {

    var marqueurs;
    var page;

    page = fs.readFileSync('res_valider_sondage.html', 'UTF-8');

    marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.id = query.id;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = valider;