var baseColours = [
  new colour(0, 191, 255),
  new colour(7, 219, 56),
  new colour(207, 124, 214),
  new colour(255, 110, 211),
  new colour(252, 86, 86),
  new colour(252, 219, 86),
  new colour(252, 164, 86),
  new colour(50, 50, 50)
];

var currentColour;

$(function() {
  currentColour = baseColours[parseInt(Math.random() * baseColours.length)];
  setColours();
  displayColours();
});

function colour(r, g, b) {
  if (r <= 255 && g <= 255 && b <= 255)
  {
    this.red          = r;
    this.green        = g;
    this.blue         = b;
    var rString = ((r<16) ? '0' : '') + this.red.toString(16);
    var gString = ((g<16) ? '0' : '') + this.green.toString(16);
    var bString = ((b<16) ? '0' : '') + this.blue.toString(16);
    this.hex          = rString + gString + bString;
    this.accentValue  = parseInt(Math.abs(255 - (((r + g + b)/3) + Math.max(r, Math.max(g, b))/2)));
    this.rgbString    = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
  }
}

function hexColour(hex) {
  var matches = [];
  if (hex.length == 6)
    matches = hex.match(/[a-fA-F0-9]{1,2}/g);
  else if (hex.length == 3)
    matches = hex.match(/[a-fA-F0-9]{1}/g);
  else return;
  this.red = parseInt(matches[0], 16);
  this.green = parseInt(matches[1], 16);
  this.blue = parseInt(matches[2], 16);
  this.hex = hex;
  this.rgbString    = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
  if (this.red <= 255 && this.green <= 255 && this.blue <= 255)
    this.accentValue = parseInt(Math.abs(255 - (((this.red + this.green + this.blue)/3)
      + Math.max(this.red, Math.max(this.green, this.blue))/2)));
}

function displayColours() {
  $('input#rgb').attr('value', currentColour.rgbString);
  $('input#hex').attr('value', '#' + currentColour.hex);
}

function setColours() {

  var colourString = 'rgb(' + currentColour.red + ','
                                + currentColour.green + ','
                                + currentColour.blue + ')';

  var accentColourString = 'rgb(' + currentColour.accentValue + ','
                                + currentColour.accentValue + ','
                                + currentColour.accentValue + ')';


  $('body').css({'background-color': colourString});

  $('.text').css({"color": accentColourString});
  $('input.text').css({"border-color": accentColourString});
}

$('input#hex').on('keyup', function() {
  if (this.value === '')
    this.value = '#'
  else if ((this.value.length == 4 || this.value.length == 7) && this.value.substring(1).match(/([A-Fa-f0-9])/)) {
    currentColour = new hexColour(this.value.substring(1));
    setColours();
    displayColours();
  }
});

$('input#hex').on('focus', function() {
    if (this.value === "")
      this.value = '#';
});

$('input#hex').on('blur', function() {
  this.value = '#' + currentColour.hex
  displayColours();
});

$('input#rgb').on('keyup', function() {
  if (this.value === '')
    this.value = 'rgb()';
  else if (this.value.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)/)) {
    var colours = this.value.substring(4, this.value.length-1).split(',');
    currentColour = new colour(parseInt(colours[0]), parseInt(colours[1]), parseInt(colours[2]));
    var test = [parseInt(colours[0]), parseInt(colours[1]), parseInt(colours[2])];
    setColours();
    displayColours();
  }
});

$('input#rgb').on('focus', function() {
    if (this.value === "")
      this.value = 'rgb()';
});

$('input#rgb').on('blur', function() {
  this.value = currentColour.rgbString;
  displayColours();
});
