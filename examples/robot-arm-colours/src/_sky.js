import { Sky } from 'three/examples/jsm/objects/Sky';
import { Vector3, MathUtils } from 'three';


export function initSky(sky, sun, gui, scene, renderer, camera) {

    // Add Sky
    sky = new Sky();
    sky.scale.setScalar( 450000 );
    scene.add( sky );

    sun = new Vector3();

    /// GUI

    const effectController = {
        turbidity: 5,
        rayleigh: 3,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.034,
        elevation: 5,
        azimuth: 53,
        exposure: renderer.toneMappingExposure
    };

    function guiChanged() {

        const uniforms = sky.material.uniforms;
        uniforms[ 'turbidity' ].value = effectController.turbidity;
        uniforms[ 'rayleigh' ].value = effectController.rayleigh;
        uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
        uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

        const phi = MathUtils.degToRad( 90 - effectController.elevation );
        const theta = MathUtils.degToRad( effectController.azimuth );

        sun.setFromSphericalCoords( 1, phi, theta );

        uniforms[ 'sunPosition' ].value.copy( sun );

        renderer.toneMappingExposure = effectController.exposure;
        renderer.render( scene, camera );

    }

    const skyFolder = gui.addFolder('Sky')
    skyFolder.open()
    skyFolder.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
    skyFolder.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
    skyFolder.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
    skyFolder.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
    skyFolder.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
    skyFolder.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
    skyFolder.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );

    guiChanged();

}