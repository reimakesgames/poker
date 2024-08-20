import express from "express"
import { RemoteEvent } from "../shared/RemoteEvent.js"
import { WebSocket } from "ws"

let previousTime = Date.now()

function createLobby(id: string) {
	const router = express.Router()

	router.ws("/", (ws: WebSocket, req) => {
		ws.on("message", (msg: string) => {
			let data = JSON.parse(msg)
			RemoteEvent.id = id
			if (data.id === id && RemoteEvent.RemoteEvents[data.target])
				(
					RemoteEvent.RemoteEvents[
						data.target as string
					] as RemoteEvent
				)._emit(data.data)
		})

		ws.on("close", () => {
			console.log("Client disconnected")
		})

		ws.on("error", (err: Error) => {
			console.log(err)
		})

		console.log("Client connected")

		RemoteEvent._websockets[id] = RemoteEvent._websockets[id] || []
		RemoteEvent._websockets[id].push(ws)
	})

	console.log("Lobby created")

	setTimeout(() => {
		Ready()
		GameLoop()
	}, 2e3)

	return router
}

function Ready() {
	console.log("Ready")

	let DealCards = new RemoteEvent()

	DealCards.Connect((data: any) => {
		console.log(data)
	})
}

function Update(deltaTime: number) {}

function GameLoop() {
	let deltaTime = Date.now() - previousTime
	Update(deltaTime)
	setTimeout(GameLoop, 1000 / 10)
	previousTime = Date.now()
}

export { createLobby }
