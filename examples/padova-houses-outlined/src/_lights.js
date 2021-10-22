import { AmbientLight, DirectionalLight, HemisphereLight, CameraHelper, Color } from 'three'



export function initLights( scene, gui, guiVariables ){
    const r = 4;
    const mapSizeFactor = 2;
    const hemiColor = 0xFFF1DA;


    const hemiLight = new HemisphereLight( 0xffffff, hemiColor, 2 );
    scene.add( hemiLight );



    const ambientLight = new AmbientLight( 0xffffff, .7 );
    scene.add( ambientLight );

    // const light = new DirectionalLight( lightColor, 1.73);
    // light.position.set( 5, 2.6, 6 );
    // light.castShadow = true;
    // light.shadow.mapSize.width = 1024 * mapSizeFactor;
    // light.shadow.mapSize.height = 1024 * mapSizeFactor;
    // light.shadow.camera.top = r;
    // light.shadow.camera.right = r;
    // light.shadow.camera.left = -r;
    // light.shadow.camera.bottom = -r;
    // light.shadow.camera.near = 3;
    // light.shadow.camera.far = 13;
    // light.shadow.radius = 9;
    // light.shadow.bias = -0.008;
    // scene.add(light);


    const lightsFolder = gui.addFolder('Lights');
    lightsFolder.open();
    lightsFolder.add( hemiLight, 'intensity', 0, 3, 0.01 ).name("Hemi light");
    lightsFolder.addColor(guiVariables, 'hemiColor').name("Hemi color").setValue(hemiColor).onChange( (value) => {
        hemiLight.groundColor.setHex(value);
    });
    lightsFolder.add( ambientLight, 'intensity', 0, 3, 0.01 ).name("Ambient light");
    lightsFolder.addColor(guiVariables, 'ambientColor').name("Ambient color").setValue(0xffffff).onChange( (value) => {
        ambientLight.color.setHex(value);
    });
}