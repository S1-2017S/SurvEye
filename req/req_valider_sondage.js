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

	contenu_fichier = fs.readFileSync("./json/"+query.id+"t.json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);
    
	marqueurs = {};
	reponses = [];
	marqueurs.id = query.id;
	question = query.q;
	marqueurs.erreur = "";

	
	for(i = 0; i < 15; i++) {
		marqueurs[String(i)] = "";
	}
	
	i = 0;
	compteur = 0;
	for(i = 0; i < 10; i ++) {
		if(query[String(i)] !== "") {
			reponses.push(query[String(i)]);
			compteur++
		}
	}
	if(compteur < 2) {
			page = fs.readFileSync("res/res_creation_sondage.html", "UTF-8");
			marqueurs.erreurR = "Vous devez mettre au minimum 2 réponses";
			marqueurs.question = "Question "+(contenu_fichier.questions.length+1);
			marqueurs.erreurQ = "";
			marqueurs.q = "";
			marqueurs.suppress = "";
			marqueurs.histo = "";
			marqueurs.indice = 0
			query.numero = Number(query.numero);

	} else {
    	page = fs.readFileSync('res/res_valider_sondage.html', 'UTF-8');
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
		fs.writeFileSync("./json/"+query.id+"t.json", contenu_fichier, "utf-8");
	}

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = valider;
