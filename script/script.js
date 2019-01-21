var inRow = 1
var inColumn = 1
var	randomWoord = words[Math.floor(Math.random() * words.length)];
var antwoord = [];
var addletters = [randomWoord.charAt(0), " ", " ", " ", " "];

	function create(){	
	    for (var i=1; i<6; i++) {
	        var row = document.createElement("div");
	        row.id = "row" + i;
	        row.setAttribute("class", "row");

	        for (var c=1; c<6; c++){
	            var column = document.createElement("div");
	            row.appendChild(column);
	            column.id = "column_" + i + "."+c;
	            column.setAttribute("class", "column");

	            var paragraph = document.createElement("p");
	            paragraph.style.position = "absolute";
	            paragraph.style.margin = "0";
	            paragraph.style.lineHeight = "85px";
	            paragraph.style.textAlign = "center";
	            paragraph.style.width = "98px";
	            column.appendChild(paragraph);
	        }

	        document.getElementById("game-container").appendChild(row);
	        typing();
	    }
	    autoCorrect();
	}



	function typing(){
		document.onkeypress = function(event){
			var	keyPress = String.fromCharCode(event.keyCode);
			if (keyPress.match(/[a-z]/i)&& inColumn <6){
				document.getElementById("column_" + inRow + "." + inColumn).firstChild.style.opacity = "1";
				document.getElementById("column_" + inRow + "." + inColumn++).firstChild.innerHTML = keyPress;
				antwoord.push(keyPress);
				next();
			}else if (!keyPress.match(/[a-z]/i)) {alert("Gebruik a.u.b. alleen letters.");}
		}
	}

	function next(){
		if (inColumn > 5){
			verify();
		 setTimeout(function() {
		 	inColumn = 1
		 	inRow++
		 if (inRow > 5){
		 	alert("Helaas het woord was " + randomWoord);
		 	location.reload();
		 }
		 autoCorrect()
		 checkLetters();
		 antwoord.splice(0,antwoord.length);
		 }, 1000);
		}
	}

	function verify(){
		var	letterWoord = randomWoord.split("");

		for (t=0; t<letterWoord.length; t++) {
			if (letterWoord[t] == antwoord[t]) {
				addletters[t] = antwoord[t];
				document.getElementById("column_"+ inRow + "." + (t + 1)).style.backgroundColor= "green"
				antwoord[t] = " "
				letterWoord[t] = "*"
			}
		}

		if (checkLetters(letterWoord, '*') == true){
			setTimeout(function(){
				alert("Gefeliciteerd! je hebt het woord geraden");
				location.reload();
			}, 500);
		}

		for (t=0; t<letterWoord.length; t++) {
			for (k=0; k<letterWoord.length; k++) {
				if (antwoord[t]==letterWoord[k]) {
					document.getElementById("column_"+ inRow + "." + (t + 1)).style.backgroundColor= "yellow"
					antwoord[t] = " "
					letterWoord[k] = "*"

				}
			}
		}
		antwoord.splice(0, antwoord.length)
	}

	function checkLetters(myArray, symbol){
		for (o = 0; o < 5; o++){
			if (myArray[o] != symbol){
				return false;
			}
		}
		return true;
	}

	function autoCorrect(){
		for (b = 1; b < 6; b++){
			document.getElementById("column_" + inRow + "." + b).firstChild.innerHTML = addletters[b-1];
			document.getElementById("column_" + inRow + "." + b).firstChild.style.opacity = "0.5";
		}
	}


	console.log(randomWoord)
	create();