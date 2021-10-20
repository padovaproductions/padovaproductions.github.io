import { AmbientLight, DirectionalLight, CameraHelper, Color } from 'three'



export function initLights( scene, gui, guiVariables ){
    const r = 4;
    const mapSizeFactor = 2;

    const lightColor = new Color( 0xfff9ee );

    console.log(lightColor)

    const ambientLight = new AmbientLight( lightColor, .23 );
    scene.add( ambientLight );

    const light = new DirectionalLight( lightColor, 1.73);
    light.position.set( 5, 2.6, 6 );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024 * mapSizeFactor; 
    light.shadow.mapSize.height = 1024 * mapSizeFactor; 
    light.shadow.camera.top = r;
    light.shadow.camera.right = r;
    light.shadow.camera.left = -r;
    light.shadow.camera.bottom = -r;
    light.shadow.camera.near = 3;
    light.shadow.camera.far = 13;
    light.shadow.radius = 9;
    light.shadow.bias = -0.008;
    scene.add(light);

    const lightHelper = new CameraHelper( light.shadow.camera );
    lightHelper.visible = false;
    scene.add( lightHelper );

    
    const lightsFolder = gui.addFolder('Lights');
    lightsFolder.open();
    lightsFolder.add( lightHelper, 'visible' ).name("Light helper");
    lightsFolder.add( ambientLight, 'intensity', 0, 2, 0.01 ).name("Ambient light");
    lightsFolder.add( light, 'intensity', 0, 2, 0.01 ).name("Directional light");
    lightsFolder.addColor(guiVariables, 'lightColor').name("Light color").onChange( (value) => {
        ambientLight.color.setHex(value);
        light.color.setHex(value);
    });
}