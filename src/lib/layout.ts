// Shared desktop-shell geometry so the dock, window manager, desktop icons and
// snap/overlay logic always agree on where the dock lives.
//
// On wide viewports (>= LG_BREAKPOINT) the dock is a vertical panel pinned to the
// left (classic Ubuntu "Dash to Dock" look). On narrower viewports it becomes a
// horizontal panel pinned to the bottom (touch-friendly).

/** Viewport width (px) at / above which the dock docks vertically on the left. */
export const LG_BREAKPOINT = 1024;

/** Horizontal space reserved on the left for the vertical dock. */
export const LEFT_DOCK_INSET = 88;

/** Vertical space reserved at the bottom for the horizontal dock. */
export const BOTTOM_DOCK_INSET = 74;

/** Window top offset, just below the 32px top bar. */
export const TOP_INSET = 38;

/** True when the viewport is wide enough for the left vertical dock. */
export const isWideViewport = (): boolean =>
  typeof window !== 'undefined' && window.innerWidth >= LG_BREAKPOINT;
