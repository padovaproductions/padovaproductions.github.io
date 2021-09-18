import { PerspectiveCamera } from "three";


/**
* Camera
*/
export function initCamera( sizes ){
    const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
    // camera.position.set(8,4,4);
    camera.position.set(-4.5, 2.1, -4.2);

    return camera;
}