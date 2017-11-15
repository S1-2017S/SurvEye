//=========================================================================
// Traitement de "req_consulter_sondages"
// Auteur : Olivier
// Version : 15/11/2017
//=========================================================================

"use strict"

var fs = require('fs');
var remedial = require("remedial");

var trait = function(req,res,query) {
    
    var marqueurs;
    var page;
    var contenu_fichier;
    var i;
    
    //Affichage de la page de consultation des sondages

    page = fs.readFileSync("./res_mes_sondages.html", "utf-8");
    console.log(page);

    marqueurs = {};
    marqueurs.id = query.id;

    contenu_fichier = fs.readFileSync("./profils.JSON", "utf-8");
    contenu_fichier = JSON.stringify(contenu_fichier);
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
}
module.exports = trait;