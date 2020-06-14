/* HTML5 - Animations et jeux : Jeu des pays
*
* Copyright INSA Toulouse J.-Y. Plantec
* 
* Date : 30/04/2014
* Testé sur : Firefox 28, Opera 20, Chrome 34
* 
*/

/* fonction Valider */
function fonctionValider(){
	/* non demandé : mise en oeuvre de clearInterval() pour éviter de consommer inutilement des ressources (décommenter aussi lignes 40 et 57). 
	clearInterval(inter);*/
	
	$('#boutonValider').hide('slow','linear');
	$('#heure').hide('slow','linear');
	
	/* boucle sur les listes */
	for (var i=1; i<=7; i++)
	{
		/* récupération de l'index, puis de la valeur choisie */
		var indexChoisi = document.forms["listes"].elements["liste"+i].selectedIndex;
		var paysChoisi = document.forms["listes"].elements["liste"+i].options[indexChoisi].value;
		/* teste si la liste i affiche le bon pays */
		if(paysChoisi == tableauPaysSolution[i]){
			/* changement de style de l'élément numero i : solution classique */
			document.getElementById("numero"+i).className='OK'; 
			/* version (non demandée) avec jQuery 
			$("#numero"+i).addClass( "OK" );*/
		} else {
			document.getElementById("numero"+i).className='NOK';
			/* version (non demandée) avec jQuery 
			$("#numero"+i).addClass( "NOK" );*/
		}
	}
};
		
/* fonction Reset */
function fonctionReset(){
	/* non demandé : mise en oeuvre de clearInterval() pour éviter de consommer inutilement des ressources. 
	clearInterval(inter);*/

	$('#boutonValider').show('slow','linear');
	$('#heure').show('slow','linear');
	timerIni = 0;
	/* boucle sur les listes */
	for (var i=1; i<=7; i++)
	{
		/* affichage première valeur */
		document.forms["listes"].elements["liste"+i].selectedIndex = 0;
		document.getElementById("numero"+i).className=''; 
		/* version (non demandée) avec jQuery pour supprimer toutes les classes existantes
		$("#numero"+i).removeClass();  */
		
	}
	/* relance du timer 
	inter = setInterval(Horloge, 1000);*/
};

/* fonction pour le timer */
function Horloge() {
	if(timerIni < 60){
		timerIni++;
		$('#heure').text(timerIni);
	} else {
		fonctionValider();
	} 
}


/* Jeu des Pays */
/* attente de la fin du changement */
$(function(){
		
	/* Ecriture du titre et du sous-titre avec jQuery */
	$("#titre").html('<p>Jeu des Pays en "stan"</p>');
	$("#titre").after('<p>Associez à chaque numéro le bon pays !</p>');

	/* Tableau des pays (remarque : on pourrait regrouper ces deux tableaux en un seul - ce qui éviterait d'éventuellement des erreurs d'écriture des pays -, mais ce n'était pas demandé */

	/* Tableau pour la construction dynamique (pays dans l'ordre alphabétique) */
	tableauPays = new Array();
	tableauPays[1] 	= 'Afghanistan';
	tableauPays[2] 	= 'Azerbaïdjan';
	tableauPays[3] 	= 'Kirghizistan';
	tableauPays[4]	= 'Ouzbékistan';
	tableauPays[5] 	= 'Pakistan';
	tableauPays[6]  = 'Tadjikistan';
	tableauPays[7] 	= 'Turkménistan';
	
	/* tableau solution */
	tableauPaysSolution = new Array();
	tableauPaysSolution[1] 	= 'Azerbaïdjan';
	tableauPaysSolution[2] 	= 'Turkménistan';
	tableauPaysSolution[3]	= 'Ouzbékistan';
	tableauPaysSolution[4] 	= 'Afghanistan';
	tableauPaysSolution[5] 	= 'Pakistan';
	tableauPaysSolution[6]  = 'Tadjikistan';
	tableauPaysSolution[7] 	= 'Kirghizistan';

	/* timer */
	timerIni = 0;
	inter = setInterval(Horloge, 1000);

	/* création dynamique des listes */
	var texte = "";
	for (var i=1; i<=7; i++)
	{
		texte = texte + "<span id=\"numero"+i+"\">"+i+"</span> -";
		texte = texte + "<select name=\"liste"+i+"\">";		
		texte = texte + "<option value=\"\">Choisir...</option>";
		for (var j=1; j<=7; j++){
			texte = texte + "<option value=\""+tableauPays[j]+"\">"+tableauPays[j]+"</option>";
		}
		texte = texte + "</select>";
		texte = texte + "<br>";		
	}
	$("#listes").html(texte);

});	



