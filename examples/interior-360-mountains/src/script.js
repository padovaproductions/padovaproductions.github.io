import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


let camera, scene, renderer, controls;

const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('final_360_cube/');
window.addEventListener('load', () => {
    cubeTextureLoader.load( [
        'px.jpg',
        'nx.jpg',
        'py.jpg',
        'ny.jpg',
        'pz.jpg',
        'nz.jpg'
    ], function ( cubeTexture ) {
        cubeTexture.encoding = THREE.sRGBEncoding;


        init( cubeTexture );
        animate();
    } );
});


function init( cubeTexture ) {

    // Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );

    // Scene
    scene = new THREE.Scene();
    scene.background = cubeTexture;

    // Camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 0, -1 )
    camera.lookAt( scene.position );

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = .16;
    controls.rotateSpeed *= -.5;

    // Event listeners
    window.addEventListener( 'resize', onWindowResized );
    
    // handleImageUpload( cubeTexture );
}

function onWindowResized() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animate() {
    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}


// function handleImageUpload( texture ){
//     const imgPreview = document.getElementById("img-preview");
//     const chooseFile = document.getElementById("pano_image");
//     chooseFile.addEventListener("change", function () {
//         const files = chooseFile.files[0];
//         if (files) {
//             const fileReader = new FileReader();
//             fileReader.readAsDataURL(files);
//             fileReader.addEventListener("load", function () {
                
//                 imgPreview.innerHTML = '<img src="' + this.result + '" class="preview-img" />';

//                 textureLoader.load( this.result , function ( txtr ) {
//                     txtr.encoding = THREE.sRGBEncoding;
//                     txtr.mapping = THREE.EquirectangularReflectionMapping;
//                     scene.background = txtr;
//                 } );

//             });    
//         }
//     });
// }