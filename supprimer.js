//=========================================================================
// Traitement du cas "supprimer question"
// Auteur : Robin
// Version : 05/12/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req,res,query) {
    var page;
	var marqueurs;
	var contenu_fichier;
	var i;

	page = fs.readFileSync("./res_creation_sondage.html", "UTF-8");

	contenu_fichier = fs.readFileSync("./"+query.id+"t.json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);

	for(i = 0; i < contenu_fichier.questions; i++) {
		if (query.q === contenu_fichier.questions[i]) {
			contenu_fichier.questions.splice(i, 0);
			contenu_fichier.reponses.splice(i, 0);
		}
	}

	marqueurs = {};
	marqueurs.id = query.id;
	marqueurs.erreurQ = "";
	marqueurs.erreurR = "";
	marqueurs.question = "Question "+[i];
	
	page = page.supplant(marqueurs)
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
	
};

module.exports = trait;
