import './style.css';
import * as THREE from 'three';
import { liftLevels, showRooms, hideRooms, resetPositions, addNavPanel, showLayoutView, highlightLevel } from './_helpers';
import { initControls } from './_controls';
import { initLights } from './_lights';
import { initRenderer } from './_renderer';
import { initCamera } from './_camera';
import { initGUI, guiVariables } from './_datGUI';
import { handleImportedObject } from './_importHandler'
import { initGLTFLoader } from './_GLTFloader'
import gsap from 'gsap'
import Stats from 'three/examples/jsm/libs/stats.module';



export function initThree( projectName ) {
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        let cornerRoom = {};
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
        const gltfLoader = initGLTFLoader();
        gltfLoader.load(
            'campus_11_compressed.glb',
            (gltf) => {

                handleImportedObject(gltf, scene, modell, roomsArray, levelsArray, cornerRoom, gui);

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
        
        document.getElementById('showClassroom').onclick = () => { 
            resetPositions( levelsArray );
            gsap.to( camera.position, { 
                x: -1.591,
                y: 0.5642, 
                z: 0.2915, 
                duration: 1
            });
        }

        document.getElementById('roomWalls').onclick = () => { 
            cornerRoom['room'].visible = !cornerRoom['room'].visible;
        }

        document.getElementById('resetPositions').onclick = () => { 
            resetPositions( levelsArray );
            setTimeout(()=>{
                hideRooms( roomsArray );
            },1000);
        }


        const stats = Stats()
        document.body.appendChild(stats.dom)
        /**
         * Animate
         * If there's less animation, the it's probably enough to call re-render on events only:
         * https://threejsfundamentals.org/threejs/lessons/threejs-rendering-on-demand.html
         */
        const tick = () => {
            stats.update()
            controls.update();
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
        }
        tick();


        
        addNavPanel( 'example-nav', projectName );
    }
}