import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


/**
 * Orbit controls
 */
export function initControls( camera, canvas ){
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = .4;
    controls.maxPolarAngle = Math.PI/2;
    // controls.minDistance = 40;
    controls.maxDistance = 500;
    
    return controls;
}