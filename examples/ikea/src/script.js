import '../../../navigation-style.css'
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

/**
 *  Created based on the following sources:
 *  https://threejsfundamentals.org/threejs/lessons/threejs-transparency.html
 *  https://jsfiddle.net/u63Lx2hf/
 */





function main() {
    const canvasWrapper = document.getElementById('three-canvas-wr')
    const canvas = document.querySelector('.three-canvas');
    if( canvas != null ){
        const blockColor = 0x5DADE2;
        const blockHoverColor = 0xFFDB4B;
        const containerColor = 0xEEEEEE;
        

        const scene = new THREE.Scene();
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        // 'INTERSECTED' has to be an array of two. The reason for this is that
        // we're not just interested in the N#1 intersection, but also the N#2. 
        // This is because the given boxes in these example are actually duplicated - 
        // Rendered both front and back side - to provide proper opacity features and as that, 
        // when we want to recolor a block, then we actually want to recolor both that sit at that very place. 
        // NOTE: if you use 'THREE.DoubleSide' instead of a front and a back, then it will still be treated 
        // as 2 different intersected layers so this 'array of two' rule would still apply 
        let INTERSECTED = [false, false];


        // You got to keep the canvas in a well calculatable place on your screen 
        // If you place it to a difficult container the hover effects might fail 
        // due to mouse position counting issues 
        const sizes = {
            width: canvasWrapper.offsetWidth,
            height: canvasWrapper.offsetHeight,
        }

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
        camera.position.set(5.5, 3.5, 5.5)

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
         * Lights
         */
        const ambientLight = new THREE.AmbientLight( 0xFFFFFF, .8 ); // soft white light
        scene.add( ambientLight );

        const light = new THREE.DirectionalLight(0xFFFFFF, .7);
        light.position.set(1,1,2);
        scene.add(light);




        
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        function makeBox(geometry, color, x, y, z, data, room_description) {
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
                    room_description: room_description,
                };
                scene.add(cube);
            
                cube.position.set(x, y, z);
            });
        }

        const d = 0.501;
        const rooms = [
            [geometry, blockColor,-d, -d, -d, "Livingroom", "The largest and most spaciousliving room, the perfect place for get-togethers."],
            [geometry, blockColor, d, -d, -d, "Diningroom", "Dining room for 6 people +1 (child seat). Sunlight comes from two directions, kitchen is one step away."],
            [geometry, blockColor,-d,  d, -d, "Hall", "Just enough room to store your shoes, arrange your jackets, and help the kids get in their boots.."],
            [geometry, blockColor, d,  d, -d, "Bathroom", "2 sinks, 2 toilets, 1 bath and an extra electric towel dryer for your comfort."],
            [geometry, blockColor,-d, -d,  d, "Kitchen", "New fashoin merged with old fashion. The best equipped part of the house. An oven, a dtove, a regular frigde and a freezer. 2 bar chairs, 1 minibar. Get the cooking done with ease on the Italian import heated tiles."],
            [geometry, blockColor, d, -d,  d, "Bedroom 1", "Bedroom with a double bed and a balcony."],
            [geometry, blockColor,-d,  d,  d, "Bedroom 2", "Bedroom with 2 separate beds and 3 well placed windows."],
            [geometry, blockColor, d,  d,  d, "Garage", "The garage can host 1 average sized car, two entrances, one from the front (gate) and one from the house (regular door)."],
        ]
        rooms.forEach( (room) => {
            makeBox(...room);
        });


        window.addEventListener("resize", (event) => {
            sizes.width = canvasWrapper.offsetWidth;
            sizes.height = canvasWrapper.offsetHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        });


        
        document.addEventListener('mousemove', (event) => {
            
            mouse.x = (event.clientX / sizes.width) * 2 - 1;
            mouse.y = -(event.clientY / sizes.height) * 2 + 1;
            
            
            raycaster.setFromCamera( mouse, camera );
            const intersects = raycaster.intersectObjects( scene.children );
            
            
            if (intersects.length > 0) {
                if ( intersects[0].object != INTERSECTED[0] ) {
                    document.getElementById('room-name').innerHTML = intersects[0].object.userData.name;
                    document.getElementById('room-description').innerHTML = intersects[0].object.userData.room_description;
                    intersects[0].object.material.color.set( blockHoverColor );
                    intersects[1].object.material.color.set( blockHoverColor );
                    if (INTERSECTED[0]){
                        INTERSECTED[0].material.color.set(blockColor);
                        INTERSECTED[1].material.color.set(blockColor);
                    }
                    INTERSECTED = [
                        intersects[0].object,
                        intersects[1].object,
                    ];
                }
            } else {
                if ( INTERSECTED[0] ){
                    INTERSECTED[0].material.color.set(blockColor);
                    INTERSECTED[1].material.color.set(blockColor);
                    INTERSECTED = [false, false];
                    document.getElementById('room-name').innerHTML = "Select a room by hovering above it!";
                    document.getElementById('room-description').innerHTML = "See all the details of a selected room just by hovering your cursor above it.";
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

window.addEventListener('load', () => {
    main();
});
