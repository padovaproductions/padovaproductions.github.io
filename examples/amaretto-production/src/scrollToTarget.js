export function easeInOutQuad(x) {
return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function easeInOutSine(x) {
    return -(Math.cos( Math.PI * x) - 1) / 2;
}

function easeLinear(x) {
    return x;
}

// Sources:
// https://htmldom.dev/scroll-to-an-element-smoothly/
// https://javascript.info/js-animation
export function scrollToTarget(target, duration = 1000, offset = 0) {
    const top = target.getBoundingClientRect().top + offset;
    const startPos = window.pageYOffset;
    const diff = top;
  
    let startTime = null;
    let requestId;
  
    const loop = function (currentTime) {
      if (!startTime) {
        startTime = currentTime;
      }
  
      // Elapsed time in miliseconds
      const time = currentTime - startTime;
      const percent = Math.min(time / duration, 1);
  
      window.scrollTo(0, startPos + diff * easeInOutQuad(percent));
  
      if (time < duration) {
        // Continue moving
        requestId = window.requestAnimationFrame(loop);
      } else {
        window.cancelAnimationFrame(requestId);
      }
    };
    requestId = window.requestAnimationFrame(loop);
}