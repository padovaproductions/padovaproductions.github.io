import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

/**
 *  Created based on the following sources:
 *  https://threejsfundamentals.org/threejs/lessons/threejs-transparency.html
 *  https://jsfiddle.net/u63Lx2hf/
 */





function main() {
    const canvas = document.querySelector('.webgl');
    if( canvas != null ){
        const blockColor = 0x5DADE2;
        const blockHoverColor = 0xFFDB4B;
        const containerColor = 0xEEEEEE;
        
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        let INTERSECTED = null;

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
        camera.position.set(3.3, 4.2, 7.25)

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
        

        /**
         * Scene
         */
        const scene = new THREE.Scene();


        
        /**
         * Lights
         */
        function addLight(x, y, z) {
            const light = new THREE.DirectionalLight(0xFFFFFF, 1);
            light.position.set(x, y, z);
            scene.add(light);
        }
        addLight(-1,  2,  4);
        addLight( 1, -1, -2);


        const geometry = new THREE.BoxGeometry(1, 1, 1);

        function makeBox(geometry, color, x, y, z, data) {
            [THREE.BackSide, THREE.FrontSide].forEach((side) => {
                const material = new THREE.MeshPhongMaterial({
                    color,
                    opacity: 0.5,
                    transparent: true,
                    side,
                });
            
                const cube = new THREE.Mesh(geometry, material);
                cube.userData = { 
                    name: data,
                };
                scene.add(cube);
            
                cube.position.set(x, y, z);
            });
        }

        const d = 0.55;
        const rooms = [
            [geometry, blockColor,-d, -d, -d, "Livingroom"],
            [geometry, blockColor, d, -d, -d, "Diningroom"],
            [geometry, blockColor,-d,  d, -d, "Hall"],
            [geometry, blockColor, d,  d, -d, "Bathroom"],
            [geometry, blockColor,-d, -d,  d, "Kitchen"],
            [geometry, blockColor, d, -d,  d, "Bedroom 1"],
            [geometry, blockColor,-d,  d,  d, "Bedroom 2"],
            [geometry, blockColor, d,  d,  d, "Garage"],
        ]
        rooms.forEach( (room) => {
            makeBox(...room);
        });


        window.addEventListener("resize", () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        });


        
        document.addEventListener('mousemove', (event) => {
            
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            
            raycaster.setFromCamera( mouse, camera );
            const intersects = raycaster.intersectObjects( scene.children );
            
            
            if (intersects.length > 0) {
                if ( intersects[0].object != INTERSECTED ) {
                    console.log(intersects[0].object.userData.name)
                    intersects[0].object.material.color.set( blockHoverColor );
                    if (INTERSECTED){
                        INTERSECTED.material.color.set(blockColor);
                    }
                    INTERSECTED = intersects[0].object;
                }
            } else {
                if (INTERSECTED){
                    INTERSECTED.material.color.set(blockColor);
                    INTERSECTED = null;
                }
            }
        });


        const tick = () => {
            controls.update();
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
        }
        tick()

    }
}

main();
