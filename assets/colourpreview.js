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
});

function colour(r, g, b) {
  if (r <= 255 && g <= 255 && b <= 255)
  {
    this.red          = r;
    this.green        = g;
    this.blue         = b;
    this.hex          = "" + r.toString(16) + g.toString(16) + b.toString(16);
    this.accentValue  = 255 - (((r + g + b)/3) + Math.max(r, Math.max(g, b))/2);
  }
}

function hexColour(hex) {
  var matches = hex.match(/.{1,2}/g);
  this.red = parseInt(matches[0], 16);
  this.green = parseInt(matches[1], 16);
  this.blue = parseInt(matches[2], 16);
  if (this.red <= 255 && this.green <= 255 && this.blue <= 255)
    this.accentValue  = 255 - (((this.red + this.green + this.blue)/3)
      + Math.max(this.red, Math.max(this.green, this.blue))/2);
}

function setColours() {
  $('body').css({'background-color': 'rgb(' + currentColour.red + ','
                                            + currentColour.green + ','
                                            + currentColour.blue + ')'});

  $('.text').css({"color": 'rgb(' + currentColour.accentValue + ','
                                + currentColour.accentValue + ','
                                + currentColour.accentValue + ')'});
}
