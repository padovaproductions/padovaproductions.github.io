import { recursiveAddShadow } from './_helpers';
import { buildingMaterial, grey1_Material, grey2_Material } from './_materials';





export function handleImportedObject( gltf, scene, modell, roomsArray, levelsArray ){
    
    const importCopy = [... gltf.scene.children];
    
    modell['trees'] = importCopy[0];
    modell['building_base'] = importCopy[1];
    modell['park'] = importCopy[2];
    modell['paths_topo'] = importCopy[3];
    modell['lake'] = importCopy[4];
    modell['floor_0'] = importCopy[8];
    modell['floor_1'] = importCopy[5];
    modell['floor_2'] = importCopy[7];
    modell['floor_3'] = importCopy[6];
    modell['room_1'] = importCopy[10];
    modell['room_2'] = importCopy[9];

    
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
    
    console.log(modell);
    return modell;
}