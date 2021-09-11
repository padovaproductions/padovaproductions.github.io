import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { liftLevels, showRooms, hideRooms, resetPositions, addNavPanel, showLayoutView, highlightLevel } from './_helpers';
import { initControls } from './_controls';
import { initLights } from './_lights';
import { initRenderer } from './_renderer';
import { initCamera } from './_camera';
import { initGUI, guiVariables } from './_datGUI';
import { handleImportedObject } from './_importHandler'



export function initThree( projectName ) {
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        let modell = {};
        let levelsArray = [];
        let roomsArray = [];
        const sizes = { width: window.innerWidth, height: window.innerHeight }
        const scene = new THREE.Scene();
        const gui = initGUI();
        const camera = initCamera( sizes );
        const renderer = initRenderer( canvas, sizes );
        const controls = initControls(camera, canvas, gui);
        initLights( scene, modell, gui, guiVariables );




        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);
        gltfLoader.load(
            'campus_minimal_6/campus_minimal/campus.gltf',
            (gltf) => {

                handleImportedObject(gltf, scene, modell, roomsArray, levelsArray);

            }
        )



        window.addEventListener("resize", (event) => {
            sizes.width = window.innerWidth ;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            // console.log(camera.position)
        });
        


        const levellHighlightButtons = document.getElementsByClassName('highlight-level');
        Array.from(levellHighlightButtons).forEach(function(button) {
            button.onclick = function() { 
                highlightLevel(levelsArray, modell[this.dataset.floor].uuid)
            }
        });

        document.getElementById('liftLevels').onclick = () => { 
            liftLevels( levelsArray ); 
            showRooms( roomsArray );
        }

        document.getElementById('layoutView').onclick = () => { 
            showLayoutView( levelsArray );
            showRooms( roomsArray );
        }

        document.getElementById('resetPositions').onclick = () => { 
            resetPositions( levelsArray );
            setTimeout(()=>{
                hideRooms( roomsArray );
            },1000);
        }


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