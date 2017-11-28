/*===============================================================================================
Traitement de "req_confirmer_creation_sondage"
Auteur : Robin
Version : 28/11/2017
===============================================================================================*/

"use strict"
var fs = require('fs');
require('remedial');

var create = function (req, res, query) {
	var marqueurs;
	var page;
	var contenu_fichier;
	var chaine = [];
	var i;
	var j;
	var trouve_id = false;
	var trouve_sondage = false;

	chaine = JSON.stringify(chaine);
	fs.writeFileSync(query.sondage+".json", chaine, "UTF-8" );
	
	contenu_fichier = fs.readFileSync("./profils.json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);
/*
Vérification si l'id du user et du nom du sondage existent dans profils.json
*/
	i = 0;
	while (trouve_id === false && i < contenu_fichier.length) {
		if(query.id === contenu_fichier[i].id) {
			trouve_id = true;
			j = 0;
			while (trouve_sondage === false && j < contenu_fichier[i].sondageuser.length) {
				if(query.sondage === contenu_fichier[i].sondageuser[j]) {
					trouve_sondage = true;
				}
				j++
			}
		}	
		i++
	};
/*
Création du sondage et redirection vers la page de confirmation
Ou affichage erreur dans le page test sondage
*/
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
		page = fs.readFileSync("./res_valider_sondage.html","utf-8");		
		marqueurs = {};
		marqueurs.erreur = "mauvais id";
		marqueurs.id = query.id;

	} else if (trouve_sondage === true) {
		page = fs.readFileSync("./res_valider_sondage.html","utf-8");		
		marqueurs = {};
		marqueurs.erreur = "Nom déjà pris."
		marqueurs.id = query.id;
	}

	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = create;