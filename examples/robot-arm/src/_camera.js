import { PerspectiveCamera } from "three";


/**
* Camera
*/
export function initCamera( sizes ){
    const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
    camera.position.set(43, 9, 20);

    return camera;
}