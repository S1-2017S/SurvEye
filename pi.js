//=========================================================================
// Site WEB demo PI
// Auteur : P. Thiré
// Version : 15/11/2017
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req_commencer.js");
var req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req_inscrire.js");
var req_identifier = require("./req_identifier.js");
var req_consulter_sondages = require("./req_consulter_sondages.js");
var acceder = require("./acceder.js");
var req_creer_un_sondage = require("./req_creer_un_sondage.js");
var fermer = require("./fermer.js");
var ouvrir = require("./ouvrir.js");
var del = require("./delete.js");
var confirm_del = require("./req_confirm_delete.js");
var req_static = require("./req_static.js");
var req_erreur = require("./req_erreur.js");
var req_tester_sondage = require("./req_tester_sondage.js");
var req_confirmer_creation_sondage = require("./req_confirmer_creation_sondage.js");
var req_terminer_test = require("./req_terminer_test.js");

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
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_consulter_sondages':
				req_consulter_sondages(req,res,query);
				break;
			case '/req_traiter_sondage' :
				if(query.bouton === "acceder") {
					acceder(req, res, query);
				}else if(query.bouton === "fermer") {
					fermer(req, res, query);
				}else if(query.bouton === "ouvrir") {
					ouvrir(req, res, query);
				}else if(query.bouton === "supprimer") {
					del(req, res, query);
				}
				break;
			case '/req_confirm_delete' :
				confirm_del(req, res, query);
				break;
			case '/req_creer_un_sondage':
				req_creer_un_sondage(req, res, query);
				break;
			case '/req_tester_sondage':
				if(query.bouton === "confirmer") {
					req_confirmer_creation_sondage(req, res, query);
				} else if(query.bouton === "terminer") {
					req_terminer_test(req, res, query);
				} else {				
					req_tester_sondage(req, res, query);
				};
				break;
			default:
				req_static(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
