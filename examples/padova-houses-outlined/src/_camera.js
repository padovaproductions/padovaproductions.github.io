import { PerspectiveCamera } from "three";


/**
* Camera
*/
export function initCamera( sizes ){
    const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
    camera.position.set( 0.18, 1.39, 6.6 );
    camera.lookAt( 0,0,0 );

    return camera;
}