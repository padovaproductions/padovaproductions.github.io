import { gsap } from "gsap";

function spreadPieces(child){
    child.position.x = child.userData.initPosition.x + (Math.random() -0.5)/5;
    child.position.y = child.userData.initPosition.y + (Math.random() -0.5)/5;
    child.position.z = child.userData.initPosition.z + (Math.random() -0.5)/5;
    
    child.rotation.x = child.userData.initRotation.x + (Math.random() -0.5)*3;
    child.rotation.y = child.userData.initRotation.y + (Math.random() -0.5)*3;
    child.rotation.z = child.userData.initRotation.z + (Math.random() -0.5)*3;
}

function organizePieces(child){
    gsap.to( child.position, 
        { 
            x: child.userData.initPosition.x,  
            y: child.userData.initPosition.y,  
            z: child.userData.initPosition.z,
            duration: 1,
        }
    );
    gsap.to( child.rotation, 
        { 
            x: child.userData.initRotation.x,  
            y: child.userData.initRotation.y,  
            z: child.userData.initRotation.z,
            duration: 1,
        }
    );
}

export function handleImportedObject( gltf, scene, sizes, renderer, camera ){

        camera.position.y = 2;
        gltf.scene.children[0].scale.set(16, 16, 16);

        gltf.scene.children[0].traverse( function( child ) {

            child.userData['initPosition'] = {};
            child.userData.initPosition['x'] = child.position.x;
            child.userData.initPosition['y'] = child.position.y;
            child.userData.initPosition['z'] = child.position.z;
            child.userData['initRotation'] = {};
            child.userData.initRotation['x'] = child.rotation.x;
            child.userData.initRotation['y'] = child.rotation.y;
            child.userData.initRotation['z'] = child.rotation.z;

            if ( child.isMesh ) {
        
                spreadPieces(child);
            }
        
        } );

        const organizerButton = document.getElementById('organizerButton');

        if(organizerButton != null ){
            organizerButton.onclick = () => {

                gltf.scene.children[0].traverse( function( child ) {
                        if ( child.isMesh ) { 
                        organizePieces( child );
                    }
                } );
            }
        }


        console.log( gltf );
        scene.add(gltf.scene);
        renderer.render(scene, camera);
      

}