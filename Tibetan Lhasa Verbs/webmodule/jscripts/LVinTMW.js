// LhasaVerbs Javascript page
// by Christopher E. Walker
// Latest Update

// Files which are needed to shift the entire web module:
/*
LVinTMW_0F*.html
LVinTMW.js		'This is the Javascript that I edit in HomeSite
LVdata.js
LVinTMW.css		'This the Cascading Style Sheet I edit in HomeSite
Thumi32.ico		'The icon that appears on the website
(audio files if necessary)
*/

// this was kind helping with tsheg spacing, but Safari showing space there: <span style = "word-spacing: -.4em;"> </span>

var e=new Array(); // this is the variable which holds the GetElementByClass stuff

// Make a special function GET ELEMENT BY CLASS!!
function getElementByClass(classname){  
 var inc=0; 
 var alltags=document.all? document.all : document.getElementsByTagName("*"); 
 for (i=0; i<alltags.length; i++){ 
   if (alltags[i].className==classname) 
     e[inc++]=alltags[i]; 
 }
}
// Declaring variables
// ------------------------------------------------------------------------------------------------------------------------------
// For fixing the Tones display
var strFixedTone = new Array(); // storing whether the block of text describing a tone is fixed or not by user.
// Maximum of Five Possible sample sentences, make double array.
strFixedTone[ 1] = new Array();
strFixedTone[ 2] = new Array();
strFixedTone[ 3] = new Array();
strFixedTone[ 4] = new Array();
strFixedTone[ 5] = new Array();
// -------------------------------- 
// A. The Tone Button
function mousedOnToneButton(toneButtonObject,refID,whichSentence,strToneJunk)
{ 	// Is the button not fixed down already?
	// alert(toneButtonObject.src); TAKE ME OUT!
	
	intRefID = parseInt(refID); // from the XHTML document, I took redID as a string, convert it to reference array.
		
	if (strFixedTone[ (parseInt(whichSentence))][ intRefID] != "True") // Button IS OFF!
	{
	toneButtonObject.src="images\/buttons\/buttonTone_on.gif";
		// myObject.style.color = "orange"; HAVE TO FIGURE IF I WANT ACCESS TO THE ORIGINAL FULL SENTENCE OBJECT
		for (var i=0; i<strToneJunk.length; i++)
		{	
		// alert(refID+"_"+whichSentence+"_"+strToneJunk+"_"+strToneJunk.length+"_"+i+"_"+strToneJunk.substr(i,1));
			switch (strToneJunk.substr(i,1))
			{
				case "^":
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.verticalAlign = "15%";
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.border = "";					
					break;
				case "_":
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.verticalAlign = "-15%";
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.border = "";
					break;
				case "|":
					// document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.color = "";	
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.background = 'transparent url("images\/other\/arrowDownOrangeSmall.gif") no-repeat scroll 75% 100%';			
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.border = "";
					break;
			}
		}
	}
}
// B.
function mousedOutToneButton(toneButtonObject,refID,whichSentence,strToneJunk)
{
	intRefID = parseInt(refID); // from the XHTML document, I took redID as a string, convert it to reference array.
	
	if (strFixedTone[ (parseInt(whichSentence))][ intRefID] != "True") // Button IS OFF!
	{	
	toneButtonObject.src="images\/buttons\/buttonTone_off.gif"; // then switch back the color, take out the display of tones.
		for (var i=0; i<strToneJunk.length; i++)
		{	
		/*alert(refID+"_"+whichSentence+"_"+strToneJunk+"_"+strToneJunk.length+"_"+i+"_"+strToneJunk.substr(i,1));*/
			switch (strToneJunk.substr(i,1))
			{
				case "^":
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.verticalAlign = "0%";
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.border = "";					
					break;
				case "_":
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.verticalAlign = "0%";
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.border = "";
					break;
				case "|":
					// document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.color = "";	
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.backgroundImage = "none";				
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.border = "";
					break;
			}
		}	
	}
}
// C.
function clickedOnToneButton(toneButtonObject,refID,whichSentence,strToneJunk)
{
	intRefID = parseInt(refID); // from the XHTML document, I took redID as a string, convert it to reference array.
	
	// If the Button is truly on, then after click turn it off and disable the displaying of tones.
	if (strFixedTone[ (parseInt(whichSentence))][ intRefID] == "True") // Button IS ON!!!
	{
		toneButtonObject.style.backgroundColor = ""; // Give it a background color with a border.
		toneButtonObject.style.border = "";
		
		for (var i=0; i<strToneJunk.length; i++)
		{
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.verticalAlign = "";
					document.getElementById("tibetanTone_"+refID+"_"+whichSentence+"_"+(i+1)).style.background = "";
		};
		
		// don't need this: strFixedTone[ parseInt(whichSentence)][ intRefID] = new Boolean();
		strFixedTone[ parseInt(whichSentence)][ intRefID] = "False";
	}
	else // Not fixed, so make it fixed
	{
		toneButtonObject.style.backgroundColor = "red";
		toneButtonObject.style.border = "thin groove yellow";
		
		strFixedTone[ parseInt(whichSentence)][ intRefID] = new Boolean();
		strFixedTone[ parseInt(whichSentence)][ intRefID] = "True";
	}
	// don't need this: alert(strFixedTone[ intRefID]);
}
// --------------------------------------------------------------------------------------------------------------------------------

// Declaring variables for Phonetics button
// ------------------------------------------------------------------------------------------------------------------------------
// For fixing the Tones display
var phoneticsButton = new Array(); // storing whether the block of text describing a tone is fixed or not by user.
// Maximum of Five Possible sample sentences, make double array.
phoneticsButton[ 1] = new Boolean();
phoneticsButton[ 2] = new Boolean();
phoneticsButton[ 3] = new Boolean();
phoneticsButton[ 4] = new Boolean();
phoneticsButton[ 5] = new Boolean();
// -------------------------------- 
// A. The Phonetics Button
function mousedOnPhoneticsButton(phoneticsButtonObject,refID,whichSentence)
{ 	// Is the button not fixed down already?
	intRefID = parseInt(refID); // from the XHTML document, I took refID as a string, convert it to reference array.
			
	if (phoneticsButton [ parseInt(whichSentence)][ intRefID] != "True") // Button IS OFF!
	{
	phoneticsButtonObject.src="images\/buttons\/buttonPhonetics_on.gif";
	document.getElementById("phoneticsLine_"+refID+"_"+whichSentence).style.display = "inline";
	}
}
// B.
function mousedOutPhoneticsButton(phoneticsButtonObject,refID,whichSentence)
{
	intRefID = parseInt(refID); // from the XHTML document, I took redID as a string, convert it to reference array.
	
	if (phoneticsButton[ (parseInt(whichSentence))][ intRefID] != "True") // Button IS OFF!
	{	
	phoneticsButtonObject.src="images\/buttons\/buttonPhonetics_off.gif"; // then switch back the color, take out the display of tones.
	document.getElementById("phoneticsLine_"+refID+"_"+whichSentence).style.display = "none";
	}
}
// C.
function clickedOnPhoneticsButton(phoneticsButtonObject,refID,whichSentence)
{
	intRefID = parseInt(refID); // from the XHTML document, I took redID as a string, convert it to reference array.
	
	// If the Button is truly on, then after click turn it off and disable the displaying of phonetics.
	if (phoneticsButton [ (parseInt(whichSentence))][ intRefID] == "True") // Button IS ON!!!
	{
		phoneticsButtonObject.style.backgroundColor = ""; // Give it a background color with a border.
		phoneticsButtonObject.style.border = "";

		phoneticsButton[ parseInt(whichSentence)][ intRefID] = "False";
		document.getElementById("phoneticsLine_"+refID+"_"+whichSentence).style.display = "none";
	}
	else // Not fixed, so make it fixed
	{
		phoneticsButtonObject.style.backgroundColor = "#ab03ff";
		phoneticsButtonObject.style.border = "thin groove #03ffe7";
		
		phoneticsButton[ parseInt(whichSentence)][ intRefID] = new Boolean();
		phoneticsButton[ parseInt(whichSentence)][ intRefID] = "True";
	}
}
function mousedOnPhoneticsLine() {};
function mousedOutPhoneticsLine() {};
function clickedOnPhoneticsLine() {};
// --------------------------------------------------------------------------------------------------------------------------------






// clicked on an Note Icon function
	function clickedIcon(myObject,whichIcon) 
	{
	 	myObject.style.borderStyle = "solid";
		myObject.style.borderColor = "purple";
	}
	function mousedOnIcon(myObject,whichIcon)
	{
		myObject.style.borderStyle = "solid";
		myObject.style.borderColor = "#ff0000";
		myObject.style.borderWidth = "thin";
	}
	function mousedOutIcon(myObject,whichIcon)
	{
		myObject.style.borderStyle = "none";
	}
	

// interacting with English Translations of the Tibetan examples
	function clickedOnExTibSenEngGloss(myObject,refID,whichEng,howManyParts)
	{
		myObject.style.color = "white";
		myObject.style.wordSpacing = ".6em";
		myObject.style.letterSpacing = ".05em";
		myObject.style.fontStyle = "normal";
		myObject.style.fontSize = "145%";
		myObject.style.fontFamily = "sans-serif";
		myObject.style.textShadow = "1em";
		
		for (var i=0; i<howManyParts; i++)
		{	
			document.getElementById("EnglishDivider_"+refID+"_"+whichEng+"_"+(i+1)).style.display="inline";
		}
		
	}
	function mousedOnExTibSenEngGloss(myObject,refID,whichEng,howManyParts)
	{
		myObject.style.color = "pink";
	}
	function mousedOutExTibSenEngGloss(myObject,refID,whichEng,howManyParts)
	{
		myObject.style.color = "lightblue";
		myObject.style.wordSpacing = "normal";
		myObject.style.letterSpacing = "normal";
		myObject.style.fontStyle = "italic";
		myObject.style.fontSize = "130%";
		myObject.style.fontFamily = "";
		
		
		for (var i=0; i<howManyParts; i++)
		{	
			document.getElementById("EnglishDivider_"+refID+"_"+whichEng+"_"+(i+1)).style.display="none";
		}
		
	}
	
// mousing over the Tibetan Example Sentences
	function mousedOnExTibSentenceUNI(myObject,refID,whichSentence,strToneJunk)
	{
	}
	function mousedOutExTibSentenceUNI(myObject,refID,whichSentence,strToneJunk)
	{	
	}
	function clickedOnExTibSentenceUNI(myObject,refID,whichSentence,strToneJunk)
	{	
	}

// Change all the Tibetan characters to the new font choice
function changeFontDELME(newFont) {
	var strFontChoice = newFont.value;
	if  (strFontChoice == "User defined...")
		var strFontChoice = prompt("Enter the EXACT system name of your Tibetan Unicode font: ","Enter the font name here");
	
	// DON'T NEED strFontChoice = '"' + strFontChoice + '"';
	document.getElementById("pleaseWait").style.display="inline";   // Display the PLEASE WAIT sign
		document.getElementById("AlphaHeadLetterUNI").style.fontFamily = strFontChoice;
		document.getElementById("AlphaMenuUNI").style.fontFamily = strFontChoice;
		getElementByClass("ExTibSentenceUNI");
			for(var i=0;i<e.length;i++){e[i].style.fontFamily = strFontChoice;};
		getElementByClass("verbUNI");
			for(var i=0;i<e.length;i++){e[i].style.fontFamily = strFontChoice;};
		getElementByClass("CommentsTibetanUNI");
			for(var i=0;i<e.length;i++){e[i].style.fontFamily = strFontChoice;};
		getElementByClass("VerbPastUNI");
			for(var i=0;i<e.length;i++){e[i].style.fontFamily = strFontChoice;};
		getElementByClass("VerbFutureUNI");
			for(var i=0;i<e.length;i++){e[i].style.fontFamily = strFontChoice;};
		getElementByClass("VerbImperativeUNI");
			for(var i=0;i<e.length;i++){e[i].style.fontFamily = strFontChoice;};
		getElementByClass("VerbpronunciationUNI");
			for(var i=0;i<e.length;i++){e[i].style.fontFamily = strFontChoice;};
		// turn the background black to refresh the background
		var objBodyTag = document.getElementsByTagName("body");
		objBodyTag[0].style.backgroundColor="black";
		
	document.getElementById("pleaseWait").style.display="none";   // Take-off the PLEASE WAIT sign
	}
	
function changeFont(newFont) {
	var strFontChoice = newFont.value;
	for (var i=0;i<arrTibLangElems.length;i++) {
		arrTibLangElems[ i].style.fontFamily = strFontChoice; };
	// turn the background black to refresh the background
	document.getElementsByTagName("body")[0].style.backgroundColor="black";
	
	// !!! Still to fix: Kha now doesn't work, rest of objects with Tibetan language, such as: Alpha head letter, alpha menu, tenses, comments, related expressions, pronunciation, etc...
	
};	
function changeSize(newSize) {
	var strSizeChoice = newSize.value;
	for (var i=0;i<arrTibLangElems.length;i++) {arrTibLangElems[ i].style.fontSize = strSizeChoice;};
	// turn the background black to refresh the background
	document.getElementsByTagName("body")[0].style.backgroundColor="black";
};
	
// Change all the Tibetan characters to the new size choice
function changeSizeOLD (newSize) {
document.getElementById("pleaseWait").style.display="inline";   // Display the PLEASE WAIT sign
	var strSizeChoice = newSize.value
	getElementByClass("ExTibSentenceUNI");
		for(var i=0;i<e.length;i++){e[i].style.fontSize = strSizeChoice;}
		getElementByClass("CommentsTibetanUNI");
	for(var i=0;i<e.length;i++){e[i].style.fontSize = strSizeChoice;}
	// turn the background black to refresh the backgroud
	var objBodyTag = document.getElementsByTagName("body");
	objBodyTag[0].style.backgroundColor="black";
document.getElementById("pleaseWait").style.display="none";   // Take-off the PLEASE WAIT sign
}

function externalLinks() {
 if (!document.getElementsByTagName) return;
 var anchors = document.getElementsByTagName("a");
 for (var i=0; i<anchors.length; i++) {
   var anchor = anchors[i];
   if (anchor.getAttribute("href") &&
       anchor.getAttribute("rel") == "external")
     anchor.target = "_blank";
 }
} 


function restOfOptions()
{
/*
	document.writeln('Tibetan&nbsp;Font:&nbsp;');
	document.writeln('<select id="SelectFontBox" name="LVFont" onchange="changeFont(this)">');
	document.writeln('<option value="Browser UCS Default">Browser UCS Default');
	document.writeln('<option value="Xenotype Tibetan">Xenotype Tibetan');
	document.writeln('<option value="Microsoft Himalaya">Microsoft Himalaya');
	document.writeln('<option value="Tibetan Machine Uni">Tibetan Machine Uni');
	document.writeln('<option value="TCRC Youtso Unicode">TCRC Youtso Unicode');
	document.writeln('<option value="Tsuig_03">Tsuig_03');
	document.writeln('<option value="Uchen_05">Uchen_05');
	document.writeln('<option value="XTashi">XTashi');
	document.writeln('<option value="Wangdi29">Wangdi29');
	document.writeln('<option value="User defined...">User defined...');
	document.writeln('<\/select>');

	document.writeln('Size:&nbsp;');
	document.writeln('<select id="SelectSizeBox" name="LVSize" onchange="changeSize(this)">');
	document.writeln('<option value="300%">300%');
	document.writeln('<option value="275%">275%');
	document.writeln('<option value="250%">250%');
	document.writeln('<option value="225%">225%');
	document.writeln('<option value="200%">200%');
	document.writeln('<option value="175%">175%');
	document.writeln('<option value="150%">150%');
	document.writeln('<option value="125%">125%');
	document.writeln('<option value="100%">100%');
	document.writeln('<option value="75%">75%');
	document.writeln('<option value="50%">50%');
	document.writeln('<\/select>');

	document.writeln('Enter&nbsp;Ref#:&nbsp;');
	document.writeln('<input type="text" id="strRefID" maxlength="50" size="5" onfocus = "focusOnRefNoBox()" onblur = "blurOnRefNoBox()" title="Enter Reference Number here">');
	document.writeln('<input type="button" id="btnRefID" value="Go!" onclick="submitOnRefNoBox()" >');
	document.writeln('<br \/>');
*/

}
	
	function focusOnRefNoBox() {
		document.getElementById("strRefID").style.backgroundColor = "LightGreen";}
	function blurOnRefNoBox() {
		document.getElementById("strRefID").style.backgroundColor = "Yellow";}
	function submitOnRefNoBox() {
		var goingHere = document.getElementById("strRefID").value;
		for (i=0; i<LVdata.length; i++) {
			if (LVdata[ i].refID == goingHere) {
			// delme	alert ("I found Ref#" + LVdata[ i].refID + "on page " + LVdata[ i].pageNoUNI);
			window.location.href = ("LVinTMW_"+LVdata[ i].pageNoUNI + ".html#ref" + goingHere);
			}
		}
		
	}
		
// div tag saying "please wait.. 
	document.writeln('<div id="pleaseWait">Please Wait...<\/div>');
	document.getElementById("pleaseWait").style.zIndex = "200";
	document.getElementById("pleaseWait").style.position = "absolute";
	document.getElementById("pleaseWait").style.backgroundColor = "DarkBlue";
	document.getElementById("pleaseWait").style.padding = ".7em .7em .7em .7em";
	document.getElementById("pleaseWait").style.textAlign = "center";
	document.getElementById("pleaseWait").style.fontSize = "150%";
	document.getElementById("pleaseWait").style.bottom = "50%";
	document.getElementById("pleaseWait").style.left = "40%";
	document.getElementById("pleaseWait").style.border = "thick solid yellow"; 
	document.getElementById("pleaseWait").style.display="none";
	
// experimenting making my LV object with data!



// LV object constructor
//function addLVrow(verb,refID) {
	//this.verb = verb;
	//this.refID = refID;
//}


//var LVdata = new Array();
//LVdata[ 1] = new addLVrow('\u0F40\u0F42',879);

// alert("LV object 1 has:\n" + LVdata[4].verb + LVdata[4].refID);
	
// end of Javascript code
