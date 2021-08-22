import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper( 5 );
let INTERSECTED = null;
// scene.add( axesHelper );


/**
 * Base
 */

const blockColor = 0x5DADE2;
const blockHoverColor = 0xFFDB4B;
const containerColor = 0xEEEEEE;
const blockMaterialSettings = { 
    color: blockColor,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide,
};


const b1_Material = new THREE.MeshBasicMaterial(blockMaterialSettings)
const b1_Geometry = new THREE.BoxGeometry(1, 0.5, 0.5)
const b1_Mesh = new THREE.Mesh(b1_Geometry, b1_Material)
b1_Mesh.position.set(0, -0.2499, 1)
scene.add(b1_Mesh)




const b2_Material = new THREE.MeshBasicMaterial(blockMaterialSettings)
const b2_Geometry = new THREE.BoxGeometry(1,0.5, 0.5)
const b2_Mesh = new THREE.Mesh(b2_Geometry, b2_Material)
b2_Mesh.position.set(0.5, -0.2499, -.2)
scene.add(b2_Mesh)



const planeGeometry = new THREE.PlaneGeometry( 3, 3 );
const planeMaterial = new THREE.MeshBasicMaterial( {
    color: blockColor, 
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.2,
} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.501
scene.add( plane );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
camera.position.set(3.3, 4.2, 7.25)
scene.add(camera)

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
})
renderer.sortObjects = false,
renderer.setClearColor(0x000000, 0);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })


document.addEventListener('mousemove', (event) => {
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    
    
    if (intersects.length > 0) {

        if ( intersects.includes(INTERSECTED) ) {
            let geomType;
            for ( let i = 0; i < intersects.length; i ++ ) {
                let geomType = intersects[ i ].object.geometry.type;
        
                if( geomType == 'BoxGeometry' || geomType == 'BoxBufferGeometry' ){
                    if(intersects[ i ].object != INTERSECTED){
                        console.log('found new meanwhile overlapping')
                        intersects[ i ].object.material.color.set( blockHoverColor );
                        INTERSECTED.material.color.set(blockColor);
                        INTERSECTED = intersects[i].object;
                    }
                    break;   
                }
            }
        } else {
            let geomType;
            for ( let i = 0; i < intersects.length; i ++ ) {
                geomType = intersects[ i ].object.geometry.type;
        
                if( geomType == 'BoxGeometry' || geomType == 'BoxBufferGeometry' ){
                    if(INTERSECTED){            
                        INTERSECTED.material.color.set(blockColor);
                    }
                    intersects[ i ].object.material.color.set( blockHoverColor );
                    INTERSECTED = intersects[i].object;
                    break;
                }

                if( i == intersects.length - 1 && INTERSECTED){
                    INTERSECTED.material.color.set(blockColor);
                }
            }

        }
    } else {
        if (INTERSECTED){
            INTERSECTED.material.color.set(blockColor);
            INTERSECTED = null;
        }
    }

}, false);

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});


const tick = () =>
{
    // Orbit controls only need update here if damping is enabled
    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()