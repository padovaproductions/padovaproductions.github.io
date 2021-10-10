import './style.css';
import * as THREE from 'three';
import { liftLevels, liftAllLevels, resetPositions, addNavPanel } from './_helpers';
import { initControls } from './_controls';
import { initLights } from './_lights';
import { initRenderer } from './_renderer';
import { initCamera } from './_camera';
import { initGUI, guiVariables } from './_datGUI';
import { handleImportedObject } from './_importHandler'
import { initGLTFLoader } from './_GLTFloader'
import gsap from 'gsap'
import Stats from 'three/examples/jsm/libs/stats.module';
import { grey2_Material } from './_materials';



export function initThree( projectName ) {
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        
        const sizes = { width: window.innerWidth, height: window.innerHeight }
        const raycaster = new THREE.Raycaster()
        const scene = new THREE.Scene();
        const gui = initGUI();
        const camera = initCamera( sizes );
        const renderer = initRenderer( canvas, sizes );
        const controls = initControls(camera, canvas, gui);
        initLights( scene );
        const gltfLoader = initGLTFLoader();
        gltfLoader.load(
            'red-swamp.glb',
            (gltf) => {

                handleImportedObject(gltf, scene);

            }
        );



        window.addEventListener("resize", (event) => {
            sizes.width = window.innerWidth ;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            // console.log(camera.position)
        });
        

        const stats = Stats()
        document.body.appendChild(stats.dom)
        /**
         * Animate
         * If there's less animation, the it's probably enough to call re-render on events only:
         * https://threejsfundamentals.org/threejs/lessons/threejs-rendering-on-demand.html
         */
        const tick = () => {
            stats.update();
            controls.update();
            renderer.render(scene, camera);

            
            window.requestAnimationFrame(tick);
        }
        tick();


        
        addNavPanel( 'example-nav', projectName );
    }
}