import { Group } from 'three';
import { recursiveAddShadow } from './_helpers';
import { buildingMaterial, grey1_Material, grey2_Material, addBuildingOpacityToGUI } from './_materials';





export function handleImportedObject( gltf, scene, modell, roomsArray, levelsArray, cornerRoom, gui ){


    // 'getObjectByName()' is a native Three.js method on the Object3D class.
    // It is better that using indexes of the desired element, because as you use 
    // an element from the imported object, it gets removed from there, and indicing will change. 
    // But with 'getObjectByName()', this doesn't matter.
    modell['trees'] = gltf.scene.getObjectByName('trees');
    modell['building_base'] = gltf.scene.getObjectByName('building_base');
    modell['park'] = gltf.scene.getObjectByName('park');
    modell['paths_topo'] = gltf.scene.getObjectByName('paths_Retopo');
    modell['lake'] = gltf.scene.getObjectByName('Lake_Retopo');
    modell['floor_0'] = gltf.scene.getObjectByName('floor_0');
    modell['floor_1'] = gltf.scene.getObjectByName('floor_1');
    modell['floor_2'] = gltf.scene.getObjectByName('floor_2');
    modell['room_1'] = gltf.scene.getObjectByName('room1');
    modell['room_2'] = gltf.scene.getObjectByName('room2');
    modell['people'] = gltf.scene.getObjectByName('people');


    // Assembling the classroom
    const floor_3 = gltf.scene.getObjectByName('floor_3');
    const desks = gltf.scene.getObjectByName('desks');
    cornerRoom['room'] = gltf.scene.getObjectByName('corner_room');
    cornerRoom['room'].visible = false;

    floor_3.material = buildingMaterial;
    cornerRoom['room'].material = buildingMaterial;
    desks.material = grey1_Material;
    desks.rotation.y = desks.rotation.y + Math.PI;
    desks.position.x = desks.position.x + .092;
    desks.position.z = desks.position.z - .105;
    modell['floor_3'] = new Group();
    modell['floor_3'].add( floor_3 );
    modell['floor_3'].add( desks );
    modell['floor_3'].add( cornerRoom['room'] );

    modell['floor_3'].position.set(floor_3.position.x, floor_3.position.y, floor_3.position.z);
    desks.position.set(desks.position.x - floor_3.position.x, desks.position.y -  floor_3.position.y, desks.position.z -  floor_3.position.z);
    cornerRoom['room'].position.set(cornerRoom['room'].position.x - floor_3.position.x, cornerRoom['room'].position.y - floor_3.position.y, cornerRoom['room'].position.z - floor_3.position.z);
    floor_3.position.set(0, 0, 0);






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
        el.scale.set(el.scale.x -.25, el.scale.y-.25, el.scale.z-.25)
    });
    modell['people'].children.forEach(el => {
        el.scale.set( 1.4, 1.4, 1.4 );
    });


    // Building mods
    let round = 1;
    levelsArray.forEach(element => {
        element.userData['initialPos'] = {};
        element.userData.initialPos['x'] = element.position.x;
        element.userData.initialPos['y'] = element.position.y;
        element.userData.initialPos['z'] = element.position.z;
        if(element.hasOwnProperty('material')){
            element.material = buildingMaterial
        }
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

    addBuildingOpacityToGUI( gui, buildingMaterial );
    

    console.log(modell)
    return modell;
}