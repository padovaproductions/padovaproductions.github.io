import { PerspectiveCamera } from "three";


/**
* Camera
*/
export function initCamera( sizes ){
    const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
    camera.position.set( 1.9, 0.058, 5.6 );
    camera.lookAt( 0,0,0 );

    return camera;
}