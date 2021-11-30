import './style.css';
import { Scene } from 'three';
import { initLights } from './_lights';
import { initRenderer } from './_renderer';
import { initCamera } from './_camera';
import { handleImportedObject } from './_importHandler';
import { initGLTFLoader } from './_GLTFloader';
import { initControls } from './_controls'; 






export function initThree( ) {
    const canvas = document.getElementById('three-canvas');
    if( canvas != null ){
        
        
        const sizes = { width: window.innerWidth, height: window.innerHeight }
        const scene = new Scene();
        const camera = initCamera( sizes );
        const renderer = initRenderer( canvas, sizes );
        const controls = initControls( camera, canvas);
        initLights( scene );
        const gltfLoader = initGLTFLoader();
        

        gltfLoader.load(
            'helicopter.glb',
            (gltf) => {
                handleImportedObject(gltf, scene, sizes, renderer, camera );
            }
        );


        window.addEventListener("resize", (event) => {
            sizes.width = window.innerWidth ;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.render(scene, camera);
            // console.log(camera.position);
        });

        
        const tick = () => {

            controls.update();

            renderer.render( scene, camera );

            window.requestAnimationFrame(tick);
        }
        tick();
    }
}