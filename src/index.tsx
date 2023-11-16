import { App } from './App.js'
import { render } from 'solid-js/web'
import { formatDistanceToNow } from 'date-fns'
import './sentry.js'

console.debug(`registryEndpoint`, REGISTRY_ENDPOINT)
console.debug('sentryDSN', SENTRY_DSN)
console.debug('version', VERSION)
console.debug(
	'build time',
	BUILD_TIME,
	formatDistanceToNow(new Date(BUILD_TIME), {
		addSuffix: true,
	}),
)

const root = document.getElementById('root')

if (root === null) {
	console.error(`Could not find root element!`)
} else {
	render(() => <App />, root)
}
