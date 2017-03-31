function docLoaded(fn) {
    if (document.readyState !== 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function fifteenPageLoaded() {
    scramble(25);
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

/* Appends dragged tile to target, ie empty table cell */
function drop(event) {
    event.preventDefault();
    if (event.target.classList.contains("current")) {
        var el1 = document.getElementById(event.dataTransfer.getData("text"));
        event.target.appendChild(el1.getElementsByClassName('noselect')[0]);
        changeAttr(el1, event.target);
        checkAnswer();
    }
}

/* Relocates drop target when tiles have been moved */
function changeAttr(el1, el2) {
    makeUnDraggable();
    
    el1.classList.add('current');
    el1.setAttribute('ondrop', 'drop(event)');
    el1.setAttribute('ondragover', 'allowDrop(event)');
    
    el2.classList.remove('current');
    el2.removeAttribute('ondrop');
    el2.removeAttribute('ondragover');

    makeDraggable(el1);
}

/* Makes all tiles undraggable. Used in changeAttr */
function makeUnDraggable() {
    for(var j=1; j<5; j++) {
        for(var k=1; k<5; k++) {
            var elid = "bit" + j + k;
            var el = document.getElementById(elid);
            el.setAttribute('draggable', 'false');
        }
    }
}

/*
Makes tiles adjacent to drop target draggable. Used in changeAttr

**Area of improvement: Make entire row movable (unless we implement
fixed tiles for some game levels?)**

*/
function makeDraggable(el) {
    var colname = el.classList.item(0);
    var rowname = el.classList.item(1);
    var colnr = parseInt(colname.charAt(3));
    var rownr = parseInt(rowname.charAt(3));
    var col = document.getElementsByClassName(colname);
    var row = document.getElementsByClassName(rowname); 
    
    if ((rownr-1) >= 1) {
        var x = rownr-1;
        var elid = "bit" + colnr + x;
        var el = document.getElementById(elid);
        el.setAttribute('draggable', 'true');
    }
    if ((rownr+1) <= 4) {
        var x = rownr+1;
        var elid = "bit" + colnr + x;
        var el = document.getElementById(elid);
        el.setAttribute('draggable', 'true');
    }
    if ((colnr-1) >= 1) {
        var x = colnr-1;
        var elid = "bit" + x + rownr;
        var el = document.getElementById(elid);
        el.setAttribute('draggable', 'true');
    }
    if ((colnr+1) <= 4) {
        var x = colnr+1;
        var elid = "bit" + x + rownr;
        var el = document.getElementById(elid);
        el.setAttribute('draggable', 'true');
    }
}

/* Moves (draggable) tiles randomly, for x iterations */
function scramble(x) {
    for(i=0; i<x; i++) {
        var el = document.getElementsByClassName("current")[0];
        var col = parseInt(el.id.charAt(3));
        var row = parseInt(el.id.charAt(4));
        
        var elid = "bit";
        if(Math.round(Math.random()) == 1) {
            if(col < 2) {
                elid += "2" + row;
            } else if(col < 4) {
                var d = col;
                if(Math.round(Math.random()) == 1) {
                    d -= 1;
                } else {
                    d += 1;
                }
                elid += d.toString() + row;
            } else {
                elid += "3" + row;
            }
        } else {
            if(row < 2) {
                elid += col + "2";
            } else if(row < 4) {
                var d = row;
                if(Math.round(Math.random()) == 1) {
                    d -= 1;
                } else {
                    d += 1;
                }
                elid += col + d.toString();
            } else {
                elid += col + "3";
            }
        }
        
        var el2 = document.getElementById(elid);
        el.appendChild(el2.getElementsByClassName('noselect')[0]);
        changeAttr(el2, el);
    }
}

/*
Checks if each tile is in the correct position.

**Needs to be changed to accommodate for multiple possible solutions.
Assign 2 char strings to tile objects, check character matching?
Eg, NW-NS-NE-WE-... **

*/
function checkAnswer() {
    var els = document.getElementsByClassName("noselect");
    var cnt = 0;
    for(j=1; j<16; j++) {
        var elid = els[j-1].parentElement.id;
        var col = parseInt(elid.charAt(3));
        var row = parseInt(elid.charAt(4));
        var elnr = parseInt(4*(row-1)+col);
        var elin = parseInt(els[j-1].innerHTML);
        
        if (elin !== elnr) {
            break;
        } else {
            cnt = j;
        }
    }
    if (cnt == 15) {
        document.getElementById("gm").setAttribute("class", "solved");
    } else {
        var x = document.getElementsByClassName("solved")[0];
        if (x) {
            x.removeAttribute("class");
        }
    }
}