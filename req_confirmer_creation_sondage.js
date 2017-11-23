/*===============================================================================================
confirmation création sondage
Auteur : Robin
Version : 23/11/2017
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
	var trouve_id = false;
	var id = {};

    page = fs.readFileSync("./res_confirmation_creation.html","utf-8");

	chaine = JSON.stringify(chaine);
	fs.writeFileSync(query.sondage+".json", chaine, "UTF-8" );
	
	contenu_fichier = fs.readFileSync("./profils.json", "UTF-8");
	contenu_fichier = JSON.parse(contenu_fichier);

	i = 0;
	while (i < contenu_fichier.length) {
		if(query.id === contenu_fichier[i].id) {
			contenu_fichier[i].sondageuser.push(query.sondage);
			trouve_id = true;
		}
		i++
	};
	if (trouve_id === false) {
		console.log(contenu_fichier.length);
		contenu_fichier.length.push(query.id);
		contenu_fichier[i].sondageuser.push(query.sondage);
	}

	contenu_fichier = JSON.stringify(contenu_fichier);
	fs.writeFileSync("./profils.json",contenu_fichier,"utf-8");

	marqueurs = {};
	marqueurs.nom = query.sondage;
	marqueurs.confirm = "crée";
	marqueurs.direction = "accueil membre";
	marqueurs.id = query.id;

	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = create;