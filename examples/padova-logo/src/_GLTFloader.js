import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';


export function initGLTFLoader(){

    const gltfLoader = new GLTFLoader();

    return gltfLoader;
}