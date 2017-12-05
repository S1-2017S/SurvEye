//=========================================================================
// Envoie et traitements des réponses de l'user
// Auteur : Olivier
// Version : 1/12/2017
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
    page = fs.readFileSync("./res_resultats_sondages.html", "utf-8");
    marqueurs = {};
    marqueurs.id = query.id;
    marqueurs.sondage = query.sondage;
    marqueurs.results = "";
    nb_reponses = 0;
    for(i = 0; i < contenu_fichier.answers.length; i++) {
        marqueurs.results += "<h2>"+contenu_fichier.question[i]+"</h2><br>";
        for(x = 0; x < contenu_fichier.answers[i].length; x++) {
	    if(contenu_fichier.answers[i][x] !== 0) {
		nb_reponses += contenu_fichier.answers[i][x];
	    }
	}
	for(x = 0; x < contenu_fichier.answers[i].length; x++) {
	    marqueurs.results += contenu_fichier.reponses[i][x]+"<img src='./barre_histo.PNG' style=' height : 20px; width : "+(contenu_fichier.answers[i][x]/nb_reponses)*100+"%' alt="+(contenu_fichier.answers[i][x]/nbreponses)*100+"%><br>";
	}
    }
    contenu_fichies = JSON.stringify(contenu_fichier);
    fs.writeFileSync("./"+query.sondage+".json", contenu_fichier);

    res.writeHead(200, {"Content-Type" : "text/html"});
    res.write(page);
    res.end();
}
module.exports = trait;
