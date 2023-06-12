import './style.css'

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderen = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderen.setPixelRatio(window.devicePixelRatio);
// zet de groote van de applicatie
renderen.setSize(window.innerWidth, window.innerHeight);
// camera positioneren op Z axis
camera.position.setZ(30);

// vormen aanmaken zoals een driehoek
const geometrie = new THREE.TorusGeometry(15, 3, 16, 100);
// zorgt voor textuur
const materiaal = new THREE.MeshStandardMaterial({ color: 0xBCCCE0 });
//maken object
const donutVorm = new THREE.Mesh(geometrie, materiaal);

scene.add(donutVorm);
//licht soorten
const licht = new THREE.PointLight(0xffffff);
licht.position.set(15, 15, 15);
const sfeerlicht = new THREE.AmbientLight(0xffffff);
scene.add(licht, sfeerlicht);

const lighthelper = new THREE.PointLightHelper(licht);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lighthelper, gridHelper);


// bewegen van camera
const controler = new OrbitControls(camera, renderen.domElement);
// hier komen functies

//toevoegen aan scene
//loop
function animatie() {
  requestAnimationFrame(animatie)
  donutVorm.rotation.x += 0.009
  donutVorm.rotation.y += 0.005
  donutVorm.rotation.z += 0.009
  //updaten controls
  controler.update();
  // rendered de applicatie
  renderen.render(scene, camera);
}
function sterrenToevoegen() {
  const geometrie = new THREE.SphereGeometry(0.25);
  const materiaal = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const sterren = new THREE.Mesh(geometrie, materiaal);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  sterren.position.set(x, y, z);
  scene.add(sterren);
}




Array(250).fill().forEach(sterrenToevoegen);

const ruimteMateriaal = new THREE.TextureLoader().load('fotos/achtergrond.jpg');
scene.background = ruimteMateriaal;

// de maan?!?!?!
const maanTextuur = new THREE.TextureLoader().load('fotos/moon.jpg');
const normaleMaanTextuur = new THREE.TextureLoader().load('fotos/moon-surface-pictures-7989vq4h9wfx92ko.jpg');

const maan = new THREE.Mesh(
  //volgorde: diameter, hoe rond 
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: maanTextuur,
    normalMap: normaleMaanTextuur
  })
);
scene.add(maan);

maan.position.z = 30;
maan.position.x = -20;

function verplaatsCamera() {
  const t = document.body.getBoundingClientRect().top;
  maan.rotation.x += 0.05
  maan.rotation.y += 0.075
  maan.rotation.z += 0.05

  camera.position.x += t*-0.01
  camera.position.y += t*0.0002
  camera.position.z += t*0.0002

}
document.body.onscroll = verplaatsCamera();

animatie();