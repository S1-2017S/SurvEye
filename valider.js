
//=========================================================================
// Traitement de validation d'ajout de question
// Auteur : R.LAGNY
// Version : 29/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req,res,query) {
    var page;
    var marqueurs;
    var contenu_fichier;
    var question;
    var reponses;
    var i;
	var compteur;

	page = fs.readFileSync("./res_creation_sondage.html", "utf-8");

    contenu_fichier = fs.readFileSync("./"+query.id+"t.json", 'utf-8');
    contenu_fichier = JSON.parse(contenu_fichier);

    marqueurs = {};
    marqueurs.id = query.id;
    question = query.q;
    reponses = [];
	marqueurs.erreurQ = "";
	marqueurs.erreurR = "";
	compteur = 0;
	marqueurs.histo = contenu_fichier.questions;

	for(i = 0; i < 10; i ++) {
		if(query[String(i)] !== "") {
			reponses.push(query[String(i)]);
			compteur++
		}
	}

    if(query.q === "") {
		marqueurs.erreurQ = "Vous devez mettre une question"
		marqueurs.question = "<h3>Question "+(contenu_fichier.questions.length+1) + "<h3>"
	} else if(compteur < 2) {
		marqueurs.erreurR = "Vous devez mettre au minimum 2 réponses"
		marqueurs.question = "<h3>Question "+(contenu_fichier.questions.length+1) + "<h3>"
	} else {
		contenu_fichier.questions.push(question);
		contenu_fichier.reponses.push(reponses);
		contenu_fichier.answers.push([]);
		i = 0;
		console.log(contenu_fichier.answers);
		console.log(contenu_fichier.questions.length-1);
		while(i < reponses.length) {
			 if(query[String(i)] !== "") {
			 	contenu_fichier.answers[contenu_fichier.questions.length-1].push(0);
			}
			i++;
		}
		marqueurs.question = "<h3>Question "+(contenu_fichier.questions.length+1) + "<h3>"

		contenu_fichier = JSON.stringify(contenu_fichier);
		fs.writeFileSync("./"+query.id+"t.json", contenu_fichier, "utf-8");
    } 
    page = page.supplant(marqueurs);
    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

}
module.exports = trait;
