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
Last modified: April 24, 2017
*/
function generateTable(game) {
	var tab = document.getElementsByTagName(“table”)[0];
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
Last modified: April 24, 2017
*/
function generateTiles(game) {
	for(y=0; y<game.sizeY; y++) {
		var row = document.getElementsByClassName(“row” + y);
		for(x=0; x<game.sizeX; x++) {
			var el = row.getElementsByClassName(“col” + x)[0];
            if(game.tileTypeArray[y*game.sixeX + x] !== "CC") {
                var tile = document.createElement(“div”);
                tile.className = “tile “ + 
                    game.tileTypeArray[y*game.sixeX + x];
                
                //tile.addEventListener("mousedown", dragTiles);
                //tile.addEventListener("mouseup", dropTiles);
                
                el.appendChild(tile);
            } else {
                el.className += " current";
            }
		}
	}
}


/**
var mousedownID = null;
var onDropTarget = false;

function mousedownfn(event) {
    if(!mousedownID) {
        var curList = document.getElementsByClassName("current")[0].classList;
        var elList = event.currentTarget.parentElement.classList;
        var pos = [];
        var targ;
        var dragObj = new Object();
        
        if(curList.item(0) == elList.item(0)) {
            dragObj.isRow = false;
            dragObj.targetClass = "row";
            dragObj.offsetCoord = event.clientY;
            pos[0] = parseInt(curList.item(1).charAt(3));
            pos[1] = parseInt(elList.item(1).charAt(3));
            targ = document.getElementsByClassName(curList.item(0));
            
        } else if(curList.item(1) == elList.item(1)) {
            dragObj.isRow = true;
            dragObj.targetClass = "col";
            dragObj.offsetCoord = event.clientX;
            pos[0] = parseInt(curList.item(0).charAt(3));
            pos[1] = parseInt(elList.item(0).charAt(3));
            targ = document.getElementsByClassName(curList.item(1));
            
        } else {
            return;
        }
        dragObj.tileWidth = parseInt(event.currentTarget.style.width);
        dragObj.moveDir = pos[1] < pos[0];
        dragObj.targetClass += (pos[1] + (dragObj.moveDir ? 1:-1));
        
        pos[dragObj.moveDir ? 0:1]++;
        targ = targ.slice.apply(this, pos.sort());
        dragObj.tiles = [];
        for(var item of targ) {
            dragObj.tiles.push(item.firstChild);
        }
        
        mousedownID = setInterval(function(){ dragTiles(dragObj, event); }, 40);
    }
}


function dragTiles(obj, event) {
    if(this.isRow == true) {
        for(var i=0; i<this.tiles.length; i++) {
            this.tiles[i].style.position = "absolute";
            this.tiles[i].style.top = "inherit";
            //var num = parseInt(item.parentElement.classList.item(1).charAt(3));
            this.tiles[i].style.left = 
                (event.screenX - this.offsetCoord + i*this.tileWidth*(this.moveDir ? 1:1-this.tiles.length)) + "px";
        }
    } else {
        for(var i=0; i<this.tiles.length; i++) {
            this.tiles[i].style.position = "absolute";
            this.tiles[i].style.left = "inherit";
            //var num = parseInt(item.parentElement.classList.item(1).charAt(3));
            this.tiles[i].style.top = 
                (event.screenY - this.offsetCoord + i*this.tileWidth*(this.moveDir ? 1:1-this.tiles.length)) + "px";
        }
    }
}

/*
function dragTiles(event) {
    var curr = document.getElementsByClassName("current")[0];
    var el = event.currentTarget.parentElement;
    var tileWidth = parseInt(el.style.width);
    var isRow;
    var offsetCoord;
    if(curr.classList.item(0) == el.classList.item(0)) {
        isRow = false;
        offsetCoord = event.clientY;
    } else if(curr.classList.item(1) == el.classList.item(1)) {
        isRow = true;
        offsetCoord = event.clientX;
    } else {
        return;
    }
    var pos[0] = parseInt(curr.classList.item(isRow ? 0:1).charAt(3));
    pos[1] = parseInt(event.currentTarget.parentElement.classList.item(isRow ? 0:1).charAt(3));
    var moveDir = pos[1] < pos[0];
    pos[moveDir ? 0:1]++;
    var targetClass = isRow ? "row":"col";
    targetClass += (pos[1] + (moveDir ? -1:1));
    var targ = document.getElementsByClassName(curr.classList.item(isRow ? 1:0));
    targ = targ.slice.apply(this, pos.sort());
    var tiles;
    for(var item of targ) {
        //if(item.firstChild) //unnecessary?
            tiles.push(item.firstChild);
    }
    
    //Somehow make the elements between clicked element and "current"
    //align horizontally or vertically with mouse, while remaining in
    //line with their table row or column.
    //
    //el.firstChild.style.position = "absolute";
    //el.firstChild.style.top = isRow ? "inherit":event.screenY-offsetCoord;
    //el.firstChild.style.left = isRow ? event.screenX-offsetCoord:"inherit";
    //
    if(isRow == true) {
        for(var i=0; i<tiles.length; i++) {
            tiles[i].style.position = "absolute";
            tiles[i].style.top = "inherit";
            //var num = parseInt(item.parentElement.classList.item(1).charAt(3));
            tiles[i].style.left = 
                (event.screenX - offsetCoord + i*tileWidth*(moveDir ? 1:1-tiles.length)) + "px";
        }
    } else {
        for(var i=0; i<tiles.length; i++) {
            tiles[i].style.position = "absolute";
            tiles[i].style.left = "inherit";
            //var num = parseInt(item.parentElement.classList.item(1).charAt(3));
            tiles[i].style.top = 
                (event.screenY - offsetCoord + i*tileWidth*(moveDir ? 1:1-tiles.length)) + "px";
        }
    }
}



/*
function dropTiles(event) {
    
}
*/


/* SCRAMBLE(REPEATS)
Makes "repeats" # of alternating vertical and horizontal moves
of random length.

**Check isSolved for scrambled game! 

Author: Nils Hansander
Last modified: April 25, 2017
*/
function scramble(repeats) {
    var pos;        //(int) nodelist indices: current and drop target
    var targ;       //Nodelist of table elements
    var el2Move;    //Nodelist of "tile" div elements to move
    var moveDir;    //Affect index of target node to append "tile"
    //isRow determines if table row or column elements are processed
    var isRow = Math.random() < 0.5;
    var curr = document.getElementsByClassName(“current”)[0];
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
        for(var item of targ) {
            if(item.firstChild)
                el2Move.push(item.firstChild);
        }
        
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
Last modified: April 24, 2017
*/
function isSolved(game) {
	var checkDir = {
		E = 'W', W = 'E', N = 'S', S = 'N'
	}
	//temporary div created to fill "current" empty cell.
    var temp = document.createElement(“div”);
	temp.className = “tile CC”;
	document.getElementsByClassName(“current”)[0].appendChild(temp);
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
	document.getElementsByClassName(“current”)[0].removeChild(temp);
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