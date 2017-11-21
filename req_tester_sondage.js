//=========================================================================
// Traitement de "req_tester_sondage"
// Auteur : Robin
// Version : 20/11/2017
//=========================================================================

"use strict";

var fs = require("fs")
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	page = fs.readFileSync('res_test_sondage.html', 'utf-8');

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