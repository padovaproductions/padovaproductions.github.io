import { Group, CubeTextureLoader } from 'three';
import { recursiveAddShadow } from './_helpers';
import { grey2_Material } from './_materials';
// import { buildingMaterial, grey1_Material, grey2_Material, addBuildingOpacityToGUI } from './_materials';





export function handleImportedObject( gltf, scene ){

    console.log( gltf );
    scene.add(gltf.scene);


    return true;
}