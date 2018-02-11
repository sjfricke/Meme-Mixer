"use strict";

$(document).ready(function() {
    // wait for DOM to load
    setWebSocket();
    setup();
});

// Either in Selection state or play state
// selection state == 0 (default)
// play state == 1
var g_state = 0;

var SongList = [
  "Song 1",
  "Song 2",
  "Song 3",
  "Song 4",
  "Song 5",
  "Song 6",
  "Song 7",
  "Song 8"
  ]

var GifList = [
  "https://media.giphy.com/media/26gsnlYjswkyY3ENq/giphy.gif",
  "https://media.giphy.com/media/3o7WIPkmUZI6ShpK12/giphy.gif",
  "https://media.giphy.com/media/xULW8svBJsDZP9SCBO/giphy.gif",
  "https://media.giphy.com/media/3ohs4kGmCp6KZgWRl6/giphy.gif",
  "https://media.giphy.com/media/3oFzlZMqJnMNqWeczC/giphy.gif"
]

var songStoped = false;

var clientID = 0;
var currentSong = 0;

var piemenu;

function setWebSocket() {
  // Attempts to just reload webpage if it was not able to get websocket
  // Will cause loop if not connect, but app is useless anyways without WS
  try {
   webSocket = new WebSocket('ws://' + location.host);
   webSocket.onmessage = wsOnMessage;
  } catch (e) {
   location.reload();
  }
}

function nextsong(){

  currentSong++;

  if (currentSong >= SongList.length) {
    currentSong = 0;
  }

  piemenu.navigateWheel(currentSong);
  progress(currentSong*10);
  //skiptosong(currentSong);

  // broadcast(1, currentSong);
}

function prevsong(){

  currentSong--;
  if (currentSong < 0) {
    currentSong = SongList.length - 1;
  }

  console.log(currentSong);
  //skiptosong(currentSong);

  piemenu.navigateWheel(currentSong);
  progress(currentSong*10);

  // broadcast(1, currentSong);
}

function progress(timeleft) {
  var Timer;
  Timer = new radialTimer();
  Timer.init("timer", timeleft);

};

function setup() {

    document.getElementById("selectionMode").style.display = "block";
    document.getElementById("playerMode").style.display = "none";

    piemenu = new wheelnav('piemenu');
    piemenu.clockwise = false;
    piemenu.sliceInitPathFunction = piemenu.slicePathFunction;
    piemenu.initPercent = 0.1;
    piemenu.wheelRadius = piemenu.wheelRadius * 0.83;
    piemenu.navItemsContinuous = true;
    // piemenu.sliceAngle = 22.5; for partial
    piemenu.createWheel(SongList);
    piemenu.setTooltips(['0','1','2','3','4','5','6','7']);
    
}

function skiptosong(num){
  currentSong=parseInt(num);
  progress(currentSong*10);
}

function changegif(direction){
  var gif=document.getElementById("gif");
  gif.src=GifList[currentSong];
}

function stupid(){
}

function addaudio(){

}

function stopallaudio(){

}