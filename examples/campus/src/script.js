import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from 'gsap';

/**
 *  Created based on the following sources:
 *  https://threejsfundamentals.org/threejs/lessons/threejs-transparency.html
 *  https://jsfiddle.net/u63Lx2hf/
 */


const projectName = "Campus";


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
        camera.position.set(-6, 10, 10)

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
        renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        
        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
        scene.add( ambientLight );

        const light = new THREE.DirectionalLight(0xffffff, .5);
        light.position.set(2, 5, 6);
        light.castShadow = true;
        light.shadow.mapSize.width = 1024 * 2;
        light.shadow.mapSize.height = 1024 * 2;
        light.shadow.camera.top = 6;
        light.shadow.camera.right = 6;
        light.shadow.camera.left = -6;
        light.shadow.camera.bottom = -6;
        light.shadow.camera.near = 3;
        light.shadow.camera.far = 13;
        light.shadow.radius = 6;
        scene.add(light);

        // const helper = new THREE.CameraHelper( light.shadow.camera );
        // scene.add( helper );


        const planeGeom = new THREE.PlaneGeometry( 8, 8 );
        const planeMaterial = new THREE.MeshStandardMaterial( {color: 0xbdbdbd, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( planeGeom, planeMaterial );
        plane.rotation.x = Math.PI/2;
        plane.position.y = -1.01;
        plane.receiveShadow = true;
        scene.add( plane );




        
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const boxesReference = [];

        function makeBox(geometry, color, x, y, z, roomID ) {
            [THREE.BackSide, THREE.FrontSide].forEach((side) => {
                const material = new THREE.MeshStandardMaterial({
                    color,
                    opacity: .5,
                    transparent: true,
                    side,
                });
            
                const cube = new THREE.Mesh(geometry, material);
                cube.userData = { 
                    roomID: roomID,
                    targetY: y,
                };
                cube.castShadow = true;
                cube.position.set(x, -2, z);
                boxesReference.push(cube)
                scene.add(cube);
            });
        }


        const d = 0.501;
        const rooms = [
            [geometry, blockColor,-d, -d, -d, "1", ],
            [geometry, blockColor, d, -d, -d, "2", ],
            [geometry, blockColor,-d,  d, -d, "3", ],
            [geometry, blockColor, d,  d, -d, "4", ],
            [geometry, blockColor,-d, -d,  d, "5", ],
            [geometry, blockColor, d, -d,  d, "6", ],
            [geometry, blockColor,-d,  d,  d, "7", ],
            [geometry, blockColor, d,  d,  d, "8", ],
        ]
        rooms.forEach( (room) => {
            makeBox(...room);
        });

        
        boxesReference.forEach( (box) => {
            gsap.to(box.position , {duration: 1.1, y: box.userData.targetY });
        });
        gsap.to(camera.position , {duration: 1.1, x: 10, y: 5, z: 7, } );



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
                    if(intersects[0].object.geometry.type == 'BoxGeometry'){
                        openTab( intersects[0].object.userData.roomID );
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
                    }else{      
                        if ( INTERSECTED[0] ){
                            INTERSECTED[0].material.color.set(blockColor);
                            INTERSECTED[1].material.color.set(blockColor);
                            INTERSECTED = [false, false];
                            openTab( 0 );
                        }
                    }
                }
            } else {
                if ( INTERSECTED[0] ){
                    INTERSECTED[0].material.color.set(blockColor);
                    INTERSECTED[1].material.color.set(blockColor);
                    INTERSECTED = [false, false];
                    openTab( 0 );
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


function openTab(roomID) {
    // Declare all variables
    var i, tabcontent;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("room-info-piece");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById('room-'+roomID).style.display = "block";
}


// init
window.addEventListener('load', () => {
    main();
    openTab(0);
    document.getElementById('example-nav').innerHTML= 
        `
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header">
                <h6 class="d-inline mb-0">
                    ${projectName} project&nbsp;
                </h6>
                <small>
                    <a class="nav-link d-inline p-0" href="/examples/${projectName.toLowerCase()}/src/script.js">
                        (src)
                    </a>
                </small>
            </div>
            <div class="card-body py-2">
                <a class="nav-link p-0" href="/">
                    &#60;&#60; back
                </a>
            </div>
        </div>
        `
    ;
});
