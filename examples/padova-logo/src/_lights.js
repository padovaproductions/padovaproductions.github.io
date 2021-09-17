import { AmbientLight, DirectionalLight, CameraHelper } from 'three';
import gsap from 'gsap';


export function initLights( scene, gui ){
    const initRotation = 0.29;
    const lightGUIvars = {
        lightRotation: initRotation,
    }
    const lightInitialPos = {
        x: Math.sin(initRotation * Math.PI) * 8.75,
        y: 3.6,
        z: Math.cos(initRotation * Math.PI) * 8.75,
    }


    const ambientLight = new AmbientLight( 0xffffff, .78 );
    scene.add( ambientLight );

    const light = new DirectionalLight(0xffffff, .62);
    let r = 6;
    light.position.set( lightInitialPos.x, lightInitialPos.y, lightInitialPos.z );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024 * 4;
    light.shadow.mapSize.height = 1024 * 4;
    light.shadow.camera.top = r;
    light.shadow.camera.right = r;
    light.shadow.camera.left = -r;
    light.shadow.camera.bottom = -r;
    light.shadow.camera.near = 3;
    light.shadow.camera.far = 16;
    light.shadow.radius = 3;
    light.shadow.bias = -0.001;
    scene.add(light);


    const lightsFolder = gui.addFolder('Lights')
    lightsFolder.open()
    lightsFolder.add( light.position, 'x', -9, 9, 0.1 ).name("Light pos X");
    lightsFolder.add( light.position, 'y', -9, 9, 0.1 ).name("Light pos Y");
    lightsFolder.add( light.position, 'z', -9, 9, 0.1 ).name("Light pos Z");

    const lightHelper = new CameraHelper( light.shadow.camera );
    lightHelper.visible = false;
    scene.add( lightHelper );
    lightsFolder.add( lightHelper, 'visible' ).name("Light helper");
    lightsFolder.add( lightGUIvars, 'lightRotation', -0.45, 0.45, 0.01 ).name("Light direction").setValue( -0.29 ).onChange( (value) => {
        light.position.x = Math.sin(value * Math.PI) * 8.75;
        light.position.z = Math.cos(value * Math.PI) * 8.75;
    });

    gsap.to( light.position, { 
        x: Math.sin(-0.29 * Math.PI) * 8.75,
        z: Math.cos( 0.29 * Math.PI) * 8.75,
        duration: 1.1,
    });
}