import { Group, CubeTextureLoader, MeshMatcapMaterial, CanvasTexture, Vector2, ImageBitmapLoader, TextureLoader, MeshStandardMaterial, MeshBasicMaterial } from 'three';



export function loadBitmapTextures(){
    const loader = new TextureLoader();
    const bitmapLoader = new ImageBitmapLoader();
    const bitmaps = {};

    // Blue
    bitmapLoader.load(
        'lower/Blue_robot_arm_DefaultMaterial_BaseColor.png',
        ( imageBitmap ) => {
            const texture = new CanvasTexture( imageBitmap );
            bitmaps['blue'] = texture;
        }
    );
    
    // Grey
    bitmapLoader.load(
        'lower/Gray_robot_arm_DefaultMaterial_BaseColor.png',
        ( imageBitmap ) => {
            const texture = new CanvasTexture( imageBitmap );
            bitmaps['grey'] = texture;
        }
    );

    // Orange
    bitmapLoader.load(
        'lower/robot_arm_DefaultMaterial_BaseColor.png',
        ( imageBitmap ) => {
            const texture = new CanvasTexture( imageBitmap );
            bitmaps['orange'] = texture;
        }
    );

    // Alpha map
    bitmapLoader.load(
        'lower/robot_arm_DefaultMaterial_Normal.png',
        ( imageBitmap ) => {
            const texture = new CanvasTexture( imageBitmap );
            bitmaps['normal'] = texture;
        }
    );

    // Roughness & Metalness
    bitmapLoader.load(
        'lower/robot_arm_DefaultMaterial_Roughnessrobot_arm_DefaultMaterial_Metallic.png',
        ( imageBitmap ) => {
            const texture = new CanvasTexture( imageBitmap );
            bitmaps['roughness'] = texture;
        }
    );


    return bitmaps;
}