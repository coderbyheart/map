// These constants are string-replaced compile time.
// See https://vitejs.dev/config/shared-options.html#define
declare const REGISTRY_ENDPOINT: string
declare const DOMAIN_NAME: string
declare const VERSION: string
declare const HOMEPAGE: string
declare const BUILD_TIME: string
declare const SENTRY_DSN: string | undefined

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
	readonly env: ImportMetaEnv
}
