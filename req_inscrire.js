//=========================================================================
// Traitement de "req_inscrire"
// Auteur : T.Cousin
// Version : 15/11/17
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var password;
	var confirm;				//VARIABLE_VERIFICATION_MDP
	var registered;				//VARIABLE_CONFIRMATION_INSCRIPTION
	var page;
	var nouveauMembre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve;

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');    // LECTURE
	listeMembres = JSON.parse(contenu_fichier);

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {				//VERIFICATION
		if(listeMembres[i].pseudo === query.pseudo) {
			trouve = true;
		}
		i++;
	}


	registered = false;
	if(trouve === false) {

		if (query.password === query.confirm) {
			nouveauMembre = {};
			nouveauMembre.pseudo = query.pseudo;
			nouveauMembre.password = query.password;
			listeMembres[listeMembres.length] = nouveauMembre;
			registered = true;

			contenu_fichier = JSON.stringify(listeMembres);
		
			fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');

		} else if (query.password !== query.confirm) {
			page = fs.readFileSync('modele_formulaire_inscription.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "ERREUR : confirmation invalide !";
			marqueurs.pseudo = query.pseudo;
			page = page.supplant(marqueurs);
		}

	} else if (trouve === true) {

			page = fs.readFileSync('modele_formulaire_inscription.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "ERREUR : ce compte existe déjà";
			marqueurs.pseudo = query.pseudo;
			page = page.supplant(marqueurs);

	} 

	if (registered === true) {

		page = fs.readFileSync('modele_confirmation_inscription.html', 'UTF-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.password = query.password;
		page = page.supplant(marqueurs);
	}


	

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
