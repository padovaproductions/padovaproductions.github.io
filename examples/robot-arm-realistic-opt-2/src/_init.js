import './style.css';
import { Scene } from 'three';
import { initLights } from './_lights';
import { initRenderer } from './_renderer';
import { initCamera } from './_camera';
import { handleImportedObject } from './_importHandler'
import { initGLTFLoader } from './_GLTFloader'
import Stats from 'three/examples/jsm/libs/stats.module';



export function initThree( projectName ) {
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        
        
        const sizes = { width: window.innerWidth, height: window.innerHeight }
        const scene = new Scene();
        const camera = initCamera( sizes );
        const renderer = initRenderer( canvas, sizes );
        initLights( scene );
        const gltfLoader = initGLTFLoader();
        

        gltfLoader.load(
            'new_robo_4/new_robo.gltf',
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

            
        let fpsToggler = 0;
        document.addEventListener('keydown', (e) => {
            if( e.code == "KeyF" ){
                fpsToggler = ( fpsToggler === 0 ? false : 0 );
                stats.showPanel( fpsToggler );
            }
        });

        
        const stats = Stats();
        document.body.appendChild(stats.dom)
        
        const tick = () => {
            stats.update();
            
            window.requestAnimationFrame(tick);
        }
        tick();
    }
}