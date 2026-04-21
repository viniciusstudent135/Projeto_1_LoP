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
const corCarro = 0xd3d3d3; // cinza quase branco
//corpo do carro
function CriarCorpo(){
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.85, 3),//largura,altura,comprimento
    new THREE.MeshBasicMaterial({color: corCarro}) //cor e textura do material (material escolhido = básico, cor sólida)
  );
  return body;
}
carro.add(CriarCorpo());

function CriaSombra(base, altura,x,y,z){
  const sombra = new THREE.Mesh(
    new THREE.PlaneGeometry(base,altura),
    new THREE.MeshBasicMaterial({color: 0x808080})
  );
  sombra.position.set(x,y,z);
  return sombra;
}
const x1=0, y1=0.42,z1=0.69, y2=0.003,z2=1.5; //posições das sombras
carro.add(CriaSombra(2,1, x1,y1,z1));
carro.add(CriaSombra(2,0.8, x1,y2,z2));

//relevo do carro
function criarRelevo(){
  const relevo = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.8, 1.3),//largura,altura,comprimento 
    new THREE.MeshBasicMaterial({color: corCarro})//cor antiga:030bfc
  );
  relevo.position.y = 0.5; //move o objeto na cena em 3d
  return relevo;
}
carro.add(criarRelevo());

//rodas
function criarRodas(x,z, a,b,cor){
  const roda = new THREE.Mesh(
    new THREE.CylinderGeometry(a, a, a, b),//raio,altura,seg.radiais
    new THREE.MeshBasicMaterial({ color: cor })
  );
  roda.rotation.z = Math.PI/2;// rotaciona o objeto
  roda.position.set(x, -0.6,z); 
  return roda;
}
const x = 0.9, a=0.4, b=6, b2=3, cor = 0x363636, cor2= 0x808080;
carro.add(criarRodas(x,x,a,b,cor));
carro.add(criarRodas(-x,x,a,b,cor));
carro.add(criarRodas(x,-x,a,b,cor));
carro.add(criarRodas(-x,-x,a,b,cor));
//efeito do aro da roda
carro.add(criarRodas(x,x,a,b2,cor2));
carro.add(criarRodas(-x,x,a,b2,cor2));
carro.add(criarRodas(x,-x,a,b2,cor2));
carro.add(criarRodas(-x,-x,a,b2,cor2));
//---------------------|carro pronto|-----------------------\\

scene.add(carro);//adiciona carro a cena

//reconhece o teclado:
const keys = {};
window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

//carro se movendo ao apertar as teclas:
function updateCamera() {
  camera.position.x = carro.position.x;
  camera.position.z = carro.position.z + 7;
  camera.position.y = carro.position.y + 5;
  camera.lookAt(carro.position); //camera acompanha o carro
}
const velocidade = 3;
function animacao(){
  requestAnimationFrame(animacao);
  if (keys['w']) carro.position.z -= velocidade;
  if (keys['s']) carro.position.z += velocidade;
  if (keys['a']) carro.position.x -= velocidade;
  if (keys['d']) carro.position.x += velocidade;
  renderer.render(scene, camera);
  updateCamera();
}

animacao();
