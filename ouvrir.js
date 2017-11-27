/*===============================================================================================
re-ouverture du sondage
Auteur : Thomas
Version : 20/11/2017 14:24
===============================================================================================*/

"use strict"
var fs = require('fs');
var remedial = require("remedial");

var open = function (req,res,query) {
	var marqueurs;
	var page;
	var contenu_fichier;

	contenu_fichier = fs.readFileSync("./"+query.sondage+".json","utf-8");
	contenu_fichier = JSON.parse(contenu_fichier);
	contenu_fichier.etat = "opened";
	contenu_fichier = JSON.stringify(contenu_fichier);
	fs.writeFileSync("./"+query.sondage+".json",contenu_fichier,"utf-8");
	page = fs.readFileSync("./res_confirm_action_sondage.html","utf-8");

	marqueurs = {};
	marqueurs.confirm = "ouvert";
	marqueurs.nom = query.sondage;
	marqueurs.id = query.id;
	marqueurs.direction = "'mes sondages'";

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = open;