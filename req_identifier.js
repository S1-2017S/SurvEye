
//=========================================================================
// Traitement de "req_identifier"
// Auteur : Robin
// Version : 28/11/2017
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var connexion = function (req, res, query) {

	var marqueurs;
	var id;
	var password;
	var page;
	var membre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve;

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

/*
Recherche de l'ID du user
*/

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].id === query.id) {
			if(listeMembres[i].password === query.password) {
				trouve = true;
			}
		}
		i++;
	}
/*
Affichage dépendant du résultat de la recherche
*/
	if(trouve === false) {
	
		page = fs.readFileSync('modele_accueil.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
		marqueurs.id = query.id;
		page = page.supplant(marqueurs);

	} else {
		console.log("true");
		page = fs.readFileSync('modele_accueil_membre.html', 'UTF-8');

		marqueurs = {};
		marqueurs.id = query.id;
		page = page.supplant(marqueurs);
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = connexion;
