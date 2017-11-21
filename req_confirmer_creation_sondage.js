/*===============================================================================================
confirmation création sondage
Auteur : Robin
Version : 20/11/2017
===============================================================================================*/

"use strict"
var fs = require('fs');
require('remedial');

var create = function (req, res, query) {
	var marqueurs;
	var page;
	var contenu_fichier;
	var chaine = "[]";

	chaine = JSON.stringify();
	fs.writeFileSync(query.sondage+".JSON", chaine, "UTF-8" );

    page = fs.readFileSync("./res_confirmation_creation.html","utf-8");

	marqueurs = {};
	marqueurs.nom = query.sondage;
	marqueurs.confirm = "crée";
	marqueurs.direction = "accueil membre";
	marqueurs.id = query.id;

	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = create;