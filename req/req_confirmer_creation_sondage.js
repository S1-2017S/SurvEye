/*===============================================================================================
Traitement de "req_confirmer_creation_sondage"
Auteur : Robin
Version : 29/11/2017
===============================================================================================*/

"use strict"
var fs = require('fs');
require('remedial');

var create = function (req, res, query) {
	var marqueurs;
	var page;
	var contenu_fichier;
	var i;
	var j;
	var k;
	var trouve;
	var liste;
	var fichier_sondage;
	var erreur;

	/*
	Vérification si l'id du user et du nom du sondage existent dans profils.json
	*/
	
	contenu_fichier = fs.readFileSync("./json/profils.json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);

	i = 0;
	trouve = false;
	while (trouve === false && i < contenu_fichier.length) {
		if(query.id === contenu_fichier[i].id) {
			trouve = true;
		}	
		else i++;
	};
	/*
	Création du sondage et redirection vers la page de confirmation
	Ou affichage erreur dans le page test sondage
	*/

		//On vérifie que le sondage n'existe pas déjà dans la base de données

		liste = fs.readFileSync("./json/liste.json","utf-8");
		liste = JSON.parse(liste);
		j = 0;
		trouve = false;
		console.log(liste[j]);

		while(trouve === false && j < liste.length) {
			if(liste[j] === query.sondage) {
				trouve = true;
			}else j++;
		}
		
		//On vérifie qu'il si il y a des espaces de le nom du sondage

	erreur = false
	for(k = 0; k < query.sondage.length; k++) {
		if(query.sondage[k] === " ") {
			erreur = true;
		}
	}
	
	if(erreur === true) {
	
	//On construit la page d'erreur

		page = fs.readFileSync("./res/res_valider_sondage.html","utf-8");
		marqueurs = {};
		marqueurs.id = query.id;
		marqueurs.erreur = "Erreur : les espaces ne sont pas autorisés dans le nom du sondage.";
	
	}else  if (query.sondage === "") {
		page = fs.readFileSync("./res/res_valider_sondage.html","utf-8");
		marqueurs = {};
		marqueurs.id = query.id;
		marqueurs.erreur = "Erreur : le nom du sondage est vide.";
	
	}else if(trouve === true) {
		
		//On construit la page d'erreur

		page = fs.readFileSync("./res/res_valider_sondage.html","utf-8");
		marqueurs = {};
		marqueurs.id = query.id;
		marqueurs.erreur = "Erreur : ce sondage existe déjà, veuillez choisir un autre nom.";
	
	} else if(trouve === false) {
	
		contenu_fichier = fs.readFileSync("./json/profils.json", "UTF-8");
		contenu_fichier = JSON.parse(contenu_fichier);

		i = 0;
		trouve = false;
		while (trouve === false && i < contenu_fichier.length) {
			if(query.id === contenu_fichier[i].id) {
				trouve = true;
			}	
			else i++;
		};
	
		//On enregistre le sondage dans ceux de l'user
		
		contenu_fichier[i].sondageuser.push(query.sondage);
		contenu_fichier = JSON.stringify(contenu_fichier);
		fs.writeFileSync("./json/profils.json",contenu_fichier,"utf-8");

		//On enregistre le nom du sondage dans la base de données

		liste.push(query.sondage);
		liste = JSON.stringify(liste);
		fs.writeFileSync("./json/liste.json", liste,"utf-8");

		//On créer le fichier du sondage 

		fichier_sondage = fs.readFileSync("./json/"+query.id+"t.json", "utf-8");
		fichier_sondage = JSON.parse(fichier_sondage);
		fichier_sondage = JSON.stringify(fichier_sondage);		
		fs.writeFileSync("./json/"+query.sondage+".json", fichier_sondage, "utf-8");
		
		//On construit la page de confirmation

		page = fs.readFileSync("./res/res_confirmation_creation.html","utf-8");
		marqueurs = {};
		marqueurs.id = query.id;
		marqueurs.confirm = "crée";
		marqueurs.direction = "accueil membre";
		marqueurs.sondage = query.sondage;
	}

	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = create;
