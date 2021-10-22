import { GUI } from 'three/examples/jsm/libs/dat.gui.module'



export function initGUI(){
    const gui = new GUI({ width: 300 });
    gui.close();
    gui.hide();
    return gui;
}


export const guiVariables = {
    baseColor: 0xffffff,
    hemiColor: 0xffffff,
    ambientColor: 0xffffff,
}