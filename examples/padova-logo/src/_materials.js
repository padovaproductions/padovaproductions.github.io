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
    color: 0xffffff // 0x11ffff 
});