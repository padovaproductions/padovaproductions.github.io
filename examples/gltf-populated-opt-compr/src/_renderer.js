import { WebGLRenderer } from "three";


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

    return renderer;
}