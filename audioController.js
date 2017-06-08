/**
 * background music play automatically when webpage loads
 */
var audio = new Audio();
audio.addEventListener("load", function() {
    audio.play();
}, true);
audio.src = "welcome.mp3";
audio.autoplay = true;
audio.volume = 0.5;

/**
 * all music elements stop when click on stop button. 
 */
function stopmusic(){
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++)
        sounds[i].pause();
    audio.pause();
   // var stpimg = document.getElementById("stopaudio").getElementsByTagName("input").
     //   style.backgroundImage = "url(musicpause.png)"
}

/**
 * all music elemenets start to play
 */
function startmusic(){
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++)
        sounds[i].play();
    audio.play();
}

/**
 * volume inreases when click add-volume button
 */
function volumeAdd(){
    var volume = document.getElementsByTagName("audio")
        for (i =0; i<volume.length;i++){
            volume[i].volume = volume[i].volume + 0.1;
        }
}

/**
 * volume decreases when click decrease-volume button
 */
function volumedecrease(){
    var volume = document.getElementsByTagName("audio")
    for (i =0; i<volume.length;i++){
        volume[i].volume = volume[i].volume - 0.1;
    }
}
