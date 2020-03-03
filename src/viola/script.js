$(function () {
  $("map#viola area").mouseover(function () {
    var img = "images/viola shades/" + $(this).prop("alt") + ".png";
    $("img#viola_img").prop("src", img);
  });
  $("map#viola area").mouseout(function () {
    var img = "images/viola shades/viola.png";
    $("img#viola_img").prop("src", img);
  });
  $(".navlink").on("click", function () {
    clearNav();
    $(this).addClass("current");
  });
});

function clearNav() {
  $(".navlink.current").removeClass("current");
}

function newJoke(elemId) {
  var elem = $("#" + elemId);
  elem.children("span#joke_content").html(getRandomJoke());
}

var jokes = [
  "<b>How is lightning like a violist's fingers?</b> Neither one strikes in the same place twice.",
  "<b>How do you keep your violin from getting stolen?</b> Put it in a viola case.",
  "<b>What's the difference between a violin and a viola?</b><br />1.	The viola burns longer.<br />2.	The viola holds more beer.<br />3.	You can tune the violin.",
  "We all know that a viola is better than a violin because it burns longer. <b>But why does it burn longer?</b> It's usually still in the case.",
  "<b>How do you get a viola section to play spiccato?</b> Write a whole note with \"solo\" above it.",
  "<b>How do you get a violist to play a passage pianissimo tremolando?</b> Mark it \"solo.\"",
  "<b>What's the difference between a viola and a coffin?</b> The coffin has the dead person on the inside.",
  "<b>What do you do with a dead violist?</b> Move him back a desk.",
  "<b>What's the difference between a viola and a trampoline?</b> You take your shoes off to jump on a trampoline.",
  "<b>What's the difference between a viola and an onion?</b> No one cries when you cut up a viola.",
  "<b>What's the definition of a minor second?</b> Two violists playing in unison.",
  "<b>What's the definiton of \"perfect pitch?\"</b> Throwing a viola into a dumpster without hitting the rim.",
  "<b>Why do violists stand for long periods outside people's houses?</b> They can't find the key and they don't know when to come in.",
  "<b>What's the difference between a seamstress and a violist?</b> The seamstress tucks up the frills.",
  "<b>What's the difference between a washing machine and a violist?</b> Vibrato.",
  "<b>Why do so many people take an instant dislike to the viola?</b> It saves time.",
  "<b>How can you tell when a violist is playing out of tune?</b> The bow is moving."
];

function getRandomJoke() {
  var rand = Math.floor(Math.random() * jokes.length);
  return jokes[rand];
}

function la() {
  $("div.work > span.audio").each(function (i, e) {
  var code = "<audio controls style='margin-top: .8em;'><source src='audio/" + $(e).html() + ".mp3' type='audio/mpeg'></audio>";
    $(e).after(code);
    $(e).remove();
  })
}

var lastKeys = [];
var i = 0;
var konamiCount = 0;
$(document).on("keyup", function (event) {
  lastKeys[i++] = event.keyCode;
  if (isKonami(lastKeys)) {
    addViola();
    konamiCount++;
    if (konamiCount >= 5) {
      setInterval(addViola, 500);
    }
  }
});

function isKonami(arr) {
  if (arr.length < 10) return false;
  if (
    arr[arr.length - 1] == 65 &&
    arr[arr.length - 2] == 66 &&
    arr[arr.length - 3] == 39 &&
    arr[arr.length - 4] == 37 &&
    arr[arr.length - 5] == 39 &&
    arr[arr.length - 6] == 37 &&
    arr[arr.length - 7] == 40 &&
    arr[arr.length - 8] == 40 &&
    arr[arr.length - 9] == 38 &&
    arr[arr.length - 10] == 38
  ) return true;
}

function addViola() {
  
  var path = "images/konami violas/viola" + (Math.floor(Math.random() * 7)) + ".png";
  var height = $(window).height();
  var width = $(window).width();
  var w = Math.floor(Math.random() * 200) + 300;
  var l = Math.floor(Math.random() * width) - w;
  var t = Math.floor(Math.random() * height) - w;
  var r = Math.floor(Math.random() * 360);
  var code = "<img src='" + path + "' alt='VIOLAS!!!!' style='position: absolute; top: " + t + "px; left: " + l + "px; width: " + w + "px; transform: rotate(" + r + "deg);' />";
  $("body").append(code);
}

var partInfoWiki = {
  "BOW" : "https://en.wikipedia.org/wiki/Bow_(music)",
  "TUNING PEGS" : "https://en.wikipedia.org/wiki/Tuning_peg",
  "CHINREST" : "https://en.wikipedia.org/wiki/Chinrest",
  "FINGERBOARD" : "https://en.wikipedia.org/wiki/Fingerboard",
  "BRIDGE" : "https://en.wikipedia.org/wiki/Bridge_(instrument)",
  "TAILPIECE" : "https://en.wikipedia.org/wiki/Tailpiece",
  "F-HOLES" : "https://en.wikipedia.org/wiki/Sound_hole",
  "SCROLL" : "https://en.wikipedia.org/wiki/Scroll_(music)"
};


var exit_button = "<img id='exit' src='images/exit.png' alt='X' style='position: absolute; top: -20px; right: -20px; width: 40px; height: 40px; cursor: pointer;' onclick='closeInfo();' />";

function partInfo(part) {
  $("div#partPopup").html(exit_button + 
    "<iframe src='" + partInfoWiki[part] + "' width='100%' height='100%' style='border: 0; outline: none;'></iframe>"
  );
  
  $("div#partPopup").fadeIn();
}

function closeInfo() {
  $("div#partPopup").fadeOut();
}