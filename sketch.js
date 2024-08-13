//////////////////////////////////////////////////////
//
// LUPILOOP v0.3
//
// prueba gif ascii
//
// basado en tutorial de patt vira
// https://editor.p5js.org/pattvira/sketches/bP1VKw84T
//
// usando libreria p5.gif.js para trabajar gifs como si fueran videos 
// https://github.com/antiboredom/p5.gif.js
//
//////////////////////////////////////////////////////

// gif
let lupi;

// fonts
let dejavu;
let dejavuBold;

// chars
let size = 9;
let asciiChars = `    ''""ia#▓▓███`;
let asciiBlank = `▒░ `;
let asciiAtenx = `█▓▒`;

// flags
let flCargando = true;
let flPausar = true;
let flRuido = false;


//_____________________________________________
function preload() {

  dejavu = loadFont("./fonts/DejaVuSansMono.ttf");
  dejavuBold = loadFont("./fonts/DejaVuSansMono-Bold.ttf");

  lupi = loadGif("lupiDef.gif");
  lupi.pause();
}


//_____________________________________________
function setup() {

  createCanvas(500, 886); // 9/16 aprox
  windowResized(); // responsive

  frameRate(18);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
}


//_____________________________________________
function draw() {

  // loading
  if (!lupi.loaded() || frameCount < 30) {

    textFont(dejavuBold, 8);
    text(txCargando, 250, 300);
    
    textFont(dejavuBold, 6);
    text(txLupiloop, 250, 490);

    textFont(dejavuBold, 12);
    text(txVersion, 250, 580);

    textFont(dejavuBold, 3);
    text(txAnio, 250, 610);

    return; // salida temprana del draw
  }

  // cuando termina loading
  if (flCargando) {
    lupi.frame(1);
    lupi.play();
    flCargando = false; // para q no se repita nunca mas
  }
  
  // referencia
  image(lupi, 0, 0); // queda oculto por background()
  lupi.loadPixels(); // almacena valores en array "pixels"
  
  let gifFrame = lupi.frame(); // frame actual del gif
  // loadGif(), .frame(), .loaded(), .pause(), .play()
  // vienen de la libreria p5.gif.js

  // lienzo general
  background(0);
  translate(2,4); // por toc
  textFont(dejavu, size);

  // si llega a final del gif, activar ruido
  if (gifFrame >= lupi.totalFrames() - 1) flRuido = true;
  
  // PANTALLA RUIDO
  if (flRuido) { 
    
    // si recien esta entrando a "if (ruido)"
    if (flPausar) {
      
      flPausar = false; // para no repetir bloque durante cuenta regresiva
      
      lupi.frame(1); // vuelve a frame inicial
      lupi.pause(); // pausar gif

      // cuenta regresiva
      setTimeout(() => { 

        // despues de dos segundos:
        flPausar = true; // reactivar flag pausa
        flRuido = false; // desactivar flag ruido
        
        lupi.play(); // quitar pausa al gif.

      }, 2000); // tiempo en milisegundos
    }

    // ruido
    for (let i = 0; i < lupi.width; i++) {
      for (let j = 0; j < lupi.height; j++) {

        let x = i * size;
        let y = j * size;
        let t = asciiBlank[floor(random(3))];

        text(t, x, y);
      }
    }

    // ""DESLIZA""
    push();
    resetMatrix();
  
    fill(0);
    rect(16, 575, 458, 62); // rect
  
    fill(255);
    textFont(dejavu, 5.6);
    text(txDesliza, 246, 596); // tx
    noLoop();
    pop();
  }

  // PANTALLA ASCII
  else {
    for (let i = 0; i < lupi.width; i++) {
      for (let j = 0; j < lupi.height; j++) {

        let pixelIndex = (i + j*lupi.width) * 4;
        let r = lupi.pixels[pixelIndex + 0];
        let g = lupi.pixels[pixelIndex + 1];
        let b = lupi.pixels[pixelIndex + 2];
        
        let bright = (r + g + b) / 3;
        let tIndex = floor(map(bright, 0, 255, 0, asciiChars.length));
        
        let x = i * size;
        let y = j * size;
        let t = asciiChars[tIndex];

        text(t, x, y);
      }
    }
  }

  // textos:

  // ""ATENCION""
  if (gifFrame > 1 && gifFrame < 40) {
    push();
    translate(250, 100)
    rotate(-0.2);
    scale(0.2 + gifFrame * 0.03);

    let t1 = map(gifFrame, 0, 40, 255, 0);
    let t2 = map(gifFrame, 0, 40, 200, 0);

    fill(255, t1 + t2);
    textFont(dejavuBold, 12);
    text(txAtencion(), -20, 10); // tx
    pop();
  }

  // ""PORFAVOR"" pt1
  if (gifFrame > 1 && gifFrame <= 5) {
    push();
    translate(400, 170);
    rotate(0.05);

    fill(255);
    stroke(255);
    strokeWeight(0.42);
    textFont(dejavuBold, 2);
    text(txPorfavor, 0, 0); // tx
    pop();
  }

  // ""PORFAVOR"" pt2
  if (gifFrame > 7 && gifFrame <= 9) {
    push();
    translate(400, 210);
    rotate(0.11);

    fill(255);
    stroke(255);
    strokeWeight(0.4);
    textFont(dejavuBold, 2.1);
    text(txPorfavor, 0, 0); // tx
    pop();
  }

  // ""PORFAVOR"" pt3
  if (gifFrame > 10 && gifFrame < 13) {
    push();
    translate(400, 250);
    rotate(0.22);

    fill(255);
    stroke(255);
    strokeWeight(0.38);
    textFont(dejavuBold, 2.3);
    text(txPorfavor, 0, 0); // tx
    pop();
  }

  // ""PORFAVOR"" pt4
  if (gifFrame > 16 && gifFrame < 19) {
    push();
    translate(400, 290);
    rotate(0.33);

    fill(255);
    stroke(255);
    strokeWeight(0.36);
    textFont(dejavuBold, 2.6);
    text(txPorfavor, 0, 0); // tx
    pop();
  }

  // ""PORFAVOR"" pt5
  if (gifFrame > 22 && gifFrame < 24) {
    push();
    translate(400, 330);
    rotate(0.44);

    fill(255);
    stroke(255);
    strokeWeight(0.34);
    textFont(dejavuBold, 3);
    text(txPorfavor, 0, 0); // tx
    pop();
  }

  // ""HOLA""
  if (gifFrame > 29 && gifFrame < 44) {
    push();
    translate(230, 510);
    rotate(-0.1);

    let t = map(gifFrame, 30, 40, 0, 255);

    fill(255, t);
    textFont(dejavuBold, 5);
    text(txHola, 0, 0); // tx
    pop();
  } 

  // ""HAY""
  if (gifFrame > 42 && gifFrame < 47) {
    push();
    translate(200, 460);
    rotate(-0.05);

    fill(255);
    textFont(dejavuBold, 3);
    text(txHayalguien1, 0, 0); // tx
    pop();
  } 

  // ""ALGUIEN""
  if (gifFrame > 46 && gifFrame < 51) {
    push();
    translate(170, 400);
    rotate(0);

    fill(255);
    textFont(dejavuBold, 3);
    text(txHayalguien2, 0, 0); // tx
    pop();
  } 

  // ""AQUI""
  if (gifFrame > 50 && gifFrame < 55) {
    push();
    translate(140, 340);
    rotate(0.1);

    fill(255);
    textFont(dejavuBold, 3);
    text(txHayalguien3, 0, 0); // tx
    pop();
  } 

  // ""TUTORIA""
  push();
  resetMatrix();

  fill(0);
  rect(111, 785, 268, 22); // rect

  fill(255);
  textFont(dejavu, 2.6);
  text(txTutoria, 246, 796); // tx
  pop();
}


//_____________________________________________
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


//_____________________________________________

// TEXTOS ASCII

const txCargando = `
       _..._                                                                      .-'''-.     
    .-'_..._''.                                                  _______         '   _    \\   
  .' .'      '.\\                                         _..._   \\  ___ \`'.    /   /\` '.   \\  
 / .'                               .--./)             .'     '.  ' |--.\\  \\  .   |     \\  '  
. '                       .-,.--.  /.''\\\\             .   .-.   . | |    \\  ' |   '      |  ' 
| |                 __    |  .-. || |  | |      __    |  '   '  | | |     |  '\\    \\     / /  
| |              .:--.'.  | |  | | \\\`-' /    .:--.'.  |  |   |  | | |     |  | \`.   \` ..' /   
. '             / |   \\ | | |  | | /("'\`    / |   \\ | |  |   |  | | |     ' .'    '-...-'\`    
 \\ '.          .\`" __ | | | |  '-  \\ '---.  \`" __ | | |  |   |  | | |___.' /'                 
  '. \`._____.-'/ .'.''| | | |       /'""'.\\  .'.''| | |  |   |  |/_______.'/                  
    \`-.______ / / /   | |_| |      ||     ||/ /   | |_|  |   |  |\\_______|/                   
             \`  \\ \\._,\\ '/|_|      \\'. __// \\ \\._,\\ '/|  |   |  |                             
                 \`--'  \`"           \`'---'   \`--'  \`" '--'   '--'                             

`;

const txLupiloop  = `
 ___      __   __  _______  ___   ___      _______  _______  _______ 
|   |    |  | |  ||       ||   | |   |    |       ||       ||       |
|   |    |  | |  ||    _  ||   | |   |    |   _   ||   _   ||    _  |
|   |    |  |_|  ||   |_| ||   | |   |    |  | |  ||  | |  ||   |_| |
|   |___ |       ||    ___||   | |   |___ |  |_|  ||  |_|  ||    ___|
|       ||       ||   |    |   | |       ||       ||       ||   |    
|_______||_______||___|    |___| |_______||_______||_______||___|    
`;

const txVersion = `v0.3`;

const txAnio = `
██████   ██████  ██████  ██   ██ 
     ██ ██    ██      ██ ██   ██ 
 █████  ██ ██ ██  █████  ███████ 
██      ██    ██ ██           ██ 
███████  ██████  ███████      ██ 
`;


const txAtencion = () => {

  const r = () => asciiAtenx[floor(random(3))];

  return `
  /${r()}${r()}${r()}${r()}${r()}${r()}  /${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()} /${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()} /${r()}${r()}   /${r()}${r()}  /${r()}${r()}${r()}${r()}${r()}${r()}  /${r()}${r()}${r()}${r()}${r()}${r()}  /${r()}${r()}${r()}${r()}${r()}${r()}  /${r()}${r()}   /${r()}${r()}
 /${r()}${r()}__  ${r()}${r()}|__  ${r()}${r()}__/| ${r()}${r()}_____/| ${r()}${r()}${r()} | ${r()}${r()} /${r()}${r()}__  ${r()}${r()}|_  ${r()}${r()}_/ /${r()}${r()}__  ${r()}${r()}| ${r()}${r()}${r()} | ${r()}${r()}
| ${r()}${r()}  \\ ${r()}${r()}   | ${r()}${r()}   | ${r()}${r()}      | ${r()}${r()}${r()}${r()}| ${r()}${r()}| ${r()}${r()}  \\__/  | ${r()}${r()}  | ${r()}${r()}  \\ ${r()}${r()}| ${r()}${r()}${r()}${r()}| ${r()}${r()}
| ${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()}   | ${r()}${r()}   | ${r()}${r()}${r()}${r()}${r()}   | ${r()}${r()} ${r()}${r()} ${r()}${r()}| ${r()}${r()}        | ${r()}${r()}  | ${r()}${r()}  | ${r()}${r()}| ${r()}${r()} ${r()}${r()} ${r()}${r()}
| ${r()}${r()}__  ${r()}${r()}   | ${r()}${r()}   | ${r()}${r()}__/   | ${r()}${r()}  ${r()}${r()}${r()}${r()}| ${r()}${r()}        | ${r()}${r()}  | ${r()}${r()}  | ${r()}${r()}| ${r()}${r()}  ${r()}${r()}${r()}${r()}
| ${r()}${r()}  | ${r()}${r()}   | ${r()}${r()}   | ${r()}${r()}      | ${r()}${r()}\\  ${r()}${r()}${r()}| ${r()}${r()}    ${r()}${r()}  | ${r()}${r()}  | ${r()}${r()}  | ${r()}${r()}| ${r()}${r()}\\  ${r()}${r()}${r()}
| ${r()}${r()}  | ${r()}${r()}   | ${r()}${r()}   | ${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()}| ${r()}${r()} \\  ${r()}${r()}|  ${r()}${r()}${r()}${r()}${r()}${r()}/ /${r()}${r()}${r()}${r()}${r()}${r()}|  ${r()}${r()}${r()}${r()}${r()}${r()}/| ${r()}${r()} \\  ${r()}${r()}
|__/  |__/   |__/   |________/|__/  \\__/ \\______/ |______/ \\______/ |__/  \\__/
`;
}

const txPorfavor = `
 /$$$$$$$   /$$$$$$  /$$$$$$$  /$$$$$$$$ /$$$$$$  /$$    /$$  /$$$$$$  /$$$$$$$                         
| $$__  $$ /$$__  $$| $$__  $$| $$_____//$$__  $$| $$   | $$ /$$__  $$| $$__  $$                        
| $$  \\ $$| $$  \\ $$| $$  \\ $$| $$     | $$  \\ $$| $$   | $$| $$  \\ $$| $$  \\ $$                        
| $$$$$$$/| $$  | $$| $$$$$$$/| $$$$$  | $$$$$$$$|  $$ / $$/| $$  | $$| $$$$$$$/                        
| $$____/ | $$  | $$| $$__  $$| $$__/  | $$__  $$ \\  $$ $$/ | $$  | $$| $$__  $$                        
| $$      | $$  | $$| $$  \\ $$| $$     | $$  | $$  \\  $$$/  | $$  | $$| $$  \\ $$                        
| $$      |  $$$$$$/| $$  | $$| $$     | $$  | $$   \\  $/   |  $$$$$$/| $$  | $$                        
|__/       \\______/ |__/  |__/|__/     |__/  |__/    \\_/     \\______/ |__/  |__/                        
`;

const txHola = `
░▒▓█▓▒░ ░▒▓█▓▒░  ░▒▓███████▓▒░  ░▒▓█▓▒░      ░▒▓███████▓▒░   ░▒▓███████▓▒░  
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░ ░▒▓█▓▒░         ░▒▓█▓▒░ 
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░ ░▒▓█▓▒░         ░▒▓█▓▒░ 
░▒▓█████████▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█████████▓▒░     ░▒▓████▓▒░  
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░     
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░ ░▒▓█▓▒░                 
░▒▓█▓▒░ ░▒▓█▓▒░  ░▒▓███████▓▒░  ░▒▓█████▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░     
`;

const txHayalguien1 = `
░▒▓█▓▒░ ░▒▓█▓▒░  ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓█▓▒░                                                         
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░                                                         
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░                                                         
░▒▓█████████▓▒░ ░▒▓█████████▓▒░  ░▒▓███████▓▒░                                                          
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░                                                             
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░                                                             
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░                                                             
`;

const txHayalguien2 = `
░▒▓█▓▒░ ░▒▓█▓▒░  ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓█▓▒░                                                         
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░                                                         
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░                                                         
░▒▓█████████▓▒░ ░▒▓█████████▓▒░  ░▒▓███████▓▒░                                                          
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░                                                             
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░                                                             
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░                                                             
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
 ░▒▓███████▓▒░  ░▒▓█▓▒░      ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓██████▓▒░ ░▒▓████████▓▒░         
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░      ░▒▓█▓▒░ ░▒▓█▓▒░        
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░         ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░      ░▒▓█▓▒░ ░▒▓█▓▒░        
░▒▓█████████▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░▒▓███▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█████▓▒░  ░▒▓█▓▒░ ░▒▓█▓▒░        
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░      ░▒▓█▓▒░ ░▒▓█▓▒░        
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░      ░▒▓█▓▒░ ░▒▓█▓▒░        
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█████▓▒░  ░▒▓███████▓▒░   ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓██████▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░        
`;

const txHayalguien3 = `
░▒▓█▓▒░ ░▒▓█▓▒░  ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓█▓▒░                                                         
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░                                                         
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░                                                         
░▒▓█████████▓▒░ ░▒▓█████████▓▒░  ░▒▓███████▓▒░                                                          
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░                                                             
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░                                                             
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░                                                             
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
 ░▒▓███████▓▒░  ░▒▓█▓▒░      ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓██████▓▒░ ░▒▓████████▓▒░         
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░      ░▒▓█▓▒░ ░▒▓█▓▒░        
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░         ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░      ░▒▓█▓▒░ ░▒▓█▓▒░        
░▒▓█████████▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░▒▓███▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█████▓▒░  ░▒▓█▓▒░ ░▒▓█▓▒░        
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░      ░▒▓█▓▒░ ░▒▓█▓▒░        
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░      ░▒▓█▓▒░ ░▒▓█▓▒░        
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█████▓▒░  ░▒▓███████▓▒░   ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓██████▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
 ░▒▓███████▓▒░   ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░  ░▒▓███████▓▒░   ░▒▓███████▓▒░   ░▒▓███████▓▒░  
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░         ░▒▓█▓▒░         ░▒▓█▓▒░         ░▒▓█▓▒░ 
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░         ░▒▓█▓▒░         ░▒▓█▓▒░         ░▒▓█▓▒░ 
░▒▓█████████▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓████▓▒░      ░▒▓████▓▒░      ░▒▓████▓▒░  
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░     ░▒▓█▓▒░         ░▒▓█▓▒░         ░▒▓█▓▒░     
░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░                                                 
░▒▓█▓▒░ ░▒▓█▓▒░  ░▒▓███████▓▒░   ░▒▓███████▓▒░  ░▒▓█▓▒░     ░▒▓█▓▒░         ░▒▓█▓▒░         ░▒▓█▓▒░     
                   ░▒▓█▓▒░                                                                              
                    ░▒▓██▓▒░                                                                            
`;


const txTutoria = `
████████╗ ██╗   ██╗ ████████╗  ██████╗  ██████╗  ██╗  █████╗     ██╗ ███╗   ██╗ ███████╗  ██████╗      ██████╗  ███████╗ ███╗   ██╗ ███████╗ ██████╗   █████╗  ██╗     
╚══██╔══╝ ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔══██╗ ██║ ██╔══██╗    ██║ ████╗  ██║ ██╔════╝ ██╔═══██╗    ██╔════╝  ██╔════╝ ████╗  ██║ ██╔════╝ ██╔══██╗ ██╔══██╗ ██║     
   ██║    ██║   ██║    ██║    ██║   ██║ ██████╔╝ ██║ ███████║    ██║ ██╔██╗ ██║ █████╗   ██║   ██║    ██║  ███╗ █████╗   ██╔██╗ ██║ █████╗   ██████╔╝ ███████║ ██║     
   ██║    ██║   ██║    ██║    ██║   ██║ ██╔══██╗ ██║ ██╔══██║    ██║ ██║╚██╗██║ ██╔══╝   ██║   ██║    ██║   ██║ ██╔══╝   ██║╚██╗██║ ██╔══╝   ██╔══██╗ ██╔══██║ ██║     
   ██║    ╚██████╔╝    ██║    ╚██████╔╝ ██║  ██║ ██║ ██║  ██║    ██║ ██║ ╚████║ ██║      ╚██████╔╝    ╚██████╔╝ ███████╗ ██║ ╚████║ ███████╗ ██║  ██║ ██║  ██║ ███████╗
   ╚═╝     ╚═════╝     ╚═╝     ╚═════╝  ╚═╝  ╚═╝ ╚═╝ ╚═╝  ╚═╝    ╚═╝ ╚═╝  ╚═══╝ ╚═╝       ╚═════╝      ╚═════╝  ╚══════╝ ╚═╝  ╚═══╝ ╚══════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚══════╝
`;

const txDesliza = `
                              ██████╗     ███████╗    ███████╗    ██╗         ██╗    ███████╗     █████╗                               
  █         █         █       ██╔══██╗    ██╔════╝    ██╔════╝    ██║         ██║    ╚══███╔╝    ██╔══██╗      █         █         █   
 ███╗      ███╗      ███╗     ██║  ██║    █████╗      ███████╗    ██║         ██║      ███╔╝     ███████║     ███╗      ███╗      ███╗ 
██╔██╗    ██╔██╗    ██╔██╗    ██║  ██║    ██╔══╝      ╚════██║    ██║         ██║     ███╔╝      ██╔══██║    ██╔██╗    ██╔██╗    ██╔██╗
╚═╝╚═╝    ╚═╝╚═╝    ╚═╝╚═╝    ██████╔╝    ███████╗    ███████║    ███████╗    ██║    ███████╗    ██║  ██║    ╚═╝╚═╝    ╚═╝╚═╝    ╚═╝╚═╝
                              ╚═════╝     ╚══════╝    ╚══════╝    ╚══════╝    ╚═╝    ╚══════╝    ╚═╝  ╚═╝                              
`;