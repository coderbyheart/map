import type { Component } from 'solid-js'
import { useDevices } from './context/devices.js'

export const App: Component = () => {
	const { devices } = useDevices()
	return (
		<>
			<main>
				<p>Hello World !</p>
			</main>
			<aside>
				<h2>Devices</h2>
			</aside>
		</>
	)
}
