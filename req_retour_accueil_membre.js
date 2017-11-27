/*===============================================================================================
confirmation création sondage
Auteur : Robin
Version : 20/11/2017
===============================================================================================*/

"use strict"
var fs = require('fs');
require('remedial');

var retour = function (req, res, query) {
	var marqueurs;
	var page;
	var contenu_fichier;
        
    page = fs.readFileSync("./modele_accueil_membre.html","utf-8");

	marqueurs = {};
	marqueurs.id = query.id;

	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = retour;