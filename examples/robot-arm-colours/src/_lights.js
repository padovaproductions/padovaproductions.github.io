import { AmbientLight, DirectionalLight, CameraHelper, Color } from 'three'
import { guiVariables } from './_datGUI'

// Sunrise color: #E67E22

export function initLights( scene, gui ){
    let r = 4;

    const ambientLight = new AmbientLight( 0xffffff, .41 );
    scene.add( ambientLight );

    const light = new DirectionalLight(new Color("hsl(30, 0%, 100%)"), 1);
    const initLightPos = {
        x: 6,
        y: 6,
        z: 6,
    };
    light.position.set( initLightPos.x, initLightPos.y, initLightPos.z );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024 * 2; // Perfomance heavy
    light.shadow.mapSize.height = 1024 * 2; // Perfomance heavy
    light.shadow.camera.top = r;
    light.shadow.camera.right = r;
    light.shadow.camera.left = -r;
    light.shadow.camera.bottom = -r;
    light.shadow.camera.near = 3;
    light.shadow.camera.far = 18;
    light.shadow.radius = 3;
    light.shadow.bias = -0.002;
    scene.add(light);

    const lightHelper = new CameraHelper( light.shadow.camera );
    lightHelper.visible = false;
    scene.add( lightHelper );

    
    const lightsFolder = gui.addFolder('Lights')
    lightsFolder.open()
    lightsFolder.add( lightHelper, 'visible' ).name("Light helper box");
    lightsFolder.add( light, 'intensity', 0, 1, 0.01 ).name("Directional light int.");
    lightsFolder.add( ambientLight, 'intensity', 0, 1, 0.01 ).name("Ambient light int.");
    
    lightsFolder.add( guiVariables, 'lightRotation', -1, 1, 0.01 ).name("Light direction").onChange( (value) => {
        light.position.x = Math.sin(value * Math.PI) * 4;
        light.position.z = Math.cos(value * Math.PI) * 4;
    });
    lightsFolder.add( light.position, 'y', 0, 12, 0.1 ).name("Light Y");
    
}