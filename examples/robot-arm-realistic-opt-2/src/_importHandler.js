import { Vector2, MeshMatcapMaterial, TextureLoader, LineBasicMaterial } from 'three';


export function handleImportedObject( gltf, scene, sizes, renderer, camera ){

    gltf.scene.position.y = -.8;
    let armMotionEnabled = false;
    const mouse = new Vector2();


    const OGmaterial = gltf.scene.getObjectByName('Base').material.clone();
    console.log(OGmaterial);

    const textureLoader = new TextureLoader();
    const matcapMaterial = new MeshMatcapMaterial();
    textureLoader.load('grey-eggshell-matcap.jpg', (texture)=>{
        matcapMaterial.matcap = texture;
        matcapMaterial.wireframe = true;


            
        const lvl_1 = gltf.scene.getObjectByName('bottom');
        const lvl_2 = gltf.scene.getObjectByName('arm');
        const lvl_3 = gltf.scene.getObjectByName('pont');


        gltf.scene.traverse( function(child) {
            child.userData['initialPos'] = {};
            child.userData.initialPos['x'] = child.position.x;
            child.userData.initialPos['y'] = child.position.y;
            child.userData.initialPos['z'] = child.position.z;

            child.castShadow = true;
            child.receiveShadow = true;

            if(child.hasOwnProperty('material')){    
                child.material.wireframe = true;
            }

            child.material = matcapMaterial;
        });

        function setArmPosition( xx, yy ){
            lvl_1.rotation.y = - Math.PI/2 + Math.sin(xx) * Math.PI*2;
            if(yy>=0 && yy<.9){    
                lvl_2.rotation.x = - Math.PI/2.4 + (Math.sin( yy/2 )) * Math.PI;
                lvl_3.rotation.x = Math.PI/2.4 - (Math.sin(yy)) * Math.PI;
            }
        }
        setArmPosition( 0.092, 0.15 );

        document.addEventListener('mousemove', (event) => {
            if(armMotionEnabled){
                mouse.x = (event.clientX / sizes.width) * 2 - 1;
                mouse.y = -(event.clientY / sizes.height) * 2 + 1;
                // console.log(mouse.x)
                // console.log(mouse.y)
                setArmPosition( mouse.x, mouse.y );
                renderer.render(scene, camera);
            }
        })
    
        document.getElementById('body').onclick = () => { 
            armMotionEnabled = !armMotionEnabled;
        }

        console.log( gltf );
        scene.add(gltf.scene);
        renderer.render(scene, camera);
        

    })

}