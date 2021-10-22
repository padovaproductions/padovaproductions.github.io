import { WebGLRenderer, sRGBEncoding, ReinhardToneMapping, LinearToneMapping, CineonToneMapping, ACESFilmicToneMapping, Line } from "three";


/**
 * Renderer
 */
export function initRenderer( canvas, sizes ){    
    const renderer = new WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = sRGBEncoding;
    renderer.toneMapping = ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 1;

    return renderer;
}