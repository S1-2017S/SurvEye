//=========================================================================
// Envoie et traitements des réponses de l'user
// Auteur : Olivier
// Version : 21/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req,res,query) {
    var page;
    var marqueurs;
    var contenu_fichier;
    var i;
    var z;
    var x;
    var t;

    contenu_fichier = fs.readFileSync("./"+query.sondage+".json", "utf-8");
    contenu_fichier = JSON.parse(contenu_fichier);
    
    contenu_fichier.ids.push(query.id);

    for(i = 0; i < contenu_fichier.questions.length; i++) {
        if("q"+String(i) in query) {
            contenu_fichier.answers[i][query["q"+i]]++;
        }
    }
    
    contenu_fichier = JSON.stringify(contenu_fichier);
    fs.writeFileSync("./"+query.sondage+".json", contenu_fichier);
}
module.exports = trait;