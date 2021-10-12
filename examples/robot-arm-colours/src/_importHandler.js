import { Group, CubeTextureLoader, MeshMatcapMaterial, CanvasTexture, Vector2, ImageBitmapLoader, TextureLoader, MeshStandardMaterial, MeshBasicMaterial } from 'three';
import { recursiveAddShadow } from './_helpers';
import { buildingMaterial, grey1_Material, grey2_Material, addBuildingOpacityToGUI } from './_materials';




export function handleImportedObject( gltf, scene, sizes, controls, bitmaps ){

    gltf.scene.position.y = -.8;
    let armMotionEnabled = false;
    const mouse = new Vector2();


    const lvl_1 = gltf.scene.getObjectByName('bottom');
    const lvl_2 = gltf.scene.getObjectByName('arm');
    const lvl_3 = gltf.scene.getObjectByName('pont');

    
    const robotMaterial = new MeshStandardMaterial( { 
        map: bitmaps['orange'],
        normalMap: bitmaps['normal'],
        roughnessMap:  bitmaps['roughness'],
        metalnessMap:  bitmaps['roughness'],
    } );

    gltf.scene.traverse( function(child) {
        child.userData['initialPos'] = {};
        child.userData.initialPos['x'] = child.position.x;
        child.userData.initialPos['y'] = child.position.y;
        child.userData.initialPos['z'] = child.position.z;

        child.material = robotMaterial;
    });


    


    function setArmPosition( xx, yy ){
        lvl_1.rotation.y = - Math.PI/2 + Math.sin(xx) * Math.PI*2;
        if(yy>=0 && yy<.9){    
            lvl_2.rotation.x = - Math.PI/2.4 + (Math.sin( yy/2 )) * Math.PI;
            lvl_3.rotation.x = Math.PI/2.4 - (Math.sin(yy)) * Math.PI;
            // lvl_4.rotation.x = Math.PI/2.4 - (Math.sin(yy/2)) * Math.PI;
        }
    }


    setArmPosition( -0.0054, 0 );

    document.addEventListener('mousemove', (event) => {
        if(armMotionEnabled){
            mouse.x = (event.clientX / sizes.width) * 2 - 1;
            mouse.y = -(event.clientY / sizes.height) * 2 + 1;
            // console.log(mouse.x)
            // console.log(mouse.y)
            setArmPosition( mouse.x, mouse.y );
        }
    })

    
    document.getElementById('motionToggler').onclick = () => { 
        armMotionEnabled = !armMotionEnabled;
        // controls.enabled = !controls.enabled;
    }

    document.getElementById('blueSkin').onclick = () => { 
        robotMaterial.map = bitmaps['blue'];
    }   
    document.getElementById('greySkin').onclick = () => { 
        robotMaterial.map = bitmaps['grey'];
    }
    document.getElementById('ogSkin').onclick = () => {
        robotMaterial.map = bitmaps['orange'];
    }

    console.log( gltf );
    scene.add(gltf.scene);
    
    return true;
}