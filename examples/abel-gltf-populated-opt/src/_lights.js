import { AmbientLight, DirectionalLight, CameraHelper, Color } from 'three'
import { recursiveAddShadow } from './_helpers'

// Sunrise color: #E67E22

export function initLights( scene, modell, gui, guiVariables ){
    const ambientLight = new AmbientLight( 0xffffff, .78 );
    scene.add( ambientLight );

    const light = new DirectionalLight(new Color("hsl(30, 0%, 100%)"), .62);
    let r = 4;
    const initLightPosRotation = 0.4; // Range: [-1, 1]
    const initLightPos = {
        x: Math.sin( (initLightPosRotation/2) * Math.PI) * 4,
        y: 2.2 + 1.5*(Math.cos( initLightPosRotation * Math.PI)),
        z: Math.cos( (initLightPosRotation/2) * Math.PI) * 4,
    };
    light.position.set( initLightPos.x, initLightPos.y, initLightPos.z );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024 * 4; // Perfomance heavy
    light.shadow.mapSize.height = 1024 * 4; // Perfomance heavy
    light.shadow.camera.top = r;
    light.shadow.camera.right = r;
    light.shadow.camera.left = -r;
    light.shadow.camera.bottom = -r;
    light.shadow.camera.near = 2;
    light.shadow.camera.far = 8;
    light.shadow.radius = 3;
    light.shadow.bias = -0.0019;
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
    lightsFolder.add( guiVariables, 'lightRotation', -1, 1, 0.01 ).name("Light direction").setValue(initLightPosRotation).onChange( (value) => {
        light.position.x = Math.sin(value * Math.PI) * 4;
        light.position.z = Math.cos(value * Math.PI) * 4;
    });
    lightsFolder.add( guiVariables, 'sunset', /*0*/ 6, /*100*/ 97, 1 ).name("Sunset").setValue(-(initLightPosRotation*50)+50).onChange( (value) => {
        const offset = 75;
        const HSLbaseValue = (value - offset)*4;
        if( value >= offset && value <= 100 ){
            light.color.setHSL( /*30/360*/ 0.08, HSLbaseValue/100, (100-(HSLbaseValue/2))/100 );
        }

        // convert [0, 100] range to [-1, 1]
        let rotVal = (value - 50)/50;
        light.position.x = Math.sin(-rotVal/2 * Math.PI) * 4;
        light.position.y = 2.2 + 1.2*(Math.cos( -rotVal * Math.PI));
        light.position.z = Math.cos(-rotVal/2 * Math.PI) * 4;
    });
}