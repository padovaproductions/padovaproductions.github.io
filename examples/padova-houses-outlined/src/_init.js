import './style.css';
import { Scene } from 'three';
import { initLights } from './_lights';
import { initRenderer } from './_renderer';
import { initGUI } from './_datGUI';
import { initControls } from './_controls';
import { initCamera } from './_camera';
import { handleImportedObject } from './_importHandler'
import { initGLTFLoader } from './_GLTFloader'
import Stats from 'three/examples/jsm/libs/stats.module';
import { guiVariables } from './_datGUI';




export function initThree( projectName ) {
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        
        
        const sizes = { width: window.innerWidth, height: window.innerHeight }
        const scene = new Scene();
        const camera = initCamera( sizes );
        const gui = initGUI( );
        const renderer = initRenderer( canvas, sizes );
        initLights( scene, gui, guiVariables );
        const controls = initControls( camera, canvas )
        const gltfLoader = initGLTFLoader();
        

        gltfLoader.load(
            'houses_new_shadow/2.gltf',
            (gltf) => {
                handleImportedObject(gltf, scene, gui );
            }
        );

        window.addEventListener("resize", (event) => {
            sizes.width = window.innerWidth ;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.render(scene, camera);
            console.log(camera.position);
        });

            
        let fpsToggler = false;
        document.addEventListener('keydown', (e) => {
            if( e.code == "KeyF" ){
                fpsToggler = ( fpsToggler === 0 ? false : 0 );
                stats.showPanel( fpsToggler );
            }
        });

        
        const stats = Stats();
        stats.showPanel( false )
        document.body.appendChild(stats.dom)
        
        const tick = () => {
            stats.update();
            
            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        }
        tick();
    }
}