export const isTouchSupported = window && 'ontouchstart' in window;

export const MOUSE_EVENTS: any = {
    mousedown: isTouchSupported ? 'touchstart' : 'mousedown',
    mouseup: isTouchSupported ? 'touchend' : 'mouseup',
    mousemove: isTouchSupported ? 'touchmove' : 'mousemove'
};