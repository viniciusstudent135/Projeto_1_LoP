import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
//configurando cena
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
//renderizador
const renderer = new THREE.WebGLRenderer();
//tamanho da tela
renderer.setSize(window.innerWidth, window.innerHeight);
//linkando o renderizador
document.body.appendChild(renderer.domElement);

//configurar a profundidade da camera:
camera.position.z = 10;


////---------------------|criação do carro|-----------------------\\
const carro = new THREE.Group();
const corCarro = 0xe30f00; // vermelho
//corpo do carro
var xBase = 2, yBase = 0.85, zBase = 3;
var xRelevo = 2, yRelevo = 0.8, zRelevo = 1.7;
function CriarCorpo(largura,altura,comprimento,posicao_y, cor){
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(largura, altura, comprimento),//largura,altura,comprimento
    new THREE.MeshBasicMaterial({color: cor}) //cor e textura do material (material escolhido = básico, cor sólida)
  );
  body.position.y = posicao_y; //move o objeto na cena em 3d
  return body;
}
const base = CriarCorpo(xBase, yBase, zBase, 0, corCarro);
const relevo = CriarCorpo(xRelevo, yRelevo, zRelevo, 0.5, corCarro);
carro.add(base);
carro.add(relevo);

//rodas
function criarRodas(posicao_x,posicao_z, raio_e_altura,pontas, cor){
  const roda = new THREE.Mesh(
    new THREE.CylinderGeometry(raio_e_altura, raio_e_altura, raio_e_altura, pontas),//a = raio das bases do cilindro(2 primeiras letras),altura, b = seg.radiais(quantidade de pontas que forma)
    new THREE.MeshBasicMaterial({ color: cor })
  );
  roda.rotation.z = Math.PI/2;// rotaciona o objeto em 90 graus no eixo z
  roda.position.set(posicao_x, -0.6,posicao_z); 
  return roda;
}
var posicao_x = 0.9, posicao_z = 0.9, raio_e_altura=0.4, Quant_pontas=8, corRoda = 0x292a2b;//cor cinza escuro
const rodaDireitaTras = criarRodas(posicao_x,posicao_z, raio_e_altura,Quant_pontas,corRoda);
const rodaEsquerdaTras = criarRodas(-posicao_x,posicao_z, raio_e_altura,Quant_pontas,corRoda);
const rodaDireitaFrente = criarRodas(posicao_x,-posicao_z, raio_e_altura,Quant_pontas,corRoda);
const rodaEsquerdaFrente = criarRodas(-posicao_x,-posicao_z, raio_e_altura,Quant_pontas,corRoda);
carro.add(rodaDireitaFrente);
carro.add(rodaEsquerdaTras);
carro.add(rodaDireitaTras);
carro.add(rodaEsquerdaFrente);
//---------------------|carro pronto|-----------------------\\
scene.add(carro);//adiciona carro a cena
/*
function animacao(){
  requestAnimationFrame(animacao);
  carro.rotation.y += 0.02; //rotação do carro
  renderer.render(scene, camera);
}
animacao();
//*/
///*
//reconhece o teclado:
const keys = {};
window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

//carro se movendo ao apertar as teclas:
function updateCamera() {
  camera.position.x = carro.position.x + 1.5;
  camera.position.z = carro.position.z + 7;
  camera.position.y = carro.position.y + 5;
  camera.lookAt(carro.position); //camera acompanha o carro
}

var velocidade = 0.35;
function animacao(){
  requestAnimationFrame(animacao);
  if (keys['arrowup'] || keys['w']) carro.position.z -= velocidade;
  if (keys['arrowdown'] || keys['s']) carro.position.z += velocidade;
  if (keys['arrowleft'] || keys['a']) carro.position.x -= velocidade;
  if (keys['arrowright'] || keys['d']) carro.position.x += velocidade;
  renderer.render(scene, camera);
  updateCamera();
}

animacao();
//*/