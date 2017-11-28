/*===============================================================================================
confirmation création sondage
Auteur : Robin
Version : 27/11/2017
===============================================================================================*/

"use strict"
var fs = require('fs');
require('remedial');

var create = function (req, res, query) {
	var marqueurs;
	var page;
	var contenu_fichier;
	var chaine = "[]";
	var i;
	var j;
	var trouve_id = false;
	var trouve_sondage = false;

    

	chaine = JSON.stringify(chaine);
	fs.writeFileSync(query.sondage+".json", chaine, "UTF-8" );
	
	contenu_fichier = fs.readFileSync("./profils.json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);

	i = 0;
	while (i < contenu_fichier.length) {
		if(query.id === contenu_fichier[i].id) {
			trouve_id = true;
			j = 0;
			while (j < contenu_fichier[i].sondageuser.length) {
				if(query.sondage === contenu_fichier[i].sondageuser[j]) {
					trouve_sondage = true;
				}
				console.log("j"+j)
				j++
			}
		}
		console.log("i"+i)		
		i++
	};
	
	if (trouve_id === true && trouve_sondage === false) {
		contenu_fichier[i-1].sondageuser.push(query.sondage);
		
		page = fs.readFileSync("./res_confirmation_creation.html","utf-8");
		contenu_fichier = JSON.stringify(contenu_fichier);
		fs.writeFileSync("./profils.json",contenu_fichier,"utf-8");

		marqueurs = {};
		marqueurs.nom = query.sondage;
		marqueurs.confirm = "crée";
		marqueurs.direction = "accueil membre";
		marqueurs.id = query.id;	

	} else if (trouve_id === false) {
		page = fs.readFileSync("./res_test_sondage.html","utf-8");		
		marqueurs = {};
		marqueurs.erreur = "mauvais id";
		marqueurs.id = query.id;

	} else if (trouve_sondage === true) {
		page = fs.readFileSync("./res_test_sondage.html","utf-8");		
		marqueurs = {};
		marqueurs.erreur = "Nom déjà pris."
		marqueurs.id = query.id;
	}

	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};