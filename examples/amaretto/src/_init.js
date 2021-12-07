import './style.css';
import { Scene, AmbientLight, PerspectiveCamera, WebGLRenderer, sRGBEncoding } from 'three';
import { initGLTFLoader } from './_GLTFloader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"





export function initThree( ) {
    const canvas = document.getElementById('three-canvas');
    if( canvas != null ){
        
        
        const scene = new Scene();
        const sizes = { width: window.innerWidth, height: window.innerHeight }


        const renderer = new WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputEncoding = sRGBEncoding;



        const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
        const controls = new OrbitControls(camera, canvas);
        controls.addEventListener( 'change', render ); 
        // controls.enableDamping = true;
        controls.maxPolarAngle = Math.PI/2;
        // controls.minDistance = 40;
        controls.maxDistance = 500;
        controls.enableZoom = false;
        controls.enablePan = false;
        camera.position.set( 1.9, 0.058, 5.6 );
        controls.update();



        const gltfLoader = initGLTFLoader();
        
        const ambientLight = new AmbientLight( 0xffffff, 1.2 );
        scene.add( ambientLight );
        

        gltfLoader.load(
            'brown.gltf',
            (gltf) => {

                console.log( gltf );
                scene.add(gltf.scene);
                renderer.render(scene, camera);
            }
        );


        window.addEventListener("resize", (event) => {
            sizes.width = window.innerWidth ;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.render(scene, camera);
        });

        function render(){
            renderer.render(scene, camera)
        }
    }
}