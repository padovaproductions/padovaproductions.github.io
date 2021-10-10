import { Group, CubeTextureLoader, MeshMatcapMaterial, TextureLoader, Vector2 } from 'three';
import { recursiveAddShadow } from './_helpers';
import { grey2_Material } from './_materials';
// import { buildingMaterial, grey1_Material, grey2_Material, addBuildingOpacityToGUI } from './_materials';




export function handleImportedObject( gltf, scene, sizes ){

    const textureLoader = new TextureLoader()
    const matcapTexture = textureLoader.load('orange-1.jpg')
    const material = new MeshMatcapMaterial()
    material.matcap = matcapTexture;
    
    gltf.scene.traverse( function(child) {
        child.material = material
        child.userData['initialPos'] = {};
        child.userData.initialPos['x'] = child.position.x;
        child.userData.initialPos['y'] = child.position.y;
        child.userData.initialPos['z'] = child.position.z;
    })


    

    const mouse = new Vector2();

    const forearm = gltf.scene.getObjectByName('forearm');
    const upper_arm = gltf.scene.getObjectByName('upper_arm');
    const shoulder = gltf.scene.getObjectByName('shoulder');
    





    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / sizes.width) * 2 - 1;
        mouse.y = -(event.clientY / sizes.height) * 2 + 1;
        
        // console.log(mouse.x)
        // console.log(mouse.y)

        shoulder.rotation.y = - Math.PI/2 + Math.sin(mouse.x) * Math.PI*2;

        if(mouse.y>0 && mouse.y<.8){    
            
            upper_arm.rotation.x = - Math.PI/1.6 - Math.sin(mouse.y/2) * Math.PI;
            upper_arm.position.z = upper_arm.userData.initialPos.z + 1.4 - mouse.y*1.8;
            upper_arm.position.y = upper_arm.userData.initialPos.y + mouse.y*2 - 1.4;

            forearm.rotation.x = Math.PI/2 + Math.sin(mouse.y/2) * Math.PI;
            forearm.position.z = forearm.userData.initialPos.z + 1.4 - mouse.y*2.3;
            forearm.position.y = forearm.userData.initialPos.y + mouse.y*4.6 -3.5;
        }
    
    })






    console.log( gltf );
    scene.add(gltf.scene);
    
    return true;
}