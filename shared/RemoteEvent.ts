import { WebSocket as WS } from "ws"

type WebSockets = WS | WebSocket | null

class RemoteEvent {
	_listeners: Function[] = []
	static _websockets: {
		[serverId: string]: { [playerId: string]: WebSockets }
	} = {}
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

	_transmit(targetUserId: string, data: any) {
		let server = RemoteEvent._websockets[RemoteEvent.id]
		if (!server) return
		let user = server[targetUserId] as WebSocket
		if (!user) return
		user.send(
			JSON.stringify({
				target: this.constructor.name,
				id: RemoteEvent.id,
				data,
			})
		)
	}

	static _onMessage(msg: string) {
		let data = JSON.parse(msg)
		RemoteEvent.id = data.id
		if (data.id === RemoteEvent.id && RemoteEvent.RemoteEvents[data.target])
			(
				RemoteEvent.RemoteEvents[data.target as string] as RemoteEvent
			)._emit(data.data)
	}

	MessageServer(data: any) {
		this._transmit(RemoteEvent.id, data)
	}

	MessageClient(targetUserId: string, data: any) {
		this._transmit(targetUserId, data)
	}

	MessageAllClients(data: any) {
		let server = RemoteEvent._websockets[RemoteEvent.id]
		if (!server) return
		for (let userId in server) {
			this._transmit(userId, data)
		}
	}
}

export { RemoteEvent }
