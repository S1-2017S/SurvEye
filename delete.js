/*===============================================================================================
suppression du sondage
Auteur : Thomas
Version : 20/11/2017 14:24
===============================================================================================*/

"use strict"
var fs = require('fs');
var remedial = require("remedial");

var del = function (req,res,query) {
	var marqueurs;
	var page;
	var contenu_fichier;
	var i;
	var j;

	contenu_fichier = fs.readFileSync("./profils.JSON","utf-8");
	contenu_fichier = JSON.parse(contenu_fichier);
	console.log(contenu_fichier);
	
	i = 0;
	while (contenu_fichier[i] != query.id && i<contenu_fichier.length) {
		i++
	}

	for (j = 0; j < contenu_fichier[i].sondageuser.length; j++) {
		if (query.sondage === contenu_fichier[i].sondageuser[j]) {
			contenu_fichier.sondageuser.splice(j, 1);
		}
	}


	contenu_fichier = JSON.stringify(contenu_fichier);
	fs.writeFileSync("./profils.JSON",contenu_fichier,"utf-8");
	page = fs.readFileSync("./res_confirm_action_sondage.html","utf-8");

	marqueurs = {};
	marqueurs.confirm = "supprimé";
	marqueurs.nom = query.sondage;
	marqueurs.id = query.id;
	if (query.bouton === "supprimer") {
		marqueurs.direction = "'mes sondages'";
	}

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = del;