import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


/**
 * Orbit controls
 */
export function initControls( camera, canvas, gui ){
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = .15;
    controls.maxPolarAngle = Math.PI/2 - 0.1;
    // controls.minDistance = 40;
    // controls.maxDistance = 500;
    
    return controls;
}