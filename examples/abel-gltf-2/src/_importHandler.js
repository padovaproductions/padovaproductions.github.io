import { recursiveAddShadow } from './_helpers';
import { buildingMaterial, grey1_Material, grey2_Material } from './_materials';





export function handleImportedObject( gltf, scene, modell ){
    const importCopy = [... gltf.scene.children];
    modell['trees'] = importCopy[0];
    modell['building_base'] = importCopy[1];
    modell['park'] = importCopy[2];
    modell['paths_topo'] = importCopy[3];
    modell['lake'] = importCopy[4];
    modell['floor_0'] = importCopy[5];
    modell['floor_1'] = importCopy[6];
    modell['floor_2'] = importCopy[8];
    modell['floor_3'] = importCopy[7];
    modell['room_1'] = importCopy[10];
    modell['room_2'] = importCopy[9];
    
        
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
    [
        modell['floor_0'], 
        modell['floor_1'], 
        modell['floor_2'], 
        modell['floor_3']
    ].forEach(element => {
        element.material = buildingMaterial
        element.position.y = element.position.y + (0.001 * round);
        round++;
    });
    

    modell['room_1'].visible = false
    modell['room_2'].visible = false
    modell['room_1'].material = buildingMaterial
    modell['room_2'].material = buildingMaterial

    for (const key in modell) {
        recursiveAddShadow(modell[key], true)
        scene.add(modell[key])
    }
    
    console.log(modell);
    return modell;
}