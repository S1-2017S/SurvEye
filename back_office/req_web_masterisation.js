/*=========================================================================
 
*/

"use strict";

var fs = require('fs');
var remedial = require('remedial');

var web_masterisation = function (req, res, query) {
    var marqueurs;
    var page;
    var contenu_fichier;
    var i;

    page = fs.readFileSync("./back_office/res_sondages_web_master.html", "utf-8");
    marqueurs = {};

    contenu_fichier = fs.readFileSync("./json/liste.json", "utf-8");
    contenu_fichier = JSON.parse(contenu_fichier);

    for (i = 0; i < contenu_fichier.length; i++) {
        marqueurs.liste += "<option value="+contenu_fichier[i]+">"+contenu_fichier[i]+"</option>";
    }

    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(page);
    res.end();
};

module.exports = web_masterisation;
