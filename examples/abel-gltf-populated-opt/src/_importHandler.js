import { Group } from 'three';
import { recursiveAddShadow } from './_helpers';
import { buildingMaterial, grey1_Material, grey2_Material, addBuildingOpacityToGUI } from './_materials';





export function handleImportedObject( gltf, scene, modell, roomsArray, levelsArray, cornerRoom, gui ){


    modell['trees'] = gltf.scene.getObjectByName('trees');
    modell['building_base'] = gltf.scene.getObjectByName('building_base');
    modell['park'] = gltf.scene.getObjectByName('park');
    modell['paths_topo'] = gltf.scene.getObjectByName('paths_Retopo');
    modell['lake'] = gltf.scene.getObjectByName('Lake_Retopo_Retopo');
    modell['floor_0'] = gltf.scene.getObjectByName('floor_0');
    modell['floor_1'] = gltf.scene.getObjectByName('floor_1');
    modell['floor_2'] = gltf.scene.getObjectByName('floor_2');
    modell['room_1'] = gltf.scene.getObjectByName('room1');
    modell['room_2'] = gltf.scene.getObjectByName('room2');
    modell['people'] = gltf.scene.getObjectByName('Populate');


    // // Assembling the classroom
    const floor_3 = gltf.scene.getObjectByName('floor_3');
    const desks = gltf.scene.getObjectByName('desks');
    cornerRoom['room'] = gltf.scene.getObjectByName('corner_room');
    // cornerRoom['room'].visible = false;


    // Grouping and positioning classroom for motion
    modell['floor_3'] = new Group();
    modell['floor_3'].add( floor_3 );
    modell['floor_3'].add( desks );
    modell['floor_3'].add( cornerRoom['room'] );

    modell['floor_3'].position.set(floor_3.position.x, floor_3.position.y, floor_3.position.z);
    desks.position.set(desks.position.x - floor_3.position.x, desks.position.y -  floor_3.position.y, desks.position.z -  floor_3.position.z);
    cornerRoom['room'].position.set(cornerRoom['room'].position.x - floor_3.position.x, cornerRoom['room'].position.y - floor_3.position.y, cornerRoom['room'].position.z - floor_3.position.z);
    floor_3.position.set(0, 0, 0);






    levelsArray.push(modell['floor_0']);
    levelsArray.push(modell['floor_1']);
    levelsArray.push(modell['floor_2']);
    levelsArray.push(modell['floor_3']);


    roomsArray.push(modell['room_1']);
    roomsArray.push(modell['room_2']);
 


    // Building strore initial pos. to reset animated motions
    levelsArray.forEach(element => {
        element.userData['initialPos'] = {};
        element.userData.initialPos['x'] = element.position.x;
        element.userData.initialPos['y'] = element.position.y;
        element.userData.initialPos['z'] = element.position.z;
    });
    
    // roomsArray.forEach(element => {
    //     element.visible = false;
    // });

    for (const key in modell) {
        recursiveAddShadow(modell[key], true)
        scene.add(modell[key])
    }

    // addBuildingOpacityToGUI( gui, buildingMaterial );
    

    console.log(gltf)
    return modell;
}