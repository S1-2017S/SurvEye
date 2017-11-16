//=========================================================================
// Traitement du cas "acceder"
// Auteur : Olivier
// Version : 16/11/2017
//=========================================================================
"use strict"

var fs = require("fs");
require('remedial');

var trait = function(req,res,query) {

    var page;
    var marqueurs;
    var contenu_fichier;
    var trouve;
    var i = 0;

    contenu_fichier = fs.readFileSync("./"+query.sondage+".json", "utf-8");
    contenu_fichier = JSON.parse(contenu_fichier);

    i = 0;
    trouve = false;
    while(trouve === false && i < contenu_fichier.ids.length) {
        if(contenu_fichier.ids[i] === query.id) {
            trouve = true;
        }else {
            i++;
        }
    }
    if(trouve === true) {
        page = fs.readFileSync("./res_resultats_sondage.html", "utf-8");
        marqueurs = {};
        marqueurs.id = query.id;
        page = page.supplant(marqueurs);
    
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}
module.exports = trait;