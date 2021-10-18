import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { addNavPanel } from './_helpers'


let camera, scene, renderer, sphere, material, gui;
let count = 0, cubeCamera1, cubeCamera2, cubeRenderTarget1, cubeRenderTarget2, renderTargetSize = 256;
let onPointerDownPointerX, onPointerDownPointerY, onPointerDownLon, onPointerDownLat;
let lon = 0, lat = 0, phi = 0, theta = 0;

const textureLoader = new THREE.TextureLoader();
textureLoader.load( '360_test.png', function ( texture ) {
    texture.encoding = THREE.sRGBEncoding;
    texture.mapping = THREE.EquirectangularReflectionMapping;

    init( texture );
    animate();
    addNavPanel( 'example-nav', 'Interior 360' );
} );

function init( texture ) {


    // Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );


    // Scene
    scene = new THREE.Scene();
    scene.background = texture;


    // Camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );

    cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget( renderTargetSize, {
        format: THREE.RGBFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
        encoding: THREE.sRGBEncoding // temporary -- to prevent the material's shader from recompiling every frame
    } );
    cubeCamera1 = new THREE.CubeCamera( 1, 1000, cubeRenderTarget1 );

    cubeRenderTarget2 = new THREE.WebGLCubeRenderTarget( renderTargetSize, {
        format: THREE.RGBFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
        encoding: THREE.sRGBEncoding
    } );
    cubeCamera2 = new THREE.CubeCamera( 1, 1000, cubeRenderTarget2 );

    
    // Material
    material = new THREE.MeshBasicMaterial( {
        envMap: cubeRenderTarget2.texture,
        combine: THREE.MultiplyOperation,
        reflectivity: 1
    } );

    sphere = new THREE.Mesh( new THREE.IcosahedronGeometry( 20, 8 ), material );
    sphere.visible = false;
    scene.add( sphere );

    const gui = new GUI();
    gui.add(sphere, 'visible').name("Sphere visible");
    gui.open();

    
    // Event listeners
    document.addEventListener( 'pointerdown', onPointerDown );
    document.addEventListener( 'wheel', onDocumentMouseWheel );
    window.addEventListener( 'resize', onWindowResized );
}

function onWindowResized() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function onPointerDown( event ) {
    event.preventDefault();

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

    document.addEventListener( 'pointermove', onPointerMove );
    document.addEventListener( 'pointerup', onPointerUp );
}

function onPointerMove( event ) {
    lon = onPointerDownLon - ( event.clientX - onPointerDownPointerX ) * 0.2;
    lat = onPointerDownLat - ( event.clientY - onPointerDownPointerY ) * 0.2;
}

function onPointerUp() {
    document.removeEventListener( 'pointermove', onPointerMove );
    document.removeEventListener( 'pointerup', onPointerUp );
}

function onDocumentMouseWheel( event ) {
    const fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.MathUtils.clamp( fov, 30, 90 );
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.MathUtils.degToRad( 90 - lat );
    theta = THREE.MathUtils.degToRad( lon );

    camera.position.x = 100 * Math.sin( phi ) * Math.cos( theta );
    camera.position.y = 100 * Math.cos( phi );
    camera.position.z = 100 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( scene.position );

    // pingpong
    if ( count % 2 === 0 ) {
        cubeCamera1.update( renderer, scene );
        material.envMap = cubeRenderTarget1.texture;
    } else {
        cubeCamera2.update( renderer, scene );
        material.envMap = cubeRenderTarget2.texture;
    }
    count ++;

    renderer.render( scene, camera );
}