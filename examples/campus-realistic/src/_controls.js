import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


/**
 * Orbit controls
 */
export function initControls( camera, canvas, gui ){
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = .4;
    controls.maxPolarAngle = Math.PI/2;
    // controls.minDistance = .4;
    // controls.maxDistance = 20;
    const motionFolder = gui.addFolder('Motion Controls')
    motionFolder.open()
    motionFolder.add( controls, 'autoRotate' ).name("Auto rotate");

    return controls;
}