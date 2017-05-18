/**
 * Created by lei on 07/05/17.
 */

var mySound;

function startGame() {
    mySound = new sound("music/play.mp3");
    mySound.play();
    myGameArea.start();
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
}

function stopGame() {
    mySound = new sound("music/play.mp3");
    mysound.pause();

}
/*var audio = document.getElementById("bgMusic");


audio.play();

audio.pause();

audio.pause();
audio.currentTime = 0;

audio.currentTime = 0;
audio.play();*/

