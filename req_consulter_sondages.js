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
    var x;
    
    //Affichage de la page de consultation des sondages

    page = fs.readFileSync("./res_mes_sondages.html", "utf-8");

    query.id = "test";
    marqueurs = {};
    marqueurs.id = query.id;

    contenu_fichier = fs.readFileSync("./profils.JSON", "utf-8");
    contenu_fichier = JSON.parse(contenu_fichier);
    for(i = 0; i < contenu_fichier.length; i++) {
        if(contenu_fichier[i].id === query.id) {
            console.log(contenu_fichier[i].sondageuser);
            for(x = 0; x < contenu_fichier[i].sondageuser.length; x++) {
                marqueurs.liste += "<option value="+contenu_fichier[i].sondageuser[x]+">"+contenu_fichier[i].sondageuser[x]+"</option>";
            }
        }
    }
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
}
module.exports = trait;