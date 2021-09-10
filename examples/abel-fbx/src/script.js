import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from 'dat.gui';
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


const projectName = "Abel-FBX";
let modell = {};


function init() {
    const canvasWrapper = document.getElementById('three-canvas-wr')
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        const blockColor = 0x5DADE2;
        const blockHoverColor = 0xFFDB4B;
        const containerColor = 0xD6D6D6;
        const treeColor = 0x117A65;


        const scene = new THREE.Scene();
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        let INTERSECTED = [false, false];

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
        // camera.position.set(8,4,4);
        camera.position.set(-4.5, 2.1, -4.2);
        

        const tweakable_params = {
            blockColor,
            blockHoverColor,
            containerColor, 
            toggleShadows: ()=>{
                recursiveSetShadow(modell)
            },
            lightRotation: 0,
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
        const ambientLight = new THREE.AmbientLight( 0xffffff, .78 );
        scene.add( ambientLight );

        const light = new THREE.DirectionalLight(0xffffff, .62);
        let r = 3;
        const initLightPosRotation = -0.28;
        const initLightPos = {
            x: Math.sin( (initLightPosRotation) * Math.PI) * 4,
            z: Math.cos( (initLightPosRotation) * Math.PI) * 4,
        };
        light.position.set( initLightPos.x, 3, initLightPos.z );
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
        lightsFolder.add( tweakable_params, 'lightRotation', -1, 1, 0.01 ).name("Light rotation").setValue(initLightPosRotation).onChange( (value) => {
            light.position.x = Math.sin(value * Math.PI) * 4;
            light.position.z = Math.cos(value * Math.PI) * 4;
        });
        lightsFolder.add( tweakable_params, 'toggleShadows' ).name("Show shadows");


        // const planeGeom = new THREE.PlaneGeometry( 8, 8 );
        // const planeMaterial = new THREE.MeshStandardMaterial( {color: 0xbdbdbd, side: THREE.DoubleSide} );
        // const plane = new THREE.Mesh( planeGeom, planeMaterial );
        // plane.rotation.x = Math.PI/2;
        // plane.position.y = -0.01;
        // plane.receiveShadow = true;
        // scene.add( plane );





        const buildingMaterial = new THREE.MeshStandardMaterial({
            color: blockColor,
            opacity: .5,
            transparent: true,
            side: THREE.DoubleSide,
        });
        const plantMaterial = new THREE.MeshStandardMaterial({
            color: treeColor,
            opacity: 1,
            transparent: true,
            side: THREE.DoubleSide,
        });
        const grey1_Material = new THREE.MeshStandardMaterial({
            color: containerColor,
            opacity: 1,
            transparent: true,
            side: THREE.DoubleSide,
        });
        const grey2_Material = new THREE.MeshStandardMaterial({
            color: 0xD0D0D0,
            opacity: 1,
            transparent: true,
            side: THREE.DoubleSide,
        });

        
        const buildingFolder = gui.addFolder('Building')
        buildingFolder.open()
        buildingFolder.add( buildingMaterial, 'opacity', .1, 1, 0.1 ).name("Walls opacity");

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);
        gltfLoader.load(
            'campus_minimal_5/campus.gltf',
            (gltf) => {

                const importCopy = gltf.scene;
                modell['trees'] = importCopy.children[0];
                modell['building_base'] = importCopy.children[1];
                modell['park'] = importCopy.children[2];
                modell['paths_topo'] = importCopy.children[3];
                modell['lake'] = importCopy.children[4];
                modell['floor_0'] = importCopy.children[5];
                modell['floor_1'] = importCopy.children[6];
                modell['floor_2'] = importCopy.children[8];
                modell['floor_3'] = importCopy.children[7];
                modell['room_1'] = importCopy.children[10];
                modell['room_2'] = importCopy.children[9];
                
                    
                // Environment mods
                modell['park'].material = grey2_Material;
                [ modell['building_base'], modell['paths_topo'] ].forEach(el => {
                    el.material = grey1_Material;
                });
                modell['trees'].children.forEach(el => {
                    el.material = grey2_Material;
                });

                // Building mods
                let round = 1;
                [
                    modell['floor_0'], 
                    modell['floor_1'], 
                    modell['floor_2'], 
                    modell['floor_3']
                ].forEach(element => {
                    element.material = buildingMaterial
                    element.position.y = element.position.y + (0.001 * round);
                    round++;
                });
                

                modell['room_1'].visible = false
                modell['room_2'].visible = false
                modell['room_1'].material = buildingMaterial
                modell['room_2'].material = buildingMaterial
                recursiveSetShadow(modell, 'hide')
                recursiveSetShadow(modell)

                console.log(modell);
                for (const key in modell) {
                    recursiveSetShadow(modell[key], 'hide')
                    recursiveSetShadow(modell[key])
                    scene.add(modell[key])
                }
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
            // console.log(camera.position)
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



function liftLevels(){
    [ modell['floor_0'], modell['floor_1'], modell['floor_2'], modell['floor_3']].forEach(el => {
        gsap.to( el.position, { y: (el.position.y * 3) + .25 , duration: 1})
    });
}

function showRooms(){
    modell['room_1'].visible = true
    modell['room_2'].visible = true
}

document.getElementById('liftLevels').onclick = () => { 
    liftLevels(); 
    showRooms();
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
