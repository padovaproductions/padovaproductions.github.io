import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

/**
 *  Created based on the following sources:
 *  https://threejsfundamentals.org/threejs/lessons/threejs-transparency.html
 *  https://jsfiddle.net/u63Lx2hf/
 */


const projectName = "Fox";


function main() {
    const canvasWrapper = document.getElementById('three-canvas-wr')
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        const blockColor = 0x5DADE2;
        const blockHoverColor = 0xFFDB4B;
        const containerColor = 0xEEEEEE;
        

        const scene = new THREE.Scene();
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        let mixer = null;

        let INTERSECTED = [false, false];

        const sizes = {
            width: canvasWrapper.offsetWidth,
            height: canvasWrapper.offsetHeight,
        }


        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
        camera.position.set(-6, 10, 10)

        /**
         * Controls
         */
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;

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
        const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
        scene.add( ambientLight );

        const light = new THREE.DirectionalLight(0xffffff, .5);
        light.position.set(2, 5, 6);
        light.castShadow = true;
        light.shadow.mapSize.width = 1024 * 2;
        light.shadow.mapSize.height = 1024 * 2;
        light.shadow.camera.top = 6;
        light.shadow.camera.right = 6;
        light.shadow.camera.left = -6;
        light.shadow.camera.bottom = -6;
        light.shadow.camera.near = 3;
        light.shadow.camera.far = 13;
        light.shadow.radius = 6;
        scene.add(light);

        // const helper = new THREE.CameraHelper( light.shadow.camera );
        // scene.add( helper );


        const planeGeom = new THREE.PlaneGeometry( 8, 8 );
        const planeMaterial = new THREE.MeshStandardMaterial( {color: 0xbdbdbd, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( planeGeom, planeMaterial );
        plane.rotation.x = Math.PI/2;
        plane.position.y = -0.01;
        plane.receiveShadow = true;
        scene.add( plane );




        
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
            // 'BoxTextured/BoxTextured.gltf',
            'Fox/Fox.gltf',
            (gltf) => {

                mixer = new THREE.AnimationMixer(gltf.scene)
                const action = mixer.clipAction(gltf.animations[1])
                action.play()

                console.log(gltf)
                gltf.scene.scale.set(.03, .03, .03)
                // gltf.scene.children[0].children[1].material = material;
                gltf.scene.children[0].children[1].castShadow = true
                scene.add(gltf.scene)
            }
        )

        // You are going to want to watch out for scaling and positioning of the 
        // objects if you feel like it didn't load but you still don't get errors


        window.addEventListener("resize", (event) => {
            sizes.width = canvasWrapper.offsetWidth;
            sizes.height = canvasWrapper.offsetHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        });



        /**
         * Animate
         */
        const clock = new THREE.Clock()
        let previousTime = 0;

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime
        
            // Model animation
            if(mixer)
            {
                mixer.update(deltaTime)
            }
            
            controls.update();
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
        }
        tick()

    }
}


// init
window.addEventListener('load', () => {
    main();
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
