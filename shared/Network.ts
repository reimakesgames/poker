import { WebSocket as WS } from "ws"

type WebSockets = WS | WebSocket | null

class Network {
	_listeners: Function[] = []
	static _websockets: {
		[serverId: string]: { [playerId: string]: WebSockets }
	} = {}
	static RemoteEvents: { [key: string]: Network } = {}
	static _serverId: string = ""

	constructor() {
		Network.RemoteEvents[this.constructor.name] = this
	}

	Connect(callback: Function) {
		this._listeners.push(callback)
	}

	_emitListeners(data: any) {
		for (let listener of this._listeners) {
			listener(data)
		}
	}

	_fire(targetUserId: string, data: any) {
		let server = Network._websockets[Network._serverId]
		if (!server) return
		let user = server[targetUserId] as WebSocket
		if (!user) return
		user.send(
			JSON.stringify({
				target: this.constructor.name,
				id: Network._serverId,
				data,
			})
		)
	}

	static _event(msg: string) {
		let data = JSON.parse(msg)
		Network._serverId = data.id
		if (data.id === Network._serverId && Network.RemoteEvents[data.target])
			(
				Network.RemoteEvents[data.target as string] as Network
			)._emitListeners(data.data)
	}

	FireServer(data: any) {
		this._fire(Network._serverId, data)
	}

	FireClient(targetUserId: string, data: any) {
		this._fire(targetUserId, data)
	}

	FireAllClients(data: any) {
		let server = Network._websockets[Network._serverId]
		if (!server) return
		for (let userId in server) {
			this._fire(userId, data)
		}
	}
}

export { Network }
