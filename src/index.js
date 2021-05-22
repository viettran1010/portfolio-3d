import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import './style.css'

const scene = new THREE.Scene();

//-------------CAMERA

const camera = new THREE.PerspectiveCamera( 75, 
      window.innerWidth / window.innerHeight, 
      0.1, 2000 );

//-------------RENDERER
const renderer = new THREE.WebGL1Renderer({ // render to bg canvas
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
// camera.position.setZ(-100000) // move camera up high
// camera.position.setX(1000) // move camera up high
renderer.render( scene, camera );

//-------------DONUT
const geometry = new THREE.TorusGeometry(10,3,16,100) //Donut
const material = new THREE.MeshStandardMaterial({color: 0xff6347});
const torus = new THREE.Mesh( geometry, material);
// torus.position.setX(5)
scene.add( torus);

//-------------LIGHTINGS
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//-------------HELPERS
// const lightHelper  = new THREE.PointLightHelper(pointLight); // 
// const gridHelper = new THREE.GridHelper(200,50); // place a grid to see planes better
// scene.add(lightHelper,gridHelper)
// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper)
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

//-------------CONTROL FOR CAMERA
const control = new OrbitControls(camera, renderer.domElement) // listen events from dom and update cam

//-------------STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z]  = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100)) // random pos

  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar) // add 200 stars

const spaceTexture = new THREE.TextureLoader().load('Space_night_sky.jpg');
scene.background = spaceTexture

//-------------AVATAR
const avaTexture = new THREE.TextureLoader().load('ava.jpg');

const avaMesh = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: avaTexture})
)
// avaMesh.position.setX(5)
scene.add(avaMesh)

//-------------MOON
const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moonMesh = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture
  })
)

moonMesh.position.z = 30;
moonMesh.position.setX(-10);

scene.add(moonMesh)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  torus.rotation.x += 0.05;
  torus.rotation.y += 0.075;
  torus.rotation.z += 0.05;

  avaMesh.rotation.y += 0.01;
  avaMesh.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera

//-------------RENDER
function animate() {
  requestAnimationFrame(animate); // perform animation every frame

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera)
}

animate();
