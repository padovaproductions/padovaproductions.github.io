import './style.css';
import * as THREE from 'three';
import { liftLevels, liftAllLevels, resetPositions, addNavPanel, recursiveAddShadow } from './_helpers';
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
import { loadBitmapTextures } from './_loadBitmapTextures';



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
        const bitmaps = loadBitmapTextures();

        const axesHelper = new THREE.AxesHelper( 1 );
        axesHelper.visible = false;
        scene.add( axesHelper );
        
        const axisFolder = gui.addFolder('Axis')
        axisFolder.open()
        axisFolder.add( axesHelper, 'visible' ).name("Axis helper");

        gltfLoader.load(
            'lower/robo_arm_low_tex.gltf',
            (gltf) => {

                handleImportedObject(gltf, scene, sizes, controls, bitmaps );

                
                const controlFolder = gui.addFolder('Controls')
                controlFolder.open();
                controlFolder.add( guiVariables, 'allowShadows' ).name("Enable shadows").onChange( (value) => {
                    recursiveAddShadow  ( gltf.scene, value );
                });
            }
        );

        





        window.addEventListener("resize", (event) => {
            sizes.width = window.innerWidth ;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            // console.log(camera.position);
        });

            
        let fpsToggler = 0;
        document.addEventListener('keydown', (e) => {
            if( e.code == "KeyF" ){
                fpsToggler = ( fpsToggler === 0 ? false : 0 );
                stats.showPanel( fpsToggler );
            }
        });

        
        document.getElementById('closeInfo').onclick = (e) => { 
            document.getElementById('infoPanel').style.display = 'none';
        }   


        const stats = Stats();
        document.body.appendChild(stats.dom)
        
        const tick = () => {
            stats.update();
            controls.update();
            renderer.render(scene, camera);
            
            window.requestAnimationFrame(tick);
        }
        tick();


        
        // addNavPanel( 'example-nav', projectName );
    }
}