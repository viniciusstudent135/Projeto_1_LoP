import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
//import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';
//testar no github page
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
const corCarro = 0xd3d3d3; //0x030bfc, 0xD3D3D3
//corpo do carro
function CriarCorpo(){
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.85, 3),
    new THREE.MeshBasicMaterial({color: corCarro})
  );
  return body;
}
carro.add(CriarCorpo());

function CriaParabrisa(base, altura,x,y,z){
  const parabrisa = new THREE.Mesh(
    new THREE.PlaneGeometry(base,altura),
    new THREE.MeshBasicMaterial({color: 0x808080})
  );
  parabrisa.position.set(x,y,z);
  return parabrisa;
}
const x1=0,y1=0.42,z1=0.69;
carro.add(CriaParabrisa(2,1, x1,y1,z1));
carro.add(CriaParabrisa(2,0.8, x1,0.003,1.5));
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
const x = 0.9, a=0.4, b=6, cor = 0x363636, cor2= 0x808080;
carro.add(criarRodas(x,x,a,b,cor));
carro.add(criarRodas(-x,x,a,b,cor));
carro.add(criarRodas(x,-x,a,b,cor));
carro.add(criarRodas(-x,-x,a,b,cor));
//efeito do aro da roda
carro.add(criarRodas(x,x,a,3,cor2));
carro.add(criarRodas(-x,x,a,3,cor2));
carro.add(criarRodas(x,-x,a,3,cor2));
carro.add(criarRodas(-x,-x,a,3,cor2));
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

//animação do carro se movendo com as teclas:
function updateCamera() {
  //camera.position.x = carro.position.x;
  //camera.position.z = carro.position.z + 7;
  //camera.position.y = carro.position.y + 5;
  camera.lookAt(carro.position);
}

function animacao(){
  requestAnimationFrame(animacao);
  if (keys['w']) carro.position.z -= 0.4;
  if (keys['s']) carro.position.z += 0.4;
  if (keys['a']) carro.position.x -= 0.4;
  if (keys['d']) carro.position.x += 0.4;
  renderer.render(scene, camera);
  updateCamera();
}

animacao();