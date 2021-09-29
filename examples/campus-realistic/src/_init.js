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
import { initSky } from './_sky'
import gsap from 'gsap'
import Stats from 'three/examples/jsm/libs/stats.module';
import { grey2_Material } from './_materials';



export function initThree( projectName ) {
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        let cornerRoom = {};
        let modell = {};
        let levelsArray = [];
        let roomsArray = [];
        const points = [
            {
                position: new THREE.Vector3(-48, 50, -110),
                element: document.querySelector('.point-1'),
            },
            {
                position: new THREE.Vector3(-100, 39, -20),
                element: document.querySelector('.point-2'),
            },
            {
                position: new THREE.Vector3(15, 50, 88),
                element: document.querySelector('.point-3'),
            },
            {
                position: new THREE.Vector3(96, 40, -85),
                element: document.querySelector('.point-4'),
            },
        ];
        const markerLines = [];
        let grassMaterial;
        let grass;
        const sizes = { width: window.innerWidth, height: window.innerHeight }
        const raycaster = new THREE.Raycaster()
        const scene = new THREE.Scene();
        const gui = initGUI();
        const camera = initCamera( sizes );
        const renderer = initRenderer( canvas, sizes );
        const controls = initControls(camera, canvas, gui);
        initLights( scene, modell, gui, guiVariables );
        let sky, sun;
        initSky(sky, sun, gui, scene, renderer, camera);
        const gltfLoader = initGLTFLoader();
        gltfLoader.load(
            'campus_web_basic_trees/campus_web_test.gltf',
            (gltf) => {

                handleImportedObject(gltf, scene, modell, roomsArray, levelsArray, cornerRoom, gui);


                grass = gltf.scene.getObjectByName('ground_2')
                grassMaterial = grass.material.clone();
                grass.material = grey2_Material;


                const material = new THREE.LineBasicMaterial({
                    color: 0x000000
                });
                const reusableVector3 = new THREE.Vector3();
                points.forEach(point => {
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints( [
                        point.position, 
                        reusableVector3.set(point.position.x, 0, point.position.z)
                    ]);
                    const line = new THREE.Line( lineGeometry, material );
                    line.visible = false;
                    markerLines.push(line);
                    scene.add( line );
                });

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

        function toggleMarkers(){
            for(const point of points){
                point.element.classList.toggle('visible');
            }
            markerLines.forEach(line => {
                line.visible = !line.visible;
            });
        }
        document.getElementById('toggleMarkers').onclick = () => { 
            toggleMarkers();
        }
        
        document.getElementById('toggleGrass').onclick = () => { 
            if( grass.material == grassMaterial ){
                grass.material = grey2_Material; 
            }else{  
                grass.material = grassMaterial;
            }
        }
        

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

            
            for(const point of points){
                const screenPosition = point.position.clone();
                screenPosition.project(camera);
        
                const translateX = screenPosition.x * sizes.width * 0.5;
                const translateY = - screenPosition.y * sizes.height * 0.5;
                point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;    
            
            }
            window.requestAnimationFrame(tick);
        }
        tick();


        
        addNavPanel( 'example-nav', projectName );
    }
}