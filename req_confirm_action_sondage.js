//=========================================================================
// Traitement de "req_commencer"
// Auteur : Robin
// Version : 20/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
    var page;
    var url = require("url");
    var pathname;
	var query;

	requete = url.parse(req.url, true);
	pathname = requete.pathname;
    query = requete.query;

	if (query.confirmer_creation === confirmer) {
      
        page = fs.readFileSync('res_confirm_action_sondage.html', 'utf-8');
        
        marqueurs = {};
        marqueurs.nom = "sondage1";
        marqueurs.confirm = "crée";
        marqueurs.direction = "accueil membre"
        page = page.supplant(marqueurs);
             
    };

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
	
};
//--------------------------------------------------------------------------

module.exports = trait;