import './style.css';
import * as THREE from 'three';
import { addNavPanel } from './_helpers';
import { initControls } from './_controls';
import { initLights } from './_lights';
import { initRenderer } from './_renderer';
import { initCamera } from './_camera';
import { initGUI } from './_datGUI';
import { handleImportedObject } from './_importHandler'
import { initGLTFLoader } from './_GLTFloader'



export function initThree( projectName ) {
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        const sizes = { width: window.innerWidth, height: window.innerHeight }
        const scene = new THREE.Scene();
        const gui = initGUI();
        const camera = initCamera( sizes );
        const renderer = initRenderer( canvas, sizes );
        const controls = initControls(camera, canvas, gui);
        initLights( scene, gui );
        const gltfLoader = initGLTFLoader();
        gltfLoader.load(
            'padova-logo-v1-w-plane.gltf',
            (gltf) => {

                handleImportedObject(gltf, scene, gui);

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

        /**
         * Animate
         */
        const tick = () => {
            controls.update();
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
        }
        tick()


        
        addNavPanel( 'example-nav', projectName );
    }
}