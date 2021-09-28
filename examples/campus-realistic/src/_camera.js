import { PerspectiveCamera } from "three";


/**
* Camera
*/
export function initCamera( sizes ){
    const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
    // camera.position.set(8,4,4);
    camera.position.set(-17, 14, 27);

    return camera;
}