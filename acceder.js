//=========================================================================
// Traitement du cas "acceder"
// Auteur : Olivier
// Version : 21/11/2017
//=========================================================================
"use strict"

var fs = require("fs");
require('remedial');

var trait = function(req,res,query) {

    var page;
    var marqueurs;
    var contenu_fichier;
    var trouve;
    var i;
    var x;

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

    if(trouve === false) {
        //page = fs.readFileSync("./res_resultats_sondage.html", "utf-8");
        marqueurs = {};
        marqueurs.id = query.id;
        page = page.supplant(marqueurs);
    
    }else if(trouve === true) {
        page = fs.readFileSync("./res_reponse_sondage.html", "utf-8");
        marqueurs = {};
        marqueurs.id = query.id;
        marqueurs.questions = "";
        for(i = 0; i < contenu_fichier.questions.length; i++) {
            marqueurs.questions += "<h2>Question "+(i+1)+" : "+contenu_fichier.questions[i]+"</h2><br>"
            for(x = 0; x < contenu_fichier.reponses[i].length; x++) {
                marqueurs.questions += ""
            }
        }
        page = page.supplant(marqueurs);
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}
module.exports = trait;