/**
 * Created by lei on 21/05/17.
 */
var audio = new Audio();
audio.addEventListener("load", function() {
    audio.play();
}, true);
audio.src = "welcome.mp3";
audio.autoplay = true;
audio.volume = 0.5;

function stopmusic(){
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++)
        sounds[i].pause();
    audio.pause();
   // var stpimg = document.getElementById("stopaudio").getElementsByTagName("input").
     //   style.backgroundImage = "url(musicpause.png)"
}

function startmusic(){
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++)
        sounds[i].play();
    audio.play();
}

function volumeAdd(){
    var volume = document.getElementsByTagName("audio")
        for (i =0; i<volume.length;i++){
            volume[i].volume = volume[i].volume + 0.1;
        }
}

function volumedecrease(){
    var volume = document.getElementsByTagName("audio")
    for (i =0; i<volume.length;i++){
        volume[i].volume = volume[i].volume - 0.1;
    }
}