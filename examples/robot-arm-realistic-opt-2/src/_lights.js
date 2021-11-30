import { AmbientLight, DirectionalLight} from 'three'



export function initLights( scene ){
    let r = 2.2;
    const mapSizeFactor = 4;
    const ambientLight = new AmbientLight( 0xffffff, .3 );
    scene.add( ambientLight );

    const light = new DirectionalLight( 0xffffff, 1.4);
    light.position.set( 3, 3, 3 );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024 * mapSizeFactor; 
    light.shadow.mapSize.height = 1024 * mapSizeFactor; 
    light.shadow.camera.top = r;
    light.shadow.camera.right = r;
    light.shadow.camera.left = -r;
    light.shadow.camera.bottom = -r;
    light.shadow.camera.near = 3;
    light.shadow.camera.far = 7;
    light.shadow.radius = 3;
    light.shadow.bias = -0.006;
    scene.add(light);
}