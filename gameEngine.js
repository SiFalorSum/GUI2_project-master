/*GAMEENGINE
Functions related to the game mechanics.
List of functions (UPDATE!):
-docLoaded(fn)              W:working, F:finished
-gameMaster()               W
-endGame(game)
-tutorialfn()
-generateTable(game)        W, F
-generateTiles(game)        W
-tableStyle(tile)           W
-tileStyle(tile, size)      W
-getImgSize(size)           W
-moveTiles(cl, isRow, pos)  W
-clickfn(event)             W
-scramble(game, repeats)    W, F
-isSolved(game)             W, F
-Game(sizeX, sizeY, entryRow, exitRow, tileTypeArray)   W
-getGame(difficulty, levelIndex)    W
TODO: move tiles (graphics & animations), game score,
game "master" function? et c...
*/


/**/
function docLoaded(fn) {
    if (document.readyState !== 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}


/*
For testing purposes.
*/
function gameMaster2(gamelevel, levelindex) {
    var el2hide = document.getElementById("hidediv");
    el2hide.style.display = "none";
    
    var game = getGame(gamelevel, levelindex);
    generateTable(game);
    generateTiles(game);
    var i = 0;
    do {
        scramble(game, 3);
        if(i>5) {
            alert('Bad behavior in scramble');
            break;
        }
        i++;
    } while(isSolved(game));
    var resizeTimeout;
    window.addEventListener("resize", function() {
        if(!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                tableStyle();
            }, 100);
        }
    });
}


/* GAMEMASTER()
Initiates and controls the game.

Authors: Lejuan Hu, Nils Hansander
Last modified: May 21, 2017
*/
function gameMaster(gamelevel, levelindex) {
    var el2hide = document.getElementById("hidediv");
    el2hide.style.display = "none";
    
    var game = getGame('easy', 0);
    generateTable(game);
    generateTiles(game);
    
    //Checks if scrambled game isn't solved by accident.
    var i = 0;
    do {
        scramble(game, 1);
        if(i>2) {
            alert('Bad behavior of game in function scramble');
            return;
        }
        i++;
    } while(isSolved(game));
    //Resizes game on resize event.
    var resizeTimeout;
    window.addEventListener("resize", function() {
        if(!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                tableStyle();
            }, 100);
        }
    });
    
    //may need other lines to make game start. I am not sure which functions should be called. may be you can add some lines.
    var startM = addZero(d.getUTCMinutes());// get game start minute
    var startS = addZero(d.getUTCSeconds());//get game start second

    // caculate time, play audio when game starts 50s.
    while(!isSolved()){
        var nowM = addZero(d.getUTCMinutes()); //get time(minute) at this moment
        var nowS = addZero(d.getUTCSeconds()); // get time(second) at this moment
        var duration = nowM * 60 + nowS - startM * 60 - startS;
        if(duration>50 && duration<70) {
            var timer = document.createElement("audio");
            timer.innerHTML = '<source src="' + 'audio/timer.mp3' + '" type="audio/mp3" />';
            timer.setAttribute("volume",0.5)
            timer.play();
        }
        break;
    }
    // jump out the loop either because complete game or timeout
    if(isSolved()){
        var bg = document.getElementById('bgmusic');
        bg.pause();
        var success;
        success = document.createElement('audio');
        success.innerHTML = '<source src="' + 'audio/welcome.mp3'+ '" type="audio/mp3" />'
        success.play();
    }
    else{
        var fail;
        var bg2 = document.getElementById('bgmusic');
        bg2.pause();
        fail = document.createElement('audio');
        fail.innerHTML = '<source src="' + 'audio/welcome.mp3'+ '" type="audio/mp3" />'
        fail.play();
    }
}


/**/
function endGame(game, imSrc) {
    var img = document.getElementById("endgameGIF");
    if(!imSrc) {
        img.src = "end_game/3_Star_Complete.gif";
    } else {
        img.src = imSrc;
    }
    
    var size = getImgSize(game.sizeY);
    img.width = size*game.sizeX;
    img.height = size*game.sizeY;
    
    var resizeTimeout;
    window.addEventListener("resize", function() {
        if(!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                size = getImgSize(game.sizeY);
                img.width = size*game.sizeX;
                img.height = size*game.sizeY;
            }, 100);
        }
    });
}


/**/
function tutorialfn() {
    var game = getGame("tutorial", 0);
    generateTable(game);
    generateTiles(game);
    var imSrc = "end_game/tutorial_cursor.gif"; //Change this!
    endGame(game, imSrc);
    var resizeTimeout;
    window.addEventListener("resize", function() {
        if(!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                tableStyle();
            }, 100);
        }
    });
}


/* GENERATETABLE(GAME OBJECT "GAME")
Appends table row (<tr>) and table cell (<td>) elements to
<table> element.

Author: Nils Hansander
Last modified: April 24, 2017
*/
function generateTable(game) {
	var tab = document.getElementById("gameTable");
	for(var y=0; y<game.sizeY; y++) {
		var row = document.createElement('tr');
		for(var x=0; x<game.sizeX; x++) {
			var el = document.createElement('td');
			el.className = 'col' + x + ' row' + y;
			row.appendChild(el);
		}
		tab.appendChild(row);
	}
}


/* GENERATETILES(GAME OBJECT "GAME")
Appends "tiles", ie <div> elements to table cells.

Author: Nils Hansander
Last modified: May 21, 2017
*/
function generateTiles(game) {
	for(y=0; y<game.sizeY; y++) {
		for(x=0; x<game.sizeX; x++) {
            
            var el = document.getElementsByClassName('row' + y + ' col' + x)[0];
            var tileType = game.tileTypeArray[y*game.sizeX + x];
            if(tileType !== "CC") {
                var tile = document.createElement('div');
                tile.className = 'tile ' + tileType;
                tile = tileStyle( tile, game.sizeY );
                
                tile.addEventListener("click", function(event) {
                    clickfn(event);
                    var test = isSolved(game);
                    if(test) {
                        //stop timer here.
                        setTimeout(function() {
                            //alert("Game solved!");
                            endGame(game);
                        }, 10);
                    }
                });
                
                el.appendChild(tile);
            } else {
                el.className += " current";
            }
		}
	}
}


/* TABLESTYLE()
Called on resize event.

Author: Nils Hansander
Last modified: May 21, 2017
*/
function tableStyle() {
    var tiles = document.getElementsByClassName("tile");
    for(var i=0; i<tiles.length; i++) {
        tiles[i] = tileStyle(tiles[i]);
    }
}


/*TILESTYLE(ELEMENT "TILE", INT "SIZE")
Sets size and appropriate background image depending on
window size and "tiletype".
Returns reference to "tile" div element.

Author: Nils Hansander
Last modified: May 21, 2017
*/
function tileStyle(tile, size) {
    var tileType = tile.classList.item(1);
    var imSize = getImgSize(size);
    var str = "tiles/tile" + tileType + "_" + imSize + ".png";
    tile.style.backgroundImage = "url('" + str + "')";
    tile.style.width = imSize + "px";
    tile.style.height = imSize + "px";
    return tile;
}


/*GETIMGSIZE(INT "SIZE")
Selects and returns image size that will make the game fit in the window.

Author: Nils Hansander
Last modified: May 21, 2017
*/
function getImgSize(size) {
    if(!size) {
        var size = document.getElementById("gameTable").rows.length;
        if(size == 0) alert("*!* table column length = 0 *!*");
    }
        
    if(document.fullscreenElement) {
        var h = window.screen.height;
    } else {
        var h = window.innerHeight;
    }
    var maxSize = h / size;
    var sizes = [100, 150, 200, 250];
    var imSize = 100;
    for(var i=0; i<sizes.length; i++) {
        if( sizes[i] > maxSize ) {
            break;
        }
        imSize = sizes[i];
    }
    return imSize;
}


/* MOVETILES(DOMTOKENLIST "CL", BOOL "ISROW", INT ARRAY "POS")
Moves "tile" <div> elements between indices in "pos"
along row or column of table. Returns reference to
empty table cell.

Author: Nils Hansander
Last modified: May 19, 2017
*/
function moveTiles(cl, isRow, pos) {
    var isTarg2left = pos[1] < pos[0];
    if(isRow) {
        if(isTarg2left) {
            for(var j=pos[0]; j>pos[1]; j--) {
                el = document.getElementsByClassName(cl[1] + " col" + (j-1) )[0];
                targ = document.getElementsByClassName(cl[1] + " col" + j)[0];
                targ.appendChild(el.firstChild);
            }
        } else {
            for(var j=pos[0]; j<pos[1]; j++) {
                el = document.getElementsByClassName(cl[1] + " col" + (j+1) )[0];
                targ = document.getElementsByClassName(cl[1] + " col" + j)[0];
                targ.appendChild(el.firstChild);
            }
        }
    } else {
        if(isTarg2left) {
            for(var j=pos[0]; j>pos[1]; j--) {
                el = document.getElementsByClassName(cl[0] + " row" + (j-1) )[0];
                targ = document.getElementsByClassName(cl[0] + " row" + j)[0];
                targ.appendChild(el.firstChild);
            }
        } else {
            for(var j=pos[0]; j<pos[1]; j++) {
                el = document.getElementsByClassName(cl[0] + " row" + (j+1) )[0];
                targ = document.getElementsByClassName(cl[0] + " row" + j)[0];
                targ.appendChild(el.firstChild);
            }
        }
    }
    return el;
}


/* CLICKFN(EVENT)
Triggered when user clicks on "tile".

Author: Nils Hansander
Last modified: May 20, 2017
*/
function clickfn(event) {
    var isRow;
    var pos = [];
    var curr = document.getElementsByClassName("current")[0];
    curr.classList.remove("current");
    var targ = event.currentTarget.parentElement;
    var cl = curr.classList;
    var tl = targ.classList;
    
    if( cl[0] == tl[0] ) {
        isRow = false;
        pos[0] = parseInt( cl[1].charAt(3) );
        pos[1] = parseInt( tl[1].charAt(3) );
    } else if( cl[1] == tl[1] ) {
        isRow = true;
        pos[0] = parseInt( cl[0].charAt(3) );
        pos[1] = parseInt( tl[0].charAt(3) );
    } else {
        curr.classList.add("current");
        return;
    }
    curr = moveTiles(cl, isRow, pos);
    curr.classList.add("current");
}


/* SCRAMBLE(GAME OBJECT "GAME", INT "REPEATS")
Makes "repeats" (int) # of alternating vertical and horizontal moves
of random length.

**Check isSolved for scrambled game! 

Author: Nils Hansander
Last modified: May 20, 2017
*/
function scramble(game, repeats) {
    var pos = [];
    var len, cl;
    var isRow = Math.random() < 0.5;
    var curr = document.getElementsByClassName('current')[0];
    curr.classList.remove("current");
    
    for(i=0; i<repeats; i++) {
        cl = curr.classList;
        pos[0] = parseInt(cl.item(isRow ? 0:1).charAt(3));
        len = isRow ? game.sizeX:game.sizeY;
        pos[1] = ( pos[0] + 1 + Math.floor( Math.random()*(len-1) ) )%len;
        
        curr = moveTiles(cl, isRow, pos);
        isRow = !isRow;
    }
    curr.classList.add("current");
}


/* ISSOLVED(GAME OBJECT "GAME")
Returns "true" if the puzzle is solved. Also stores path of
connected rail pieces in game.connectedTiles (Array).

Author: Nils Hansander
Last modified: May 19, 2017
*/
function isSolved(game) {
	var checkDir = {
		E: 'W', W: 'E', N: 'S', S: 'N'
	}
	//temporary div created to fill "current" empty cell.
    var temp = document.createElement('div');
	temp.className = 'tile CC';
	document.getElementsByClassName('current')[0].appendChild(temp);
    //retrieves all "tile" divs in a nodelist
	var tiles = document.getElementsByClassName('tile');
    
	var x = 0;
	var y = game.entryRow;
	var lastDir = 'E';
    game.connectedTiles = [];
    var trackDir;
    
	do {
		if(x<0 || x>game.sizeX-1 || y<0 || y>game.sizeY-1) {
            var cc = document.getElementsByClassName('CC')[0];
            cc.parentElement.removeChild(cc);
			return false;
		} else {
            trackDir = tiles[y*game.sizeX + x].classList.item(1);
            
			if(trackDir.charAt(0) == checkDir[lastDir]) {
				lastDir = trackDir.charAt(1);
                //Push to array of rail connections
                game.connectedTiles.push(trackDir);
			} else if(trackDir.charAt(1) == checkDir[lastDir]){
				lastDir = trackDir.charAt(0);
                game.connectedTiles.push(trackDir.charAt(1) + lastDir);
			} else {
                var cc = document.getElementsByClassName('CC')[0];
                cc.parentElement.removeChild(cc);
				return false;
			}
		}
		if(lastDir == 'E') {
			x++;
		} else if(lastDir == 'W') {
			x--;
		} else if(lastDir == 'N') {
			y--;
		} else {
			y++;
		}
	} while( !(x == game.sizeX && y == game.exitRow) );
	var cc = document.getElementsByClassName('CC')[0];
    cc.parentElement.removeChild(cc);
	return true;
}


/* GAME(INT "SIZEX", INT "SIZEY", INT "ENTRYROW", INT "EXITROW", STRING ARRAY "TILETYPEARRAY")
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


/*GETGAME(STRING "DIFFICULTY", INT "LEVELINDEX")
Takes input "difficulty" (String) and "levelIndex" (int)
and returns a Game object. "difficulty" can have the values
"easy", "medium", or "hard".

Author: Nils Hansander
Last modified: April 23, 2017
*/
function getGame(difficulty, levelIndex) {
    var tutorial = new Game(2, 2, 1, 0, [
        "WE", "SE",
        "CC", "NW"
    ]);
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
        tutorial: [tutorial],
        easy: [easy1, easy2],
        medium: [medium1, medium2],
        hard: [hard1, hard2]
    }
    return games[difficulty][levelIndex];
}