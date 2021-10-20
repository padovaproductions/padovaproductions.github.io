import { Vector2, MeshStandardMaterial, Material, Color } from 'three';
import { guiVariables } from './_datGUI';


export function handleImportedObject( gltf, scene, gui ){

    const baseColor = new Color("0xf9f6ec");

    gltf.scene.traverse(( child )=>{
        child.castShadow = true;
        child.receiveShadow = true;

        if(child.hasOwnProperty('material')){
            child.material.color = baseColor;
        }
    });

    
    gui.addColor(guiVariables, 'baseColor').name("Base color").onChange( (value) => {
        baseColor.set(value);
    });

    console.log( gltf );
    scene.add(gltf.scene);
    
    return true;
}