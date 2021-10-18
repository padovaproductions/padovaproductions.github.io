import { Vector2 } from 'three';


export function handleImportedObject( gltf, scene, sizes, renderer, camera ){

  

    console.log( gltf );
    scene.add(gltf.scene);
    renderer.render(scene, camera);
    
    return true;
}