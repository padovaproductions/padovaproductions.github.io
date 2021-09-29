import { Group, CubeTextureLoader } from 'three';
import { recursiveAddShadow } from './_helpers';
import { grey2_Material } from './_materials';
// import { buildingMaterial, grey1_Material, grey2_Material, addBuildingOpacityToGUI } from './_materials';





export function handleImportedObject( gltf, scene, modell, roomsArray, levelsArray, cornerRoom, gui ){

    console.log( gltf );
    // gltf.scene.scale.set(.1, .1, .1)
    scene.add(gltf.scene);

    for (const key in gltf.scene.children) {
        recursiveAddShadow(gltf.scene.children[key], true)
    }


    const cubeTextureLoader = new CubeTextureLoader();
    const cubeTexture = cubeTextureLoader.load([
        'cubemap/pos-x.jpg',
        'cubemap/neg-x.jpg',
        'cubemap/pos-y.jpg',
        'cubemap/neg-y.jpg',
        'cubemap/pos-z.jpg',
        'cubemap/neg-z.jpg',
    ]);
    scene.background = cubeTexture;
    gltf.scene.getObjectByName('lvl_3_2').material.envMap = cubeTexture;
    gltf.scene.getObjectByName('lvl_3_2').material.envMapIntensity = 2;
    gltf.scene.getObjectByName('lvl1_2').material.envMap = cubeTexture;
    gltf.scene.getObjectByName('lvl1_2').material.envMapIntensity = 2;
    gltf.scene.getObjectByName('Line001_2').material.envMap = cubeTexture;
    gltf.scene.getObjectByName('Line001_2').material.envMapIntensity = 1;


    return true;
}