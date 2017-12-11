//=========================================================================
// Traitement de "valider_sondage"
// Auteur : Robin
// Version : 06/12/2017
//=========================================================================

"use strict";

var fs = require("fs")
require('remedial');

var valider = function (req, res, query) {

    var marqueurs;
    var page;
	var compteur;
	var i;
	var contenu_fichier;
	var reponses;
	var question;

    page = fs.readFileSync('res_valider_sondage.html', 'UTF-8');

	contenu_fichier = fs.readFileSync("./"+query.id+"t.json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);
    
	marqueurs = {};
	reponses = [];
	marqueurs.id = query.id;
	question = query.q;
	marqueurs.erreur = "";
	
	compteur = 0;
	for(i = 0; i < 10; i ++) {
		if(query[String(i)] !== "") {
			reponses.push(query[String(i)]);
			compteur++
		}
	}	

	if(compteur > 1) {
		contenu_fichier.questions.push(question);
		contenu_fichier.reponses.push(reponses);
		contenu_fichier.answers.push([]);
		
		i = 0;
		while(i < reponses.length) {
			if(query[String(i)] !== "") {
				contenu_fichier.answers[contenu_fichier.questions.length-1].push(0);
			}
			i++;
		}
		contenu_fichier = JSON.stringify(contenu_fichier);
		fs.writeFileSync("./"+query.id+"t.json", contenu_fichier, "utf-8");
	}

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = valider;
