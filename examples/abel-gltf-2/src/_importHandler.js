import { recursiveAddShadow } from './_helpers';
import { buildingMaterial, grey1_Material, grey2_Material } from './_materials';





export function handleImportedObject( gltf, scene, modell, roomsArray, levelsArray ){

    // 'getObjectByName()' is a native Three.js method on the Object3D class.
    // It is better that using indexes of the desired element, because as you use 
    // an element from the imported object, it gets removed from there, and indicing will change. 
    // But with 'getObjectByName()', this doesn't matter.
    modell['trees'] = gltf.scene.getObjectByName('trees');
    modell['building_base'] = gltf.scene.getObjectByName('building_base');
    modell['park'] = gltf.scene.getObjectByName('park');
    modell['paths_topo'] = gltf.scene.getObjectByName('paths_Retopo');
    modell['lake'] = gltf.scene.getObjectByName('Lake_Retopo');
    modell['floor_0'] = gltf.scene.getObjectByName('floor_0_v2');
    modell['floor_1'] = gltf.scene.getObjectByName('floor_1');
    modell['floor_2'] = gltf.scene.getObjectByName('floor_2');
    modell['floor_3'] = gltf.scene.getObjectByName('floor_3');
    modell['room_1'] = gltf.scene.getObjectByName('room1');
    modell['room_2'] = gltf.scene.getObjectByName('room2');

    
    levelsArray.push(modell['floor_0']),
    levelsArray.push(modell['floor_1']),
    levelsArray.push(modell['floor_2']),
    levelsArray.push(modell['floor_3']),


    roomsArray.push(modell['room_1']),
    roomsArray.push(modell['room_2']),
 
        
    // Environment mods
    modell['park'].material = grey2_Material;
    [ modell['building_base'], modell['paths_topo'] ].forEach(el => {
        el.material = grey1_Material;
    });
    modell['trees'].children.forEach(el => {
        el.material = grey2_Material;
    });

    // Building mods
    let round = 1;
    levelsArray.forEach(element => {
        element.userData['initialPos'] = {};
        element.userData.initialPos['x'] = element.position.x;
        element.userData.initialPos['y'] = element.position.y;
        element.userData.initialPos['z'] = element.position.z;
        element.material = buildingMaterial
        element.position.y = element.position.y + (0.0005 * round);
        round++;
    });
    
    roomsArray.forEach(element => {
        element.visible = false;
        element.material = buildingMaterial;
    });

    for (const key in modell) {
        recursiveAddShadow(modell[key], true)
        scene.add(modell[key])
    }
    
    return modell;
}