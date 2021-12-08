import './style.css';
import { Scene, AmbientLight, NoToneMapping, CineonToneMapping, ACESFilmicToneMapping, ReinhardToneMapping, LinearToneMapping, PerspectiveCamera, WebGLRenderer, sRGBEncoding, Vector3, LineBasicMaterial, BufferGeometry, Line, NearestFilter, LinearFilter, NearestMipMapNearestFilter, NearestMipMapLinearFilter } from 'three';
import { initGLTFLoader } from './_GLTFloader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';





export function initThree( ) {
    const canvas = document.getElementById('three-canvas');
    if( canvas != null ){

        
        const scene = new Scene();
        const gui = new GUI({ width: 300 });
        const sizes = { width: window.innerWidth, height: window.innerHeight };
        
			const params = {
				exposure: 1.0,
				toneMapping: 'ACESFilmic'
			};

			const toneMappingOptions = {
				None: NoToneMapping,
				Linear: LinearToneMapping,
				Reinhard: ReinhardToneMapping,
				Cineon: CineonToneMapping,
				ACESFilmic: ACESFilmicToneMapping,
			};

        console.log(toneMappingOptions)

        const points = [
            {
                name: "house",
                length: 1,
                position: new Vector3(.4, 1.5, 1),
                element: document.getElementById('point-1'),
            },
            {
                name: "botanics",
                length: 1,
                position: new Vector3(-0.157, 1.39, 2.436),
                element: document.getElementById('point-2'),
            },
            {
                name: "layers",
                length: 1,
                position: new Vector3(2.5, 1.22, 1),
                element: document.getElementById('point-3'),
            },
            {
                name: "base",
                length: 1,
                position: new Vector3(-.6, .5, -3),
                element: document.getElementById('point-4'),
            },
        ];
        

        const material = new LineBasicMaterial({
            color: 0xffffff
        });
        const reusableVector3 = new Vector3();
        points.forEach(point => {
            const lineGeometry = new BufferGeometry().setFromPoints( [
                point.position, 
                reusableVector3.set(point.position.x, point.position.y - point.length, point.position.z)
            ]);
            const line = new Line( lineGeometry, material );
            scene.add( line );
        });
        

        const renderer = new WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
        });
        renderer.outputEncoding = sRGBEncoding;
        renderer.toneMapping = toneMappingOptions[ params.toneMapping ];
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


        const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
        const controls = new OrbitControls(camera, canvas);
        controls.addEventListener( 'change', render ); 
        controls.maxPolarAngle = Math.PI/2.25;
        controls.minDistance = 4;
        controls.maxDistance = 12;
        // controls.enableZoom = false;
        // controls.enablePan = false;
        camera.position.set( -2.97, 2.61, -6.085 );
        controls.update();



        const gltfLoader = initGLTFLoader();
        
        const ambientLight = new AmbientLight( 0xffffff, .77 );
        scene.add( ambientLight );
        
        gui.add( ambientLight, 'intensity', 0, 3, 0.01 ).name("Ambient light").onChange( function () {
            render();
        } );
        

        

        gltfLoader.load(
            'final.gltf',
            (gltf) => {

                gltf.scene.position.y= -0.5;

                gui.add( params, 'toneMapping', Object.keys( toneMappingOptions ) ).onChange( function () {
                    renderer.toneMapping = toneMappingOptions[ params.toneMapping ];
                    gltf.scene.children.forEach(element => {
                        element.material.needsUpdate=true;
                    });
                    render();
                } );

                scene.add(gltf.scene);
                render();
            }
        );


        window.addEventListener("resize", (event) => {
            sizes.width = window.innerWidth ;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            render();
        });

        function render(){
            renderer.render(scene, camera);
        }

        
        function animate() {

            for (const point of points) {
                const screenPosition = point.position.clone();
                screenPosition.project(camera);

                const translateX = screenPosition.x * sizes.width * 0.5;
                const translateY = -screenPosition.y * sizes.height * 0.5;
                point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
            }

            window.requestAnimationFrame(animate);
        }
        animate();

        
    }
}