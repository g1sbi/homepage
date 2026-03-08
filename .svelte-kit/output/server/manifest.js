export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["pfp.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.Q_vnfATB.js",app:"_app/immutable/entry/app.CPe_J-He.js",imports:["_app/immutable/entry/start.Q_vnfATB.js","_app/immutable/chunks/Nju7b-t-.js","_app/immutable/chunks/CQDdE2da.js","_app/immutable/chunks/BP74V_uw.js","_app/immutable/entry/app.CPe_J-He.js","_app/immutable/chunks/CQDdE2da.js","_app/immutable/chunks/CKaIOqE3.js","_app/immutable/chunks/C1QvRqle.js","_app/immutable/chunks/BP74V_uw.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
