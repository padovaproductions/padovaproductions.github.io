import { Group } from 'three';
import { recursiveAddShadow } from './_helpers';
import { buildingMaterial, grey1_Material } from './_materials';





export function handleImportedObject( gltf, scene, gui ){
    console.log(gltf);
    gltf.scene.children[0].material = buildingMaterial;
    gltf.scene.children[1].material = buildingMaterial;
    gltf.scene.children[2].material = grey1_Material;
    recursiveAddShadow(gltf.scene);
    scene.add(gltf.scene)
}