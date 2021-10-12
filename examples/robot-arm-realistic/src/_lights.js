import { AmbientLight, DirectionalLight, HemisphereLight, CameraHelper, Color } from 'three'
import { guiVariables } from './_datGUI'

// Sunrise color: #E67E22

export function initLights( scene, gui ){
    let r = 2;
    const mapSizeFactor = 1;
    // const ambientLight = new AmbientLight( 0xffffff, .41 );
    // scene.add( ambientLight );



    const hemiLight = new HemisphereLight( 0xffffbb, 0xefefef, .29 );
    scene.add( hemiLight );



    const light = new DirectionalLight( 0xffffff, 1.2);
    light.position.set( 3, 3, 3 );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024 * mapSizeFactor; 
    light.shadow.mapSize.height = 1024 * mapSizeFactor; 
    light.shadow.camera.top = r;
    light.shadow.camera.right = r;
    light.shadow.camera.left = -r;
    light.shadow.camera.bottom = -r;
    light.shadow.camera.near = 3;
    light.shadow.camera.far = 15;
    light.shadow.radius = 2;
    light.shadow.bias = -0.006;
    scene.add(light);
    
    const lightHelper = new CameraHelper( light.shadow.camera );
    lightHelper.visible = false;
    scene.add( lightHelper );
    
    
    const lightsFolder = gui.addFolder('Lights')
    lightsFolder.open()
    lightsFolder.add( lightHelper, 'visible' ).name("Light helper");
    lightsFolder.add( light.position, 'x', -12, 12, 0.1 ).name("Light X");
    lightsFolder.add( light.position, 'y', -12, 12, 0.1 ).name("Light Y");
    lightsFolder.add( light.position, 'z', -12, 12, 0.1 ).name("Light Z");
    
}