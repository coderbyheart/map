import {
	createSignal,
	createContext,
	useContext,
	type ParentProps,
	createResource,
	onMount,
} from 'solid-js'

export type Device = { id: string }

const DevicesContext = createContext<{ devices: Device[] }>({
	devices: [],
})

const fetchDevices = async () =>
	(await fetch(import.meta.env.REGISTRY_ENDPOINT)).json()

export function CounterProvider(props: ParentProps) {
	const [devices, setDevices] = createSignal<Device[]>([])
	const [d] = createResource(fetchDevices)

	onMount(() => {
		console.log('mount')
		console.log(d())
	})

	return (
		<DevicesContext.Provider value={{ devices: devices() }}>
			{props.children}
		</DevicesContext.Provider>
	)
}

export const useDevices = () => useContext(DevicesContext)
