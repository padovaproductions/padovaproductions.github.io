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
        renderer.outputEncoding = sRGBEncoding;
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));



        const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
        const controls = new OrbitControls(camera, canvas);
        controls.addEventListener( 'change', render ); 
        controls.maxPolarAngle = Math.PI/2;
        controls.minDistance = 4;
        controls.maxDistance = 12;
        // controls.enableZoom = false;
        // controls.enablePan = false;
        camera.position.set( -2.97, 2.61, -6.085 );
        controls.update();



        const gltfLoader = initGLTFLoader();
        
        const ambientLight = new AmbientLight( 0xffffff, 1.2 );
        scene.add( ambientLight );
        

        gltfLoader.load(
            'brown.gltf',
            (gltf) => {

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
            console.log()
        });

        function render(){
            renderer.render(scene, camera)
        }
    }
}