import { AmbientLight, DirectionalLight, CameraHelper, Color } from 'three'
import { recursiveAddShadow } from './_helpers'

// Sunrise color: #E67E22

export function initLights( scene, modell, gui, guiVariables ){
    let r = 200;

    const ambientLight = new AmbientLight( 0xffffff, .82 );
    scene.add( ambientLight );

    const light = new DirectionalLight(new Color("hsl(30, 0%, 100%)"), .68);
    const initLightPos = {
        x: 140,
        y: 80,
        z: 100,
    };
    light.position.set( initLightPos.x, initLightPos.y, initLightPos.z );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024 * 2; // Perfomance heavy
    light.shadow.mapSize.height = 1024 * 2; // Perfomance heavy
    light.shadow.camera.top = r;
    light.shadow.camera.right = r;
    light.shadow.camera.left = -r;
    light.shadow.camera.bottom = -r;
    light.shadow.camera.near = 0;
    light.shadow.camera.far = 440;
    light.shadow.radius = 3;
    light.shadow.bias = -0.002;
    scene.add(light);

    const lightHelper = new CameraHelper( light.shadow.camera );
    // lightHelper.visible = false;
    // scene.add( lightHelper );
    
}