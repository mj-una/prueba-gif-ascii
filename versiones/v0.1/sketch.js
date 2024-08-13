// prueba gif ascii
//
// basado en tutorial de patt vira
// https://editor.p5js.org/pattvira/sketches/bP1VKw84T
//
//////////////////////////////////////////////////////


let lupi;
let size = 9;
let asciiChar = " .i#▓█";


function setup() {

  createCanvas(500, 600);
  windowResized();

  lupi = loadImage("lupiDef.gif");
}


function draw() {

  image(lupi, 0, 0);
  lupi.loadPixels();
  
  background(0);
  translate(2,4);
  
  for (let i = 0; i < lupi.width; i++) {
    for (let j = 0; j < lupi.height; j++) {

      let pixelIndex = (i + j*lupi.width) * 4;
      let r = lupi.pixels[pixelIndex + 0];
      let g = lupi.pixels[pixelIndex + 1];
      let b = lupi.pixels[pixelIndex + 2];
      
      let bright = (r + g + b) / 3;
      let tIndex = floor(map(bright, 0, 255, 0, asciiChar.length));
      
      let x = i*size + size/2;
      let y = j*size;
      let t = asciiChar.charAt(tIndex);

      fill(255);
      textSize(size);
      textAlign(CENTER, CENTER);
      text(t, x, y);
    }
  }
}


function windowResized() {

  let pag = document.getElementsByTagName("body")[0];
  let cnv = document.getElementById("defaultCanvas0")

  let mrg = 2;

  pag.style.overflow = "hidden";
  pag.style.display = "flex";
  pag.style.justifyContent = "center";
  pag.style.alignItems = "center";
  pag.style.height = "100svh";
 
  if (windowWidth * height > windowHeight * width) {
    cnv.style.height = 100 - 2 * mrg + "svh";
    cnv.style.width = ((100 - 2 * mrg) / height) * width + "svh";
  }
  else {
    cnv.style.width = 100 - 2 * mrg + "vw";
    cnv.style.height = ((100 - 2 * mrg) / width) * height + "vw";
  }
}