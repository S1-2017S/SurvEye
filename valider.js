
//=========================================================================
// Traitement de validation d'ajout de question
// Auteur : R.LAGNY
// Version : 16/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req,res,query) {
    var page;
    var marqueurs;
    var contenu_fichier;
    var question;
    var reponses;
    var i;
    var j;

    page = fs.readFileSync("./res_creation_sondage.html", "utf-8");

    contenu_fichier = fs.readFileSync("./"+query.id+"t.json", 'utf-8');
    contenu_fichier = JSON.parse(contenu_fichier);

    marqueurs = {};
    marqueurs.id = query.id;
    question = query.q;
    reponses = [];
    for(i = 0; i < 10; i ++) {
        if(query[String(i)] !== "") {
            reponses.push(query[String(i)]);
        }
    }
    contenu_fichier.questions.push(question);
    contenu_fichier.reponses.push(reponses);
    
    contenu_fichier = JSON.stringify(contenu_fichier);
    fs.writeFileSync("./"+query.id+"t.json", contenu_fichier, "utf-8");
    
    page = page.supplant(marqueurs);
    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

}
module.exports = trait;