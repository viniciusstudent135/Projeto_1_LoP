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
const corCarro = 0xe30f00; // cinza quase brancod3d3d3
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
    new THREE.MeshBasicMaterial({color: 0x4f221f})//antes 808080
  );
  sombra.position.set(x,y,z);
  return sombra;
}
const x1=0, y1=0.42,z1=0.69, y2=0.003,z2=1.55; //posições das sombras
carro.add(CriaSombra(2,1, x1,y1,z1));
carro.add(CriaSombra(2,0.82, x1,y2,z2));

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
const x = 0.9, xAro = 0.97, a=0.4, aAro= 0.3, b=8, b2=6, corRoda = 0x000000, corAro= 0x808080;
carro.add(criarRodas(x,x,a,b,corRoda));
carro.add(criarRodas(-x,x,a,b,corRoda));
carro.add(criarRodas(x,-x,a,b,corRoda));
carro.add(criarRodas(-x,-x,a,b,corRoda));
//efeito do aro da roda
carro.add(criarRodas(xAro,x,aAro,b2,corAro));
carro.add(criarRodas(-xAro,x,aAro,b2,corAro));
carro.add(criarRodas(xAro,-x,aAro,b2,corAro));
carro.add(criarRodas(-xAro,-x,aAro,b2,corAro));
//---------------------|carro pronto|-----------------------\\

scene.add(carro);//adiciona carro a cena

const fundo = new THREE.Mesh(
  new THREE.PlaneGeometry(1000, 1000),//largura,altura
  new THREE.MeshBasicMaterial({color: 0xcfcec2}) //cor e textura do material (material escolhido = básico, cor sólida)
);
fundo.position.z = -10;//move o objeto na cena em 3d
scene.add(fundo);

function animacao(){
  requestAnimationFrame(animacao);
  carro.rotation.y += 0.02; //rotação do carro
  renderer.render(scene, camera);
  updateCamera();
}
animacao();