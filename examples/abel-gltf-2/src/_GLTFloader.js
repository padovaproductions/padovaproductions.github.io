import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { fadeElementOut } from './_helpers';


export function initGLTFLoader(){
    const threeOverlay = document.getElementById('three-overlay');
    const loadingBlock = document.getElementById('loading-block');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercentage = document.getElementById('loading-percentage');

    const loadingManager = new LoadingManager(
        // Loaded
        () => {
            fadeElementOut(threeOverlay);
            fadeElementOut(loadingBlock);
        },
        // Progress
        ( url, itemsLoaded, itemsTotal) => {
            loadingPercentage.innerText = `${Math.ceil((itemsLoaded / itemsTotal)*100)}%`;
            loadingBar.style.transform = `scaleX(${itemsLoaded / itemsTotal})`;
            console.log(itemsLoaded, '/', itemsTotal)
        }
    )

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.setDRACOLoader(dracoLoader);

    return gltfLoader;
}