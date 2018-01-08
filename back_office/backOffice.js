//=========================================================================
// BackOffice de SurvEye
// Auteur : Groupe SurvEye
// Version : 29/11/2017
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------
//var req_consulter_sondages = require("./req_consulter_sondage.js");
//var req_static = require("./req/req_static.js");
//var req_erreur = require("./req/req_erreur.js");
//var req_deconnexion = require("./req/req_deconnexion.js");
//var req_confirm_delete = require("./req/req_confirm_delete");
var web_masterisation = require("./req_web_masterisation.js");
<<<<<<< HEAD
var web_delete_survey = require("../req/web_delete_survey.js");
var web_delete_member = require("../req/web_delete_member.js");

=======
//var web_delete = require("./web_delete.js");
var req_liste = require("./req_liste.js");
>>>>>>> 2bd92dc51a896d3a4d2783bca2ce3b05e50dce41
//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

	var ressource;
	var requete;
	var pathname;;
	var query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_web_masterisation':
//                web_masterisation(req, res, query);
            	break;
			case '/req_liste' :
				req_liste(req, res, query);
				break;
			case '/req_traiter_web' :
<<<<<<< HEAD
				if (query.survey === "Supprimer") {
					web_delete_survey(req, res, query);
				}else if (query.member === "Supprimer") {
					web_delete_member(req, res, query);
=======
				if (query.bouton === "Supprimer") {
//					web_delete(req, res, query);
>>>>>>> 2bd92dc51a896d3a4d2783bca2ce3b05e50dce41
				}
				break;
            default:
//				req_static(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
//		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = 3000;
console.log("En écoute sur " + port);
mon_serveur.listen(port);
