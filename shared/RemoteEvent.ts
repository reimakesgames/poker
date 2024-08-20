import { WebSocket as WS } from "ws"

type WebSockets = WS | WebSocket | null

class RemoteEvent {
	_listeners: Function[] = []
	static _websockets: { [key: string]: WebSockets[] } = {}
	static RemoteEvents: { [key: string]: RemoteEvent } = {}
	static id: string = ""

	constructor() {
		RemoteEvent.RemoteEvents[this.constructor.name] = this
	}

	Connect(callback: Function) {
		this._listeners.push(callback)
	}

	_emit(data: any) {
		for (let listener of this._listeners) {
			listener(data)
		}
	}

	_transmit(data: any) {
		// go through all the websockets and send the data
		for (let ws of RemoteEvent._websockets[RemoteEvent.id] || []) {
			if (ws)
				ws.send(
					JSON.stringify({
						target: this.constructor.name,
						id: RemoteEvent.id,
						data,
					})
				)
		}
	}

	MessageServer(data: any) {
		this._transmit(data)
	}

	MessageClient(data: any) {
		this._transmit(data)
	}
}

export { RemoteEvent }
