//=========================================================================
// Traitement de "req_terminer_test"
// Auteur : Robin
// Version : 20/11/17
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var terminer = function (req, res, query) {

	var marqueurs;
	var page;

	page = fs.readFileSync('res_creation_sondage.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.id = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = terminer;
