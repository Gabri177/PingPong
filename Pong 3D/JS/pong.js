import * as THREE from '../node_modules/three/build/three.module.js';
import { keyStates, setupKeyControls} from './controls.js';
import { padMoveStepLength, tableHeight, tableLength, padLength} from './constants.js';
import { padEdgeCorrect} from './edgeJudge.js';


var initPadYPositionPlayer = 0;
var initPadYPositionEnamy = 0;
var ballXPosition = 0;
var ballYPosition = 0;

// 获取 canvas 元素
// get the canvas element
const canvas = document.getElementById('gameWindow');

// 创建场景
// create a scene
const scene = new THREE.Scene();

// 创建一个长方形几何体
// create a box geometry
const geometry = new THREE.BoxGeometry(tableLength, 10, tableHeight);
const padPlayer = new THREE.BoxGeometry(10, 10, padLength);
const padEnamy = new THREE.BoxGeometry(10, 10, padLength);
const ball = new THREE.SphereGeometry(5, 32, 32);

// 创建一个材质
// create a material
// const material = new THREE.MeshBasicMaterial({ 

// 	color: 0x00ff00,
// 	transparent: true,
// 	opacity: 0.5
// });

const material = new THREE.MeshLambertMaterial({

	color: 0x00ffff,
})
const materialPad = new THREE.MeshLambertMaterial({

	color: 0xff0000,
})
const materialBall = new THREE.MeshLambertMaterial({

    color: 0xf0f0ff,
    wireframe: true
})


// 创建一个网格
// create a mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
// 将网格添加到场景
scene.add(mesh);

const meshPadPlayer = new THREE.Mesh(padPlayer, materialPad);
meshPadPlayer.position.set(-150, 10, initPadYPositionPlayer);
scene.add(meshPadPlayer);

const meshPadEnamy = new THREE.Mesh(padEnamy, materialPad);
meshPadEnamy.position.set(150, 10, initPadYPositionEnamy);
scene.add(meshPadEnamy);

const meshBall = new THREE.Mesh(ball, materialBall);
meshBall.position.set(ballXPosition, 10, ballYPosition);
scene.add(meshBall);

// 创建一个坐标轴
// create an axes helper
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 创建一个光源
// create a light

//const light = new THREE.DirectionalLight(0xffffff, 1.0);
const light = new THREE.PointLight(0xffffff, 1.0);
// 设置光线不随距离的衰减
// set the light decay with distance
light.decay = 0.0;
light.intensity = 2.0;
light.position.set(0, 300, 800);
scene.add(light);



const width = canvas.clientWidth;
const height = canvas.clientHeight;
const fov = 65;
const aspect = width / height;

// 创建相机
// create a camera
const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 3000);
// 设置相机位置
// set the camera position
camera.position.set(0, 80, 140);
// 设置相机朝向
// set the camera look at
camera.lookAt(0, 0, 0);

// 创建渲染器
// create a renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(width, height);
// 进行渲染
// render the scene
renderer.render(scene, camera);

window.onload = setupKeyControls;

setInterval(keyMovePad, 1000 / 60);

function keyMovePad() {

	if (keyStates['w'])
        meshPadPlayer.position.set(-150, 10, padEdgeCorrect(initPadYPositionPlayer -= padMoveStepLength, padLength, tableHeight));
    if (keyStates['s'])
        meshPadPlayer.position.set(-150, 10, padEdgeCorrect(initPadYPositionPlayer += padMoveStepLength, padLength, tableHeight));


    if (keyStates['p'])
        meshPadEnamy.position.set(150, 10, padEdgeCorrect(initPadYPositionEnamy -= padMoveStepLength, padLength, tableHeight));

    if (keyStates['l'])
        meshPadEnamy.position.set(150, 10, padEdgeCorrect(initPadYPositionEnamy += padMoveStepLength, padLength, tableHeight));

	renderer.render(scene, camera);
}