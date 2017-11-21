/*===============================================================================================
suppression du sondage
Auteur : Thomas
Version : 21/11/2017 09:47
===============================================================================================*/

"use strict"
var fs = require('fs');
var remedial = require("remedial");

var confirm_del = function (req,res,query) {
	var marqueurs;
	var page;
	var contenu_fichier;
	var i;
	var j;
	var sondage = String(query.sondage);
	contenu_fichier = fs.readFileSync("./profils.JSON","utf-8");
	contenu_fichier = JSON.parse(contenu_fichier);

	page = fs.readFileSync("./res_confirm_action_sondage.html","utf-8");
	marqueurs = {};

	if (query.delete === "oui") {
		i = 0;
		while (contenu_fichier[i].id != query.id && i<contenu_fichier.length) {
			i++
		}

		for (j = 0; j < contenu_fichier[i].sondageuser.length; j++) {
			if (query.sondage === contenu_fichier[i].sondageuser[j]) {
				contenu_fichier[i].sondageuser.splice(j, 1);
			}
		}

		contenu_fichier = JSON.stringify(contenu_fichier);
		fs.writeFileSync("./profils.JSON",contenu_fichier,"utf-8");
		
		marqueurs.confirm = "Votre sondage "+sondage+" a bien été supprimé";

	}else if (query.delete === "non") {
		marqueurs.confirm = "Votre sondage "+sondage+" n'a pas été supprimé";
	}

		

	marqueurs.sondage = query.sondage;
	marqueurs.id = query.id;
	marqueurs.direction = '"mes sondages"';
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = confirm_del;