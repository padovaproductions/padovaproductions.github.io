import { AmbientLight, DirectionalLight, CameraHelper, Color } from 'three'
import { recursiveAddShadow } from './_helpers'

// Sunrise color: #E67E22

export function initLights( scene, modell, gui, guiVariables ){
    const ambientLight = new AmbientLight( 0xffffff, .78 );
    scene.add( ambientLight );

    const light = new DirectionalLight(0xffffff, .62);
    let r = 3;
    const initLightPosRotation = 0.4; // Range: [-1, 1]
    const initLightPos = {
        x: Math.sin( (initLightPosRotation) * Math.PI) * 4,
        z: Math.cos( (initLightPosRotation) * Math.PI) * 4,
    };
    light.position.set( initLightPos.x, 3, initLightPos.z );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024 * 4;
    light.shadow.mapSize.height = 1024 * 4;
    light.shadow.camera.top = r;
    light.shadow.camera.right = r;
    light.shadow.camera.left = -r;
    light.shadow.camera.bottom = -r;
    light.shadow.camera.near = 3;
    light.shadow.camera.far = 8;
    light.shadow.radius = 3;
    light.shadow.bias = -0.001;
    scene.add(light);

    const lightHelper = new CameraHelper( light.shadow.camera );
    lightHelper.visible = false;
    scene.add( lightHelper );
    
    const lightsFolder = gui.addFolder('Lights')
    lightsFolder.open()
    lightsFolder.add( lightHelper, 'visible' ).name("Light helper box");
    lightsFolder.add( guiVariables, 'allowShadows' ).name("Show shadows").onChange( (value) => {
        for (const key in modell) {
            recursiveAddShadow(modell[key], value)
        }
    });
    lightsFolder.add( light, 'intensity', 0, 1, 0.01 ).name("Directional light int.");
    lightsFolder.add( ambientLight, 'intensity', 0, 1, 0.01 ).name("Ambient light int.");
    lightsFolder.add( guiVariables, 'lightRotation', -1, 1, 0.01 ).name("Light rotation").setValue(initLightPosRotation).onChange( (value) => {
        light.position.x = Math.sin(value * Math.PI) * 4;
        light.position.z = Math.cos(value * Math.PI) * 4;
    });
    lightsFolder.add( guiVariables, 'sunset', /*0*/ 25, /*100*/ 75, 1 ).name("Sunset").setValue(-(initLightPosRotation*50)+50).onChange( (value) => {
        light.color = new Color(`hsl(30, ${value}%, ${(100 - value)*2}%)`);

        // convert [0, 100] range to [-1, 1]
        let rotVal = (value - 50)/50;
        light.position.x = Math.sin(-rotVal * Math.PI) * 4;
        light.position.z = Math.cos(-rotVal * Math.PI) * 4;
    });
}