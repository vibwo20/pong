//variáveis da bola
let xBola = 240;
let yBola = 180;
let diametroBola = 20;
let raioBola = diametroBola/2; 

//velocidade da bola
let velocidadeXBola = 5;
let velocidadeYBola = 5;

//variáveis da raquete
let xRaquete = 15;
let yRaquete = 140;
let larguraRaquete = 10;
let alturaRaquete = 85;

//variáveis do oponente
let xOponente = 455;
let yOponente = 140;
let larguraOponente = 10;
let alturaOponente = 85;
let velocidadeYOponente;

//placar
let meusPontos = 0;
let pontosOponente = 0;

//sons
let ponto;
let raquetada;
let fundo;

function preload(){
  ponto = loadSound("ponto.wav")
  raquetada = loadSound("raquetada.wav")
  fundo = loadSound("fundo.wav")
}

function setup() {
  createCanvas(480, 360);
  fundo.loop();
}

function draw() {
  background('rgb(91,52,179)') ;
  noStroke () ;
  bola () ;
  divisor () ;
  raquete (xRaquete, yRaquete) ;
  raquete (xOponente, yOponente) ;
  colisaoBorda () ;
  movimentoRaquete () ;
  movimentoOponente () ;
  colisaoRaquete () ;
  colisaoOponente () ;
  placar () ;
  marcarPontos () ;
  xBola += velocidadeXBola ;
  yBola += velocidadeYBola ;
   
}

function bola (){
  circle(xBola,yBola,diametroBola)
}

function colisaoBorda (){
  if (xBola + raioBola > width || xBola - raioBola < 0) {
     velocidadeXBola *= -1 }
  
  if (yBola + raioBola > height || yBola - raioBola < 0) {
      velocidadeYBola *= -1 }
  
}

function divisor (){
  rect(230, 0, 10, 480)
}

function raquete (x, y){
  rect(x, y, larguraRaquete, alturaRaquete, 4)
}

function movimentoRaquete (){
  if (keyIsDown (UP_ARROW)){
      yRaquete -= 10
  }
  if (keyIsDown (DOWN_ARROW)){
      yRaquete += 10
  }
}

function colisaoRaquete (){
  if (xBola - raioBola < xRaquete + larguraRaquete && 
      yBola + raioBola > yRaquete && 
      yBola - raioBola < yRaquete + alturaRaquete &&
      velocidadeXBola < 0){
      velocidadeXBola *= -1;
      raquetada.play();
  }
}

function colisaoOponente (){
  if (xBola + raioBola > xOponente - larguraOponente && 
      yBola + raioBola > yOponente && 
      yBola - raioBola < yOponente + alturaOponente &&
      velocidadeXBola > 0){
      velocidadeXBola *= -1;
      raquetada.play();
  }
}

function movimentoOponente (){
  velocidadeYOponente = (yBola - yOponente - 
  larguraRaquete) / 2 - 42
  yOponente += velocidadeYOponente 
  
}

function placar (){
  textSize (16)
  rect (165, 10, 40, 20, 4)
  text (meusPontos, 180, 26)
  rect (265, 10, 40, 20, 4)
  text (pontosOponente, 280, 26)
}

function marcarPontos (){
  if (xBola > 470){
      meusPontos += 1
      ponto.play();
}
  if (xBola < 10){
     pontosOponente += 1
     ponto.play();
  }
}