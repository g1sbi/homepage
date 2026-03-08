

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.Dj9cuqb7.js","_app/immutable/chunks/C1QvRqle.js","_app/immutable/chunks/CQDdE2da.js","_app/immutable/chunks/EIpHqNCN.js"];
export const stylesheets = [];
export const fonts = [];
