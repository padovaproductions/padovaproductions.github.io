import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from 'dat.gui';
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


// Get the geometry of the model - and that only -with positioning

// Lights, materials, everything else is from here

// Add rotation/motion positions to dat gui -- add actions via GUI buttons




const projectName = "Abel-1";


function init() {
    const canvasWrapper = document.getElementById('three-canvas-wr')
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        const blockColor = 0x5DADE2;
        const blockHoverColor = 0xFFDB4B;
        const containerColor = 0xEEEEEE;


        const scene = new THREE.Scene();
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        let INTERSECTED = [false, false];
        let importedGLTF = undefined;

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        }


        
        /**
         * GUI - press 'H' on keyboard to toggle hide/show
        */
        const gui = new dat.GUI({
            width: 300
        });
        // gui.hide()


        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
        camera.position.set(8,4,4)
        

        const tweakable_params = {
            blockColor,
            blockHoverColor,
            containerColor, 
            toggleShadows: ()=>{
                recursiveSetShadow(importedGLTF)
            }
        }



        /**
         * Controls
         */
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controls.autoRotateSpeed = .4; // # GUI
        controls.maxPolarAngle = Math.PI/2; // # GUI
        controls.minDistance = .4;
        controls.maxDistance = 20;
        const motionFolder = gui.addFolder('Motion Controls')
        motionFolder.open()
        motionFolder.add( controls, 'autoRotate' ).name("Auto rotate");






        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
        });
        // renderer.sortObjects = false,
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight( 0xffffff, .6 );
        scene.add( ambientLight );

        const light = new THREE.DirectionalLight(0xffffff, .62);
        let r = 3;
        light.position.set(2.5, 3, 4, );
        light.castShadow = true;
        light.shadow.mapSize.width = 1024 * 4;
        light.shadow.mapSize.height = 1024 * 4;
        light.shadow.camera.top = r;
        light.shadow.camera.right = r;
        light.shadow.camera.left = -r;
        light.shadow.camera.bottom = -r;
        light.shadow.camera.near = 3;
        light.shadow.camera.far = 8;
        light.shadow.radius = 3;
        light.shadow.bias = -0.001;
        scene.add(light);

        const lightHelper = new THREE.CameraHelper( light.shadow.camera );
        lightHelper.visible = false;
        scene.add( lightHelper );
        
        const lightsFolder = gui.addFolder('Lights')
        lightsFolder.open()
        lightsFolder.add( lightHelper, 'visible' ).name("Light helper box");
        lightsFolder.add( light, 'intensity', 0, 1, 0.01 ).name("Directional light int.");
        lightsFolder.add( ambientLight, 'intensity', 0, 1, 0.01 ).name("Ambient light int.");
        lightsFolder.add( tweakable_params, 'toggleShadows' ).name("Show shadows");


        // const planeGeom = new THREE.PlaneGeometry( 8, 8 );
        // const planeMaterial = new THREE.MeshStandardMaterial( {color: 0xbdbdbd, side: THREE.DoubleSide} );
        // const plane = new THREE.Mesh( planeGeom, planeMaterial );
        // plane.rotation.x = Math.PI/2;
        // plane.position.y = -0.01;
        // plane.receiveShadow = true;
        // scene.add( plane );





        const material = new THREE.MeshStandardMaterial({
            color: blockColor,
            opacity: .5,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);
        gltfLoader.load(
            'campus_minimal4/campus_minimal/campus.gltf',
            (gltf) => {

                importedGLTF = gltf.scene;
                console.log(importedGLTF)
                recursiveSetShadow(importedGLTF, 'hide')
                recursiveSetShadow(importedGLTF)
                scene.add(importedGLTF)
            }
        )



        // You are going to want to watch out for scaling and positioning of the
        // objects if you feel like it didn't load but you still don't get errors
        window.addEventListener("resize", (event) => {
            sizes.width = window.innerWidth ;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        });



        /**
         * Animate
         */
        const tick = () => {
            // You can't update the camera if you call constrols update on the orbit control in the tick function
            controls.update();
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
        }
        tick()
    }
}


function recursiveSetShadow(three_obj, hide){
    if(three_obj.hasOwnProperty('castShadow')){
        three_obj.castShadow = hide ? false : (!three_obj.castShadow);
    }
    if(three_obj.hasOwnProperty('receiveShadow')){
        three_obj.receiveShadow = hide ? false : (!three_obj.receiveShadow);
    }
    if ( three_obj.hasOwnProperty('children') && three_obj.children.length > 0 ){ 
        three_obj.children.forEach(element => {
            recursiveSetShadow(element, hide);
        }); 
    }
}


// init
window.addEventListener('load', () => {
    init();
    document.getElementById('example-nav').innerHTML=
        `
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header">
                <h6 class="d-inline mb-0">
                    ${projectName} project&nbsp;
                </h6>
                <small>
                    <a class="nav-link d-inline p-0" href="/examples/${projectName.toLowerCase()}/src/script.js">
                        (src)
                    </a>
                </small>
            </div>
            <div class="card-body py-2">
                <a class="nav-link p-0" href="/">
                    &#60;&#60; back
                </a>
            </div>
        </div>
        `
    ;
});
