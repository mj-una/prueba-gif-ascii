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
let asciiBlank = `▒░ `;
let asciiChars = `    ''""ia#▓▓███`;

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

  createCanvas(500, 886);
  windowResized();

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

    textFont(dejavuBold, 3);
    text(txAnio1, 250, 610);

    return; // salida temprana del draw
  }

  if (flCargando) {
    lupi.frame(1);
    lupi.play();
    flCargando = false;
  }
  
  // referencia
  image(lupi, 0, 0);
  let gifFrame = lupi.frame(); // frame actual del gif
  lupi.loadPixels(); // almacena valores en array "pixels"
  
  // lienzo
  background(0);
  translate(2,4);
  
  // fondo principal
  textFont(dejavu, size);

  // si llega a final del gif, activar ruido
  if (gifFrame >= lupi.totalFrames() - 1) flRuido = true;
  
  // PANTALLA RUIDO
  if (flRuido) { 
    
    // si recien 
    if (flPausar) {
      
      flPausar = false; // flag para evitar q entre de nuevo aqui
      lupi.frame(1); // vuelve a frame inicial
      lupi.pause(); // pausar gif
      
      setTimeout(() => { // despues de dos segundos
        lupi.play(); // ...y quita pausa.
        flPausar = true; // reactivar flag pausa
        flRuido = false; // desactivar flag ruido
      }, 2000); // cuenta regresiva en milisegundos
    }

    for (let i = 0; i < lupi.width; i++) {
      for (let j = 0; j < lupi.height; j++) {

        let x = i * size;
        let y = j * size;
        let t = asciiBlank[floor(random(3))];
        text(t, x, y);
      }
    }
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

  // textos temporales

  if (gifFrame > 1 && gifFrame < 40) {
    push();
    translate(250, 100)
    rotate(-0.2);
    scale(0.2 + gifFrame * 0.03);

    let t1 = map(gifFrame, 0, 40, 255, 0);
    let t2 = map(gifFrame, 0, 40, 200, 0);

    fill(255, t1 + t2);
    textFont(dejavuBold, 12);
    text(txAtencion, -20, 10); // tx ""ATENCION""
    pop();
  }

  if (gifFrame > 1 && gifFrame < 4) {
    push();
    translate(340, 270);
    rotate(0.05);

    fill(255);
    stroke(255);
    strokeWeight(1);
    textFont(dejavuBold, 1);
    text(txPorfavor, 0, 0); // tx ""PORFAVOR"" pt1
    pop();
  }

  if (gifFrame > 5 && gifFrame < 8) {
    push();
    translate(350, 290);
    rotate(0.11);

    fill(255);
    stroke(255);
    strokeWeight(1);
    textFont(dejavuBold, 1.5);
    text(txPorfavor, 0, 0); // tx ""PORFAVOR"" pt2
    pop();
  }

  if (gifFrame > 9 && gifFrame < 12) {
    push();
    translate(359, 310);
    rotate(0.22);

    fill(255);
    stroke(255);
    strokeWeight(1);
    textFont(dejavuBold, 2);
    text(txPorfavor, 0, 0); // tx ""PORFAVOR"" pt3
    pop();
  }

  if (gifFrame > 14 && gifFrame < 17) {
    push();
    translate(367, 330);
    rotate(0.33);

    fill(255);
    stroke(255);
    strokeWeight(1);
    textFont(dejavuBold, 2.5);
    text(txPorfavor, 0, 0); // tx ""PORFAVOR"" pt4
    pop();
  }

  if (gifFrame > 20 && gifFrame < 23) {
    push();
    translate(374, 350);
    rotate(0.44);

    fill(255);
    stroke(255);
    strokeWeight(1);
    textFont(dejavuBold, 3);
    text(txPorfavor, 0, 0); // tx ""PORFAVOR"" pt5
    pop();
  }

  if (gifFrame > 24 && gifFrame < 27) {
    push();
    translate(381, 370);
    rotate(0.55);

    fill(255);
    stroke(255);
    strokeWeight(1);
    textFont(dejavuBold, 3.5);
    text(txPorfavor, 0, 0); // tx ""PORFAVOR"" pt6
    pop();
  }

  // push();
  // fill(255, 100, 100);
  // stroke(255);
  // textFont(dejavuBold, 59)
  // text(gifFrame, 400, 600); // TESTTT
  // pop();

  if (gifFrame > 29 && gifFrame < 44) {
    push();
    translate(230, 510);
    rotate(-0.1);

    let t = map(gifFrame, 30, 40, 0, 255);

    fill(255, t);
    textFont(dejavuBold, 5);
    text(txHola, 0, 0); // tx ""HOLA""
    pop();
  } 

  if (gifFrame > 42 && gifFrame < 47) {
    push();
    translate(200, 460);
    rotate(-0.05);

    fill(255);
    textFont(dejavuBold, 3);
    text(txHayalguien1, 0, 0); // tx ""HAY""
    pop();
  } 

  if (gifFrame > 46 && gifFrame < 51) {
    push();
    translate(170, 400);
    rotate(0);

    fill(255);
    textFont(dejavuBold, 3);
    text(txHayalguien2, 0, 0); // tx ""ALGUIEN""
    pop();
  } 

  if (gifFrame > 50 && gifFrame < 55) {
    push();
    translate(140, 340);
    rotate(0.1);

    fill(255);
    textFont(dejavuBold, 3);
    text(txHayalguien3, 0, 0); // tx ""AQUI""
    pop();
  } 

  // textos fijos
  push();
  resetMatrix();

  fill(0);
  rect(11, 776, 468, 38); // abajo grande

  fill(255);
  textFont(dejavu, 4.6);
  text(txTutoria, 246, 796); // tx ""TUTORIA""

  fill(0);
  rect(220, 824, 50, 19); // abajo chico

  fill(255);
  textFont(dejavu, 2.2);
  text(txAnio2, 247, 833); // tx ""2024""
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

const txAnio1 = `
___     ___    ___    _  _    
|__ \   / _ \  |__ \  | || |   
   ) | | | | |    ) | | || |_  
  / /  | | | |   / /  |__   _| 
 / /_  | |_| |  / /_     | |   
|____|  \___/  |____|    |_|   
`;

const txTutoria = `
████████╗ ██╗   ██╗ ████████╗  ██████╗  ██████╗  ██╗  █████╗     ██╗ ███╗   ██╗ ███████╗  ██████╗      ██████╗  ███████╗ ███╗   ██╗ ███████╗ ██████╗   █████╗  ██╗     
╚══██╔══╝ ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔══██╗ ██║ ██╔══██╗    ██║ ████╗  ██║ ██╔════╝ ██╔═══██╗    ██╔════╝  ██╔════╝ ████╗  ██║ ██╔════╝ ██╔══██╗ ██╔══██╗ ██║     
   ██║    ██║   ██║    ██║    ██║   ██║ ██████╔╝ ██║ ███████║    ██║ ██╔██╗ ██║ █████╗   ██║   ██║    ██║  ███╗ █████╗   ██╔██╗ ██║ █████╗   ██████╔╝ ███████║ ██║     
   ██║    ██║   ██║    ██║    ██║   ██║ ██╔══██╗ ██║ ██╔══██║    ██║ ██║╚██╗██║ ██╔══╝   ██║   ██║    ██║   ██║ ██╔══╝   ██║╚██╗██║ ██╔══╝   ██╔══██╗ ██╔══██║ ██║     
   ██║    ╚██████╔╝    ██║    ╚██████╔╝ ██║  ██║ ██║ ██║  ██║    ██║ ██║ ╚████║ ██║      ╚██████╔╝    ╚██████╔╝ ███████╗ ██║ ╚████║ ███████╗ ██║  ██║ ██║  ██║ ███████╗
   ╚═╝     ╚═════╝     ╚═╝     ╚═════╝  ╚═╝  ╚═╝ ╚═╝ ╚═╝  ╚═╝    ╚═╝ ╚═╝  ╚═══╝ ╚═╝       ╚═════╝      ╚═════╝  ╚══════╝ ╚═╝  ╚═══╝ ╚══════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚══════╝
`;

const txAnio2 = `
██████   ██████  ██████  ██   ██ 
     ██ ██    ██      ██ ██   ██ 
 █████  ██ ██ ██  █████  ███████ 
██      ██    ██ ██           ██ 
███████  ██████  ███████      ██ 
`;

const txAtencion = `
  /██████  /████████ /████████ /██   /██  /██████  /██████  /██████  /██   /██
 /██__  ██|__  ██__/| ██_____/| ███ | ██ /██__  ██|_  ██_/ /██__  ██| ███ | ██
| ██  \\ ██   | ██   | ██      | ████| ██| ██  \\__/  | ██  | ██  \\ ██| ████| ██
| ████████   | ██   | █████   | ██ ██ ██| ██        | ██  | ██  | ██| ██ ██ ██
| ██__  ██   | ██   | ██__/   | ██  ████| ██        | ██  | ██  | ██| ██  ████
| ██  | ██   | ██   | ██      | ██\\  ███| ██    ██  | ██  | ██  | ██| ██\\  ███
| ██  | ██   | ██   | ████████| ██ \\  ██|  ██████/ /██████|  ██████/| ██ \\  ██
|__/  |__/   |__/   |________/|__/  \\__/ \\______/ |______/ \\______/ |__/  \\__/
`;

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

