// import './reset.scss';
import './style.scss';
import gsap from 'gsap';
import {scrollToTarget} from './scrollToTarget';
import { Scene, AmbientLight, ACESFilmicToneMapping, PerspectiveCamera, WebGLRenderer, sRGBEncoding, Vector3, LineBasicMaterial, BufferGeometry, Line } from 'three';
import { initGLTFLoader } from './_GLTFloader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";



let active = null;
gsap.ticker.fps(24);
const eventControllObj = {
    sect_0: {
        newPos: new Vector3( -5.75, 2.28, -3.77 ),
    },
    sect_1: {
        newPos: new Vector3(-1.04, 7.11, .9),
    },
    sect_2: {
        newPos: new Vector3(-2.53, 2.18, 6.42),
    },
}



export function initThree( ) {
    const canvas = document.getElementById('three-canvas');
    if( canvas != null ){

        
        const scene = new Scene();
        const sizes = { width: null, height: null };

        function getFreshSizes(){
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
        }
        getFreshSizes();

        const points = [
            {
                name: "house",
                length: 1,
                position: new Vector3(.4, 1.36, 1),
                element: document.getElementById('point-1'),
            },
            {
                name: "botanics",
                length: 1,
                position: new Vector3(-0.157, 1.25, 2.436),
                element: document.getElementById('point-2'),
            },
            {
                name: "layers",
                length: 1,
                position: new Vector3(2.5, 1.1, 1),
                element: document.getElementById('point-3'),
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
        renderer.toneMapping = ACESFilmicToneMapping;
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


        const camera = new PerspectiveCamera(35, sizes.width / sizes.height);
        camera.position.set( -5.75, 2.28, -3.77 );

        const controls = new OrbitControls(camera, canvas);
        controls.addEventListener( 'change', render ); 
        controls.maxPolarAngle = Math.PI/2.25;
        // controls.minDistance = 4;
        // controls.maxDistance = 12;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.update();



        
        const ambientLight = new AmbientLight( 0xffffff, .68 );
        scene.add( ambientLight );
        

        
        const gltfLoader = initGLTFLoader();
        gltfLoader.load(
            'final_glow_x.gltf',
            (gltf) => {

                gltf.scene.position.y= -0.64;

                scene.add(gltf.scene);
                render();
            }
        );

        document.addEventListener("keyup", (e) => {
            if (
              document.activeElement.nodeName != "INPUT" &&
              document.activeElement.nodeName != "TEXTAREA"
            ) {
              if (e.key == "ArrowRight" && active.nextElementSibling) {
                scrollToTarget(active.nextElementSibling, 1000);
              } else if (e.key == "ArrowLeft" && active.previousElementSibling) {
                scrollToTarget(active.previousElementSibling, 1000);
              }
            }
          });

          const desktopExplore = document.getElementById("explore");
            if (desktopExplore != null) {
            desktopExplore.onclick = (event) => {
                event.preventDefault();
                scrollToTarget(
                document.getElementById(event.currentTarget.hash.substring(1)),
                900
                );
                desktopExplore.classList.add("active");
                setTimeout(() => {
                desktopExplore.classList.remove("active");
                }, 900);
            };
            }

        window.addEventListener("resize", (event) => {
            getFreshSizes();
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            render();
        });

        function render(){
            renderer.render(scene, camera);
            adjustMarkers();
        }

        function adjustMarkers(){
            for (const point of points) {
                const screenPosition = point.position.clone();
                screenPosition.project(camera);

                const translateX = screenPosition.x * sizes.width * 0.5;
                const translateY = -screenPosition.y * sizes.height * 0.5;
                point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
            }
        }

        

        // Intersection observer
        const sections = document.querySelectorAll("section");
        if (sections != null) {
            let newPos;

            let IOoptions = {
                root: null,
                rootMargin: "0px",
                threshold: 0.01,
            };

            function IOSectionCallback(entries, obs) {
                entries.forEach((entry) => {
                    if (
                    entry.isIntersecting &&
                    (active == null || active.id != entry.target.id)
                    ) {
                        active = entry.target;
                        canvas.classList.add(entry.target.id)

                        if( eventControllObj.hasOwnProperty(entry.target.id) && eventControllObj[entry.target.id].newPos != null){
                                
                            newPos = eventControllObj[entry.target.id].newPos;
                            gsap.to(camera.position, { x: newPos.x, y: newPos.y, z: newPos.z, duration: 1.8, onUpdate: function() {
                                controls.update();
                                render();
                            }});

                        }

                    }
                });
            }

            let observer = new IntersectionObserver(IOSectionCallback, IOoptions);

            for (var i = 0; i < sections.length; i++) {
                observer.observe(sections[i]);
            }
        }

    }
}