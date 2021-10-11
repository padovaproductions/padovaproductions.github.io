import { Group, CubeTextureLoader, MeshMatcapMaterial, Vector2, TextureLoader, MeshBasicMaterial } from 'three';
import { recursiveAddShadow } from './_helpers';
import { grey2_Material } from './_materials';
// import { buildingMaterial, grey1_Material, grey2_Material, addBuildingOpacityToGUI } from './_materials';




export function handleImportedObject( gltf, scene, sizes ){

    // move orbit control rotation center higher on the scene
    gltf.scene.position.y = -1;
    let armMotionEnabled = false;
    const mouse = new Vector2();
    

    const loader = new TextureLoader();
    const blueTexture = loader.load('lower/Blue_robot_arm_DefaultMaterial_BaseColor.png');
    const blueMaterial = new MeshBasicMaterial({
        map: blueTexture,
    });




    const base = gltf.scene.getObjectByName('Base');
    const lvl_1 = gltf.scene.getObjectByName('bottom');
    const lvl_2 = gltf.scene.getObjectByName('arm');
    const lvl_3 = gltf.scene.getObjectByName('pont');
    const lvl_4  = gltf.scene.getObjectByName('lvl_4');
    
    gltf.scene.traverse( function(child) {
        child.userData['initialPos'] = {};
        child.userData.initialPos['x'] = child.position.x;
        child.userData.initialPos['y'] = child.position.y;
        child.userData.initialPos['z'] = child.position.z;

        // child.material.map = blueMaterial;
    })

    document.addEventListener('mousemove', (event) => {
        if(armMotionEnabled){
            mouse.x = (event.clientX / sizes.width) * 2 - 1;
            mouse.y = -(event.clientY / sizes.height) * 2 + 1;
            
            // console.log(mouse.x)
            // console.log(mouse.y)

            lvl_1.rotation.y = - Math.PI/2 + Math.sin(mouse.x) * Math.PI*2;

            if(mouse.y>0 && mouse.y<.9){    
                
                lvl_2.rotation.x = - Math.PI/2.4 + (Math.sin(mouse.y/2)) * Math.PI;

                lvl_3.rotation.x = Math.PI/2.4 - (Math.sin(mouse.y)) * Math.PI;
                
                // lvl_4.rotation.x = Math.PI/2.4 - (Math.sin(mouse.y/2)) * Math.PI;
            }
        }
    
    })

    
    document.querySelector('.three-canvas').onclick = () => { 
        armMotionEnabled = !armMotionEnabled;
    }




    console.log( gltf );
    scene.add(gltf.scene);
    
    return true;
}