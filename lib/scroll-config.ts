export const FRAME_COUNT = 180;
export const SCROLL_HEIGHT_VH = 450;

/**
 * Maps a frame index (0 to FRAME_COUNT-1) to the file path.
 * Adjusts for 1-based index in filename with zero padding.
 */
export const getFramePath = (index: number): string => {
    const frameNumber = Math.max(1, Math.min(index + 1, FRAME_COUNT));
    const padded = frameNumber.toString().padStart(3, '0');
    return `/Frames/ezgif-frame-${padded}.png`;
};

/**
 * Preload priority frames (first 20)
 */
export const PRELOAD_COUNT = 20;
