import { PerspectiveCamera } from "three";


/**
* Camera
*/
export function initCamera( sizes ){
    const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
    camera.position.set( 6.3, 3.15, -2.25 );
    camera.lookAt( 0,0,0 );

    return camera;
}