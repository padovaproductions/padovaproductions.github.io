import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';


export function initGLTFLoader(){
    const loadbar = document.querySelector('.loadbar-inner');
    const loadingScreen = document.getElementById('loading-screen');
    const manager = new LoadingManager();

    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        // console.log(itemsLoaded / itemsTotal)
        loadbar.style.transition = 'transform .2s ease';
        loadbar.style.transform = `scaleX(${itemsLoaded / itemsTotal})`
    };
    manager.onLoad = function () {
        loadingScreen.style.opacity = 0;
        loadingScreen.style.pointerEvents = 'none';
        setTimeout(function(){ 
            loadingScreen.style.display = 'none';
        }, 1200);
    };
    
    const gltfLoader = new GLTFLoader(manager);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    return gltfLoader;
}