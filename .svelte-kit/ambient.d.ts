
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const LSCOLORS: string;
	export const UV_CACHE_DIR: string;
	export const CURSOR_SANDBOX: string;
	export const __CURSOR_SANDBOX_ENV_RESTORE: string;
	export const npm_config_userconfig: string;
	export const HYPRLAND_CMD: string;
	export const XDG_CONFIG_DIRS: string;
	export const LESS: string;
	export const XDG_SESSION_PATH: string;
	export const NVM_INC: string;
	export const XDG_MENU_PREFIX: string;
	export const _ZO_DOCTOR: string;
	export const no_proxy: string;
	export const GUM_CONFIRM_PROMPT_FOREGROUND: string;
	export const XDG_BACKEND: string;
	export const HISTSIZE: string;
	export const NPM_CONFIG_CACHE: string;
	export const NODE: string;
	export const VSCODE_PROCESS_TITLE: string;
	export const SSH_AUTH_SOCK: string;
	export const XDG_DATA_HOME: string;
	export const GUM_CONFIRM_SELECTED_BACKGROUND: string;
	export const INPUT_METHOD: string;
	export const XCOMPOSEFILE: string;
	export const XDG_CONFIG_HOME: string;
	export const OMARCHY_PATH: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const ELECTRON_RUN_AS_NODE: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const XMODIFIERS: string;
	export const DESKTOP_SESSION: string;
	export const ELECTRON_OZONE_PLATFORM_HINT: string;
	export const OSH: string;
	export const NO_AT_BRIDGE: string;
	export const PNPM_STORE_PATH: string;
	export const npm_config_globalconfig: string;
	export const XCURSOR_SIZE: string;
	export const YARN_CACHE_FOLDER: string;
	export const CURSOR_EXTENSION_HOST_ROLE: string;
	export const SOCKS5_PROXY: string;
	export const EDITOR: string;
	export const TURBO_CACHE_DIR: string;
	export const XDG_SEAT: string;
	export const CARGO_TARGET_DIR: string;
	export const PWD: string;
	export const LOGNAME: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XDG_SESSION_TYPE: string;
	export const CCACHE_DIR: string;
	export const GIT_HTTP_PROXY: string;
	export const VSCODE_ESM_ENTRYPOINT: string;
	export const PNPM_HOME: string;
	export const npm_config_init_module: string;
	export const SYSTEMD_EXEC_PID: string;
	export const VSCODE_CODE_CACHE_PATH: string;
	export const _: string;
	export const GIT_HTTPS_PROXY: string;
	export const TERMINAL: string;
	export const QT_STYLE_OVERRIDE: string;
	export const MOTD_SHOWN: string;
	export const HOME: string;
	export const LANG: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const LS_COLORS: string;
	export const CURSOR_WORKSPACE_LABEL: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_config_devdir: string;
	export const npm_package_version: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const VSCODE_IPC_HOOK: string;
	export const STARSHIP_SHELL: string;
	export const WAYLAND_DISPLAY: string;
	export const __MISE_DIFF: string;
	export const FORCE_COLOR: string;
	export const VSCODE_CLI: string;
	export const XDG_SEAT_PATH: string;
	export const https_proxy: string;
	export const INVOCATION_ID: string;
	export const POETRY_CACHE_DIR: string;
	export const PLAYWRIGHT_BROWSERS_PATH: string;
	export const MANAGERPID: string;
	export const PUPPETEER_CACHE_DIR: string;
	export const BAT_THEME: string;
	export const CP_HOME_DIR: string;
	export const PIP_CACHE_DIR: string;
	export const GOMODCACHE: string;
	export const socks_proxy: string;
	export const INIT_CWD: string;
	export const GEM_SPEC_CACHE: string;
	export const CHROME_DESKTOP: string;
	export const STARSHIP_SESSION_KEY: string;
	export const QT_QPA_PLATFORM: string;
	export const UWSM_WAIT_VARNAMES: string;
	export const __MISE_ORIG_PATH: string;
	export const XDG_CACHE_HOME: string;
	export const npm_lifecycle_script: string;
	export const NVM_DIR: string;
	export const CURSOR_AGENT: string;
	export const SDL_IM_MODULE: string;
	export const GRADLE_USER_HOME: string;
	export const npm_config_npm_version: string;
	export const XDG_SESSION_CLASS: string;
	export const CYPRESS_CACHE_FOLDER: string;
	export const socks5_proxy: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const npm_config_prefix: string;
	export const USER: string;
	export const SDL_VIDEODRIVER: string;
	export const NO_PROXY: string;
	export const SUDO_EDITOR: string;
	export const NX_CACHE_DIRECTORY: string;
	export const OZONE_PLATFORM: string;
	export const ENCORE_INSTALL: string;
	export const EVERYSPHERE_RIPGREP_PATH: string;
	export const __MISE_SESSION: string;
	export const HYPRLAND_INSTANCE_SIGNATURE: string;
	export const CURSOR_SANDBOX_LANDLOCK_STATUS: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const VSCODE_PID: string;
	export const SHLVL: string;
	export const NVM_CD_FLAGS: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const PAGER: string;
	export const HTTPS_PROXY: string;
	export const HTTP_PROXY: string;
	export const QT_IM_MODULE: string;
	export const VSCODE_CWD: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const http_proxy: string;
	export const GOCACHE: string;
	export const MANAGERPIDFDID: string;
	export const npm_config_user_agent: string;
	export const NO_COLOR: string;
	export const ROCM_PATH: string;
	export const NUGET_PACKAGES: string;
	export const XDG_STATE_HOME: string;
	export const npm_execpath: string;
	export const FC_FONTATIONS: string;
	export const LC_CTYPE: string;
	export const VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
	export const XDG_RUNTIME_DIR: string;
	export const ALL_PROXY: string;
	export const BUNDLE_PATH: string;
	export const DEBUGINFOD_URLS: string;
	export const npm_package_json: string;
	export const CONDA_PKGS_DIRS: string;
	export const BUN_INSTALL: string;
	export const SOCKS_PROXY: string;
	export const ELECTRON_NO_ATTACH_CONSOLE: string;
	export const JOURNAL_STREAM: string;
	export const MISE_SHELL: string;
	export const XDG_DATA_DIRS: string;
	export const GDK_BACKEND: string;
	export const all_proxy: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const GDK_SCALE: string;
	export const npm_config_node_gyp: string;
	export const HISTFILESIZE: string;
	export const CI: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_config_global_prefix: string;
	export const VSCODE_NLS_CONFIG: string;
	export const MAIL: string;
	export const NVM_BIN: string;
	export const GUM_CONFIRM_UNSELECTED_FOREGROUND: string;
	export const UWSM_FINALIZE_VARNAMES: string;
	export const GUM_CONFIRM_UNSELECTED_BACKGROUND: string;
	export const HOMEBREW_CACHE: string;
	export const COMPOSER_HOME: string;
	export const npm_node_execpath: string;
	export const VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
	export const BUN_INSTALL_CACHE_DIR: string;
	export const OLDPWD: string;
	export const GUM_CONFIRM_SELECTED_FOREGROUND: string;
	export const HYPRCURSOR_SIZE: string;
	export const CURSOR_TRACE_ID: string;
	export const NODE_ENV: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		LSCOLORS: string;
		UV_CACHE_DIR: string;
		CURSOR_SANDBOX: string;
		__CURSOR_SANDBOX_ENV_RESTORE: string;
		npm_config_userconfig: string;
		HYPRLAND_CMD: string;
		XDG_CONFIG_DIRS: string;
		LESS: string;
		XDG_SESSION_PATH: string;
		NVM_INC: string;
		XDG_MENU_PREFIX: string;
		_ZO_DOCTOR: string;
		no_proxy: string;
		GUM_CONFIRM_PROMPT_FOREGROUND: string;
		XDG_BACKEND: string;
		HISTSIZE: string;
		NPM_CONFIG_CACHE: string;
		NODE: string;
		VSCODE_PROCESS_TITLE: string;
		SSH_AUTH_SOCK: string;
		XDG_DATA_HOME: string;
		GUM_CONFIRM_SELECTED_BACKGROUND: string;
		INPUT_METHOD: string;
		XCOMPOSEFILE: string;
		XDG_CONFIG_HOME: string;
		OMARCHY_PATH: string;
		MEMORY_PRESSURE_WRITE: string;
		ELECTRON_RUN_AS_NODE: string;
		COLOR: string;
		npm_config_local_prefix: string;
		XMODIFIERS: string;
		DESKTOP_SESSION: string;
		ELECTRON_OZONE_PLATFORM_HINT: string;
		OSH: string;
		NO_AT_BRIDGE: string;
		PNPM_STORE_PATH: string;
		npm_config_globalconfig: string;
		XCURSOR_SIZE: string;
		YARN_CACHE_FOLDER: string;
		CURSOR_EXTENSION_HOST_ROLE: string;
		SOCKS5_PROXY: string;
		EDITOR: string;
		TURBO_CACHE_DIR: string;
		XDG_SEAT: string;
		CARGO_TARGET_DIR: string;
		PWD: string;
		LOGNAME: string;
		XDG_SESSION_DESKTOP: string;
		XDG_SESSION_TYPE: string;
		CCACHE_DIR: string;
		GIT_HTTP_PROXY: string;
		VSCODE_ESM_ENTRYPOINT: string;
		PNPM_HOME: string;
		npm_config_init_module: string;
		SYSTEMD_EXEC_PID: string;
		VSCODE_CODE_CACHE_PATH: string;
		_: string;
		GIT_HTTPS_PROXY: string;
		TERMINAL: string;
		QT_STYLE_OVERRIDE: string;
		MOTD_SHOWN: string;
		HOME: string;
		LANG: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		LS_COLORS: string;
		CURSOR_WORKSPACE_LABEL: string;
		XDG_CURRENT_DESKTOP: string;
		npm_config_devdir: string;
		npm_package_version: string;
		MEMORY_PRESSURE_WATCH: string;
		VSCODE_IPC_HOOK: string;
		STARSHIP_SHELL: string;
		WAYLAND_DISPLAY: string;
		__MISE_DIFF: string;
		FORCE_COLOR: string;
		VSCODE_CLI: string;
		XDG_SEAT_PATH: string;
		https_proxy: string;
		INVOCATION_ID: string;
		POETRY_CACHE_DIR: string;
		PLAYWRIGHT_BROWSERS_PATH: string;
		MANAGERPID: string;
		PUPPETEER_CACHE_DIR: string;
		BAT_THEME: string;
		CP_HOME_DIR: string;
		PIP_CACHE_DIR: string;
		GOMODCACHE: string;
		socks_proxy: string;
		INIT_CWD: string;
		GEM_SPEC_CACHE: string;
		CHROME_DESKTOP: string;
		STARSHIP_SESSION_KEY: string;
		QT_QPA_PLATFORM: string;
		UWSM_WAIT_VARNAMES: string;
		__MISE_ORIG_PATH: string;
		XDG_CACHE_HOME: string;
		npm_lifecycle_script: string;
		NVM_DIR: string;
		CURSOR_AGENT: string;
		SDL_IM_MODULE: string;
		GRADLE_USER_HOME: string;
		npm_config_npm_version: string;
		XDG_SESSION_CLASS: string;
		CYPRESS_CACHE_FOLDER: string;
		socks5_proxy: string;
		TERM: string;
		npm_package_name: string;
		npm_config_prefix: string;
		USER: string;
		SDL_VIDEODRIVER: string;
		NO_PROXY: string;
		SUDO_EDITOR: string;
		NX_CACHE_DIRECTORY: string;
		OZONE_PLATFORM: string;
		ENCORE_INSTALL: string;
		EVERYSPHERE_RIPGREP_PATH: string;
		__MISE_SESSION: string;
		HYPRLAND_INSTANCE_SIGNATURE: string;
		CURSOR_SANDBOX_LANDLOCK_STATUS: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		VSCODE_PID: string;
		SHLVL: string;
		NVM_CD_FLAGS: string;
		MOZ_ENABLE_WAYLAND: string;
		PAGER: string;
		HTTPS_PROXY: string;
		HTTP_PROXY: string;
		QT_IM_MODULE: string;
		VSCODE_CWD: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		http_proxy: string;
		GOCACHE: string;
		MANAGERPIDFDID: string;
		npm_config_user_agent: string;
		NO_COLOR: string;
		ROCM_PATH: string;
		NUGET_PACKAGES: string;
		XDG_STATE_HOME: string;
		npm_execpath: string;
		FC_FONTATIONS: string;
		LC_CTYPE: string;
		VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
		XDG_RUNTIME_DIR: string;
		ALL_PROXY: string;
		BUNDLE_PATH: string;
		DEBUGINFOD_URLS: string;
		npm_package_json: string;
		CONDA_PKGS_DIRS: string;
		BUN_INSTALL: string;
		SOCKS_PROXY: string;
		ELECTRON_NO_ATTACH_CONSOLE: string;
		JOURNAL_STREAM: string;
		MISE_SHELL: string;
		XDG_DATA_DIRS: string;
		GDK_BACKEND: string;
		all_proxy: string;
		npm_config_noproxy: string;
		PATH: string;
		GDK_SCALE: string;
		npm_config_node_gyp: string;
		HISTFILESIZE: string;
		CI: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_config_global_prefix: string;
		VSCODE_NLS_CONFIG: string;
		MAIL: string;
		NVM_BIN: string;
		GUM_CONFIRM_UNSELECTED_FOREGROUND: string;
		UWSM_FINALIZE_VARNAMES: string;
		GUM_CONFIRM_UNSELECTED_BACKGROUND: string;
		HOMEBREW_CACHE: string;
		COMPOSER_HOME: string;
		npm_node_execpath: string;
		VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
		BUN_INSTALL_CACHE_DIR: string;
		OLDPWD: string;
		GUM_CONFIRM_SELECTED_FOREGROUND: string;
		HYPRCURSOR_SIZE: string;
		CURSOR_TRACE_ID: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
