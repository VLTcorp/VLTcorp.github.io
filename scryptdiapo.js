var aleatoir = true;
var pebef = null; // ref tmp affichage plein ecrant
var debdef = null;//reference temps defilement
var tabimage = (document.getElementById("listimage")).getElementsByTagName("img") ;//image seletcioné
let select = 0;// num image selectioner
let antselect =0; // num ancienne image select
let tmpchimg = 0; // delait de changement d'image
let durdef = 0; // durrer defilement barre image
var repeteur = setTimeout(majaffichage,0) //repeteur changement auto image
var trans =2 ; // variable servant à definir aléatoirement les transitions
var progress = 0;// temps cécouler depuis debut animation trans
 
var tmpplein = 0; //delait plein ecrant
var vitplein = 100; //vitesse transition plein ecrant (%/sec)
var tvolet = 17; // taille vollet (%)
var povolet = 0 ;// position vollet (%)
 
var delplein = setTimeout(pleimecrant, tmpplein);
var blocplein = true ;
var imafix = true ;
var clion = false;
var nextim = false;

 

//réinitialise le temps de defilement auto lorsaue l'on bouge la barre de deffilement

document.getElementById("poge").onclick = function()
{
	antiplein();
	if (imafix && !clion)
	{
		clearTimeout(repeteur);
		repeteur = setTimeout(avance, tmpchimg);
	}             
};

 

 

function majaffichage()//-------------------maj changement img
{                             
	document.getElementById("diapo").style.backgroundImage= "url('"+(tabimage[select]).src+"')"; // maj img affiché
	document.getElementById("animdiapo").style.backgroundImage= "url('"+(tabimage[antselect]).src+"')"; // maj image transition

	(((document.getElementById("listimage")).getElementsByTagName("img"))[antselect]).id = "";   //maj ancienne selectionné style defaut
	(((document.getElementById("listimage")).getElementsByTagName("img"))[select]).id = "selectimg";//maj img selectionné style

	progress = null;

	trans = parseInt(Math.random()*6); //valeur alléatoire transition
									   //initialise animation transition
	document.getElementById("animdiapo").style.left="" ;
	document.getElementById("animdiapo").style.top="" ;
	document.getElementById("animdiapo").style.opacity="" ;
	document.getElementById("diapo").style.left="" ;
	document.getElementById("diapo").style.top="" ;

	imafix = false;
	requestAnimationFrame(etap); // appel animation barre de deffilement et transition   

}

 

function avance() //-----------------------------changement auto image

{

                antselect=select;             // savegarde ancienne image

                if (aleatoir)

                {

                               select = Math.floor( Math.random()*tabimage.length );

                }

                else

                {

                               select++ ;                                            // incrémentation image selectionné

                               if (select >= tabimage.length )  // retour début si der image

                                               select = 0 ;

                }

                majaffichage();

}

 

for (var num =0 ; num <tabimage.length ; num++) (function (num) // ----------detecteur click sur une image de la list , 'num' est le numéro de l'image clické

{

                ((document.getElementById("listimage")).getElementsByTagName("img")[num]).onclick = function(){clicimage(num)};

})(num);

 

function clicimage(n) //--------------- maj de l'image si click
{
	clearTimeout(repeteur);
	if (!clion)
		antselect=select; // savegarde ancienne image
	clion = true ;
	select = n;           // maj image selectiné avec celle clické
	if (imafix)
	{
		majaffichage();
	}
	else
	{
		nextim = true;
	}
}

 

function etap(timestamp) //------------------------ animation bare de defilement

{

                if (progress === null)

                {

                               progress = 0;//init temps

                               debdef = timestamp;

                              

 

                }

                progress = Math.min(progress + timestamp - debdef , progress + 40 ); // calc temps

                debdef = timestamp;

               

                var posfinal = (tabimage[select].offsetTop -(document.getElementById("listimage").offsetHeight/2) + tabimage[select].offsetHeight/2); // position final

                var posact = document.getElementById("listimage").scrollTop; //position barre de defilement

                document.getElementById("listimage").scrollTop =  (posfinal-posact)*(progress/durdef) + posact ;// calcule prochaine frame, position lors de l'animation

 

               

                if (trans==0)

                {              // transition fondu

                               document.getElementById("animdiapo").style.opacity = 1 - (progress/durdef);

                }

                else if (trans==1)

                {              //transition fondu noir

                               document.getElementById("diapo").style.opacity = 2*(progress/durdef)-1;

                               document.getElementById("animdiapo").style.opacity = 1 - 2*(progress/durdef);

                }             

                else if (trans==2)

                {              //transition defilement bas

                               document.getElementById("diapo").style.top =Math.min(0 , 100*(progress/durdef) -100 )+"%";

                               document.getElementById("animdiapo").style.top =Math.min(100 , 100*(progress/durdef)) +"%";

                }

                else if (trans==3)

                {              //transition defilement droit

                               document.getElementById("diapo").style.left =Math.min(0 , 100*(progress/durdef) -100 )+"%";

                               document.getElementById("animdiapo").style.left =Math.min(100 , 100*(progress/durdef)) +"%";

                }

                else if (trans==4)

                {              //transition defilement haut

                               document.getElementById("diapo").style.top =Math.max(0 ,100-100*(progress/durdef)  )+"%";

                               document.getElementById("animdiapo").style.top =Math.max(-100 ,  -100*(progress/durdef)) +"%";

                }

                else if (trans==5)

                {              //transition defilement gauche

                               document.getElementById("diapo").style.left =Math.max(0 , 100-100*(progress/durdef)  )+"%";

                               document.getElementById("animdiapo").style.left =Math.max(-100 , -100*(progress/durdef)) +"%";

                }

               

                if (progress < durdef) // vérification durrer animation

                               requestAnimationFrame(etap); // continue l'animation si pas fini

                else

                {

                               document.getElementById("animdiapo").style.opacity=0; // etat final (sychronisation)

                               document.getElementById("diapo").style.left="" ;

                               document.getElementById("diapo").style.top="" ;

                               document.getElementById("diapo").style.opacity=1;

                               imafix = true ;

                               clion = false ;

                               if (nextim)

                               {

                                               nextim = false;

                                               majaffichage();

                               }

                               else

                               {

                                               repeteur = setTimeout(avance, tmpchimg);

                               }

                }             

}

 

 

 

function pleimecrant()

{

                pebef = null;

                povolet = 0;

                requestAnimationFrame(animplein);

}

 

function animplein(timestamp)

{

                if (pebef===null)

                               pebef = timestamp;

                var anctmps = pebef;

                pebef = timestamp;

                var dlframe =  Math.min( timestamp-anctmps , 40);

                povolet = povolet + (dlframe/1000)*vitplein ;

               

                document.getElementById("listimage").style.left = '-'+povolet+'%';

                document.getElementById("dpo").style.width = povolet+(100-tvolet)+'%';         

               

               

                if ((povolet < tvolet) && blocplein)

                {

                               requestAnimationFrame(animplein);

                }

                else if (blocplein)

                {

                               document.getElementById("listimage").style.left = '-'+tvolet+'%';

                               document.getElementById("dpo").style.width = '100%';               

                               povolet = tvolet;

                }

}

 

function antiplein()

{             

                if (povolet > 0 && blocplein)

                {                             

                               blocplein = false ;

                               requestAnimationFrame(retplein);

                }

                else

                {

                               clearTimeout(delplein);

                               delplein = setTimeout(pleimecrant, tmpplein);

                }

}

 

function retplein(timestamp)

{

                if (pebef===null)

                               pebef = timestamp;

                var anctmps = pebef;

                pebef = timestamp;

                var dlframe = Math.min( timestamp-anctmps , 40);

                povolet =  povolet - (dlframe/1000)*vitplein ;

               

                document.getElementById("listimage").style.left = '-'+povolet+'%';

                document.getElementById("dpo").style.width = povolet+(100-tvolet)+'%';         

               

               

                if (povolet > 0)

                {

                               requestAnimationFrame(retplein);

                }

                else

                {

                               povolet = 0;

                               document.getElementById("listimage").style.left = '0%';

                               document.getElementById("dpo").style.width = (100-tvolet)+'%';           

                               delplein = setTimeout(pleimecrant, tmpplein);

                               blocplein = true ;

                }

}

                              

 

//-------------VLTcorp 2019 all right reserved-----------------
