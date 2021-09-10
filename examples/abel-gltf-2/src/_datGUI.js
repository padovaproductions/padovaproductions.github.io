import * as dat from 'dat.gui';


/**
* GUI - press 'H' on keyboard to toggle hide/show
*/
export function initGUI(){
    const gui = new dat.GUI({ width: 300 });
    // gui.hide();

    return gui;
}


export const guiVariables = {
    lightRotation: 0,
    allowShadows: true,
}