let musica = [];
let tempo = 120;
let songDurations = [0.5, 0.6, 0.5, 0.7, 0.5, 0.7, 0.5, 8, 9, 10, 11, 12];
let soundsList = [];
let flagAsync = true;

function createSounds(){
  soundsList = [];
  for(var i=0; i < 12; i++){
    soundsList.push(
      new Howl({
          src: ['../files/sounds/s'+i+'.mp3'],
          rate: (tempo*songDurations[i])/60
      })
    );
  }
}

function createNewBlock(){
  let bloque = document.createElement("div");
  bloque.className = "row num" + document.getElementById("blocks").childElementCount;
  for (var i = 0; i < 12; i++) {
    let tempBlock = document.createElement("div");
    tempBlock.className = "bloqueMusical false num" + i + " ";
    tempBlock.setAttribute("onClick", "block(this, " + i + ")");
    bloque.appendChild(tempBlock);
  }
  let contenedor = document.getElementById("blocks");
  contenedor.appendChild(bloque);
  let row = [false, false, false, false, false, false, false, false, false, false, false, false];
  musica.push(row);
}

function deleteColumn(){
  musica.pop();
  let contenedor = document.getElementById("blocks");
  contenedor.removeChild(contenedor.lastChild);
}

function block(block, posy){
  let posx = block.parentNode.className.substr(7);
  musica[posx][posy] = !musica[posx][posy];
  block.className = "bloqueMusical " + musica[posx][posy] + " num"+posy;
  playSound(posy);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function play(){
  let rows = document.getElementById("blocks").children;
  for (var i = 0; i < rows.length; i++){
    if(flagAsync) break;
    rows[i].className = "row active num" + i;
    for(var j=0; j<12; j++){
      if(musica[i][j]) playSound(j);
    }
    await sleep(60000/tempo);
    rows[i].className = "row num" + i;
  }
  if(!flagAsync) play();
}

function playAsync(){
  if(flagAsync){
    flagAsync = false;
    play();
  }else{
    flagAsync = true;
  }
}

function showVal(val){
  document.getElementById("rangeValue").innerHTML = "Tempo: " + val;
  tempo = parseInt(val);
  createSounds();
}

function playSound(num){
  soundsList[num].play();
}

function init(){
    for (var i = 0; i < 25; i++){
      createNewBlock();
    }
    createSounds();
}

init();
