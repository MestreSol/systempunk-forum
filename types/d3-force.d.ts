declare module 'd3-force' {
  export function forceManyBody(): any;
  export function forceCollide(): any;
  export function forceLink(): any;
  // Keep it minimal; specifics aren't needed for this project. Consumers can still import and use functions.
}
