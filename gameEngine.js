/*GAMEENGINE
Functions related to the game mechanics.
List of functions (UPDATE!):
-generateTable(game)
-generateTiles(game)
-scramble(repeats)
-isSolved(game)
-Game(sizeX, sizeY, entryRow, exitRow, tileTypeArray)
-getGame(difficulty, levelIndex)
TODO: move tiles (custom drag-drop?), game score,
game "master" function? et c...
*/

/* GENERATETABLE(GAME)
Appends table row (<tr>) and table cell (<td>) elements to
<table> element.

Author: Nils Hansander
Last modified: April 23, 2017
*/
function generateTable(game) {
	var tab = document.getElementsByTagName(“table”);
	for(y=0; y<game.sizeY; y++) {
		var row = document.createElement(“tr”);
		for(x=0; x<game.sizeX; x++) {
			var el = document.createElement(“td”);
			el.className = “col” + x + “ row” + y;
			row.appendChild(el);
		}
		tab.appendChild(row);
	}
}


/* GENERATETILES(GAME)
Appends "tiles", ie <div> elements to table cells.

Author: Nils Hansander
Last modified: April 23, 2017
*/
function generateTiles(game) {
	for(y=0; y<game.sizeY; y++) {
		var row = document.getElementsByClassName(“row” + y);
		for(x=0; x<game.sizeX; x++) {
			var el = row.getElementsByClassName(“col” + x);
            if(game.tileTypeArray[y*game.sixeX + x] !== "CC") {
                var tile = document.createElement(“div”);
                tile.className = “tile “ + 
                    game.tileTypeArray[y*game.sixeX + x];
                el.appendChild(tile);
            } else {
                el.className += "current";
            }
		}
	}
}


/* SCRAMBLE(REPEATS)
Makes "repeats" # of alternating vertical and horizontal moves
of random length.

**Check isSolved for scrambled game! 

Author: Nils Hansander
Last modified: April 18, 2017
*/
function scramble(repeats) {
    var pos;        //(int) nodelist indices: current and drop target
    var targ;       //Nodelist of table elements
    var el2Move;    //Nodelist of "tile" div elements to move
    var moveDir;    //Affect index of target node to append "tile"
    //isRow determines if table row or column elements are processed
    var isRow = Math.random() < 0.5;
    var curr = document.getElementsByClassName(“current”);
    curr.classList.remove("current");
    
    for(i=0; i<repeats; i++) {
        //currently empty row or column index
        pos[0] = parseInt(curr.classList.item(isRow ? 0:1).charAt(3));
        //retrieves row or column nodelist
        targ = document.getElementsByClassName(curr.classList.item(isRow ? 1:0));
        //selects random index, except pos[0]
        pos[1] = (pos[0] + Math.floor(Math.random()*(targ.length-2)) + 1)%targ.length;
        curr = targ[pos[1]];
        
        moveDir = pos[1] < pos[0] ? 0:1;
        pos[moveDir]++;
        targ = targ.slice.apply(this, pos.sort()); //!! "this" may refer to global object?
        el2Move = targ.children;
        
        for(j=1; j<targ.length; j++) {
            targ[j-moveDir].appendChild(el2Move[j-1]);
        }
        isRow = !isRow;
    }
    curr.classList.add("current");
}


/* ISSOLVED(GAME)
Returns "true" if the puzzle is solved. Also stores path of
connected rail pieces in game.connectedTiles (Array).

Author: Nils Hansander
Last modified: April 23, 2017
*/
function isSolved(game) {
	var checkDir = {
		E = 'W', W = 'E', N = 'S', S = 'N'
	}
	//temporary div created to fill "current" empty cell.
    var temp = document.createElement(“div”);
	temp.className = “tile CC”;
	document.getElementsByClassName(“current”).appendChild(temp);
    //retrieves all "tile" divs in a nodelist
	var tiles = document.getElementsByClassName(“tile”);

	var x = 0;
	var y = game.entryRow;
	var lastDir = “E”;
    game.connectedTiles = [];
    
	do {
		if(x<0 || x>game.sizeX-1 || y<0 || y>game.sizeY-1) {
			return false;
		} else {
			trackDir = game.tileTypeArray[y*game.sizeX + x].classList.item(1);
            
			if(trackDir.charAt(0) == checkDir[lastDir]) {
				lastDir = trackDir.charAt(1);
                //Push to array of rail connections
                game.connectedTiles.push(trackDir);
			} else if(trackDir.charAt(1) == checkDir[lastDir]){
				lastDir = trackDir.charAt(0);
                game.connectedTiles.push(trackDir.charAt(1) + lastDir);
			} else {
				return false;
			}
		}
		if(lastDir == “E”) {
			x++;
		} else if(lastDir == “W”) {
			x--;
		} else if(lastDir == “N”) {
			y--;
		} else {
			y++;
		}
	} while( !(x == game.sizeX && y == game.exitRow) );
	document.getElementsByClassName(“current”).removeChild(temp);
	return true;
}


/* GAME(SIZEX, SIZEY, ENTRYROW, EXITROW, TILETYPEARRAY)
Constructor for the Game object. Object parameters are
"sizeX" (width), "sizeY" (height), "entryRow" (row index of
leftmost column, where path begins), "exitRow" (row index of
rightmost column, where path ends), "tileTypeArray"
(an array consisting of the following 2-char strings:
WE, NS, SE, SW, NE, NW, XX (plain tile), CC (empty cell).
These strings will define the railroad track layout),
and "connectedTiles" (array of connected tile types,
defined in isSolved()).

Author: Nils Hansander
Last modified: April 21, 2017
*/
function Game(sizeX, sizeY, entryRow, exitRow, tileTypeArray) {
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.entryRow = entryRow;
	this.exitRow = exitRow;
	this.tileTypeArray = tileTypeArray;
	this.connectedTiles;
    //this.timer;
}


/*GETGAME(DIFFICULTY, LEVELINDEX)
Takes input "difficulty" (String) and "levelIndex" (int)
and returns a Game object. "difficulty" can have the values
"easy", "medium", or "hard".

Author: Nils Hansander
Last modified: April 23, 2017
*/
function getGame(difficulty, levelIndex) {
    var easy1 = new Game(4, 4, 2, 1, [
                "XX", "XX", "CC", "XX", 
				"SE", "SW", "SE", "WE",
				"NW", "NS", "NE", "SW",
				"XX", "NE", "WE", "NW"	]);
    var easy2 = new Game(6, 4, 2, 1, [
                "", "", "", "", "", "",
				"", "", "", "", "", "",
                "", "", "", "", "", "",
				"", "", "", "", "", ""	]);
    var medium1 = new Game(6, 6, 3, 2, [
                "", "", "", "", "", "",
				"", "", "", "", "", "",
                "", "", "", "", "", "",
				"", "", "", "", "", "",
                "", "", "", "", "", "",
				"", "", "", "", "", ""	]);
    var medium2 = new Game(8, 6, 3, 2, [
                "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", ""	]);
    var hard1 = new Game(8, 8, 4, 3, [
                "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", ""	]);
    var hard2 = new Game(10, 8, 4, 3, [
                "", "", "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
				"", "", "", "", "", "", "", "", "", ""	]);
    
    var games = {
        easy: [easy1, easy2],
        medium: [medium1, medium2],
        hard: [hard1, hard2]
    }
    return games[difficulty][levelIndex];
}