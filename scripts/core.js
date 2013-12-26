var isDebug = false; // Set In Debug Mode to See Nerdy Details on Events
var maxPositiveDegWidth = 12; // Max Number Of Degrees in The Positive Direction (Y)
var maxPositiveDegHeight = 9; // Max Number Of Degrees in The Positive Direction (X)

var dd = document.getElementById('data-analysis'); // Adds Data Analysis Object To 
var cards = document.getElementsByClassName('card'); // Select All Elements with class "card"

// Set Events On All Elements In "cards"
for (var i = 0; i < cards.length; i++) {
  var currentCard = cards[i]; // Gets CurrentCard
  
  currentCard.onmousemove = function (evt) {
    var target = evt.target || evt.srcElement; // Gets Element Based On Event
    
    target.style.webkitTransition = ""; // Reset Animation so event is fluid
    calculateWidth(evt, target); // Sends To Horizontal Tilt Calculator
    calculateHeight(evt, target); // Sends To Vertical Tilt Calculator
    
    if (isDebug) {
      dd.innerHTML = target.style.webkitTransform; // If in Debug Mode Page Will Display Rotation Degrees
    }
  }
  
  currentCard.onmouseout = function (evt) {
    var target = evt.target || evt.srcElement; // Gets Element Based On Event
    target.style.webkitTransition = "-webkit-transform 1s"; // Set Animation on Reset
    target.style.webkitTransform = "rotateY(0deg)"; // Reset Level Of Tilt
  }
}


function calculateWidth(evt, obj) {
  var maxDeg = maxPositiveDegWidth * 2; // Mutliples Postive Degrees by 2 to get Full Range
  var percent = (evt.layerX / obj.offsetWidth); // Gets the position of mouse in percent relative to current card
  var degreeOfTilt = ((maxDeg * percent) - maxPositiveDegWidth); // Calculates Degree of Tilt based on Percentage and Max Degree. Then minus the default max degrees to shift y-axis to the middle of the card
  obj.style.webkitTransform = "rotateY(" + degreeOfTilt + "deg)"; // Sets Degree of Tilt on y-axis
}

function calculateHeight(evt, obj) {
  var maxDeg = maxPositiveDegHeight * 2; // Mutliples Postive Degrees by 2 to get Full Range
  var percent = (evt.layerY / obj.offsetHeight); // Gets the position of mouse in percent relative to current card
  var degreeOfTilt = (((maxDeg * percent) - maxPositiveDegWidth) * -1); // Calculates Degree of Tilt based on Percentage and Max Degree. Then minus the default max degrees to shift x-axis to the middle of the card
  obj.style.webkitTransform += " rotateX(" + degreeOfTilt + "deg)"; // Sets Degree of Tilt on x-axis
}