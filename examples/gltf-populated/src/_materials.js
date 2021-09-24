import { MeshStandardMaterial, DoubleSide } from "three";



// Building
export const buildingMaterial = new MeshStandardMaterial({
    color: 0x5DADE2,
    opacity: .5,
    transparent: true,
    side: DoubleSide,
});


// Lighter gray
export const grey1_Material = new MeshStandardMaterial({ 
    color: 0xD6D6D6 
});


// Darker gray
export const grey2_Material = new MeshStandardMaterial({ 
    color: 0xD0D0D0 
});


export function addBuildingOpacityToGUI(gui, material){
    const buildingFolder = gui.addFolder('Building');
    buildingFolder.open();
    buildingFolder.add( material, 'opacity', .1, 1, 0.1 ).name("Building opacity");
}