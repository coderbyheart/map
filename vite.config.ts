import { fromEnv } from '@nordicsemiconductor/from-env'
import chalk from 'chalk'
import { defineConfig } from 'vite'
import { homepage, version } from './siteInfo.js'
import solidPlugin from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'

const { registryEndpoint } = fromEnv({
	registryEndpoint: 'REGISTRY_ENDPOINT',
})(process.env)

// Optional environment variables
const sentryDSN = process.env.SENTRY_DSN
if (sentryDSN === undefined) {
	console.debug(chalk.yellow(`Sentry`), chalk.red('disabled'))
} else {
	console.debug(chalk.yellow(`Sentry DSN`), chalk.blue(sentryDSN))
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		process.env.NODE_ENV === 'development' ? devtools() : undefined,
		solidPlugin(),
	],
	base: `${(process.env.BASE_URL ?? '').replace(/\/+$/, '')}/`,
	preview: {
		host: 'localhost',
		port: 8080,
	},
	server: {
		host: 'localhost',
		port: 8080,
	},
	build: {
		outDir: './build',
		sourcemap: true,
	},
	esbuild: {
		logOverride: { 'this-is-undefined-in-esm': 'silent' },
	},
	// string values will be used as raw expressions, so if defining a string constant, it needs to be explicitly quoted
	define: {
		HOMEPAGE: JSON.stringify(homepage),
		VERSION: JSON.stringify(version),
		BUILD_TIME: JSON.stringify(new Date().toISOString()),
		REGISTRY_ENDPOINT: JSON.stringify(registryEndpoint),
		DOMAIN_NAME: JSON.stringify(
			process.env.DOMAIN_NAME ?? 'hello.nrfcloud.com',
		),
		SENTRY_DSN: JSON.stringify(sentryDSN),
	},
})
