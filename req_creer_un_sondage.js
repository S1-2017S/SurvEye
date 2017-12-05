//=========================================================================
// Traitement de "req_creer_un_sondage"
// Auteur : R.LAGNY
// Version : 29/11/2017
//=========================================================================
"use strict";

var fs = require("fs")
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var contenu_fichier;

	contenu_fichier = {};
	contenu_fichier.ids = [];
	contenu_fichier.etat = "open";
	contenu_fichier.questions = [];
	contenu_fichier.reponses = [];
	contenu_fichier.answers = [];
	
	contenu_fichier = JSON.stringify(contenu_fichier);
	fs.writeFileSync("./"+query.id+"t.json", contenu_fichier, "utf-8");

	
	// AFFICHAGE DE LA PAGE CREATION SONDAGE

	page = fs.readFileSync('res_creation_sondage.html', 'utf-8');

	marqueurs = {};
	marqueurs.question = "Question 1";
	marqueurs.histo = "";
	marqueurs.suppress = "";
	marqueurs.id = query.id;
	marqueurs.erreurQ = "";
	marqueurs.erreurR = "";
	marqueurs.histo = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;


