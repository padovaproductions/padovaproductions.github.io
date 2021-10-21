import { Vector2, MeshStandardMaterial, Material, Color } from 'three';
import { guiVariables } from './_datGUI';


export function handleImportedObject( gltf, scene, gui ){

    const baseColor = new Color(0xffe7c0);

    gltf.scene.traverse(( child )=>{

        if(child.hasOwnProperty('material')){
            child.material.color = baseColor;
        }
    });

    
    gui.addColor(guiVariables, 'baseColor').name("Base color").onChange( (value) => {
        baseColor.setHex(value);
    });

    console.log( gltf );
    scene.add(gltf.scene);
    
    return true;
}