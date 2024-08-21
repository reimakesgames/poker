import express from "express"
import { RemoteEvent } from "../shared/RemoteEvent.js"
import { WebSocket } from "ws"
import { SceneTree } from "../shared/SceneTree.js"

let previousTime = Date.now()

const sceneTree = new SceneTree()

function createLobby(serverId: string) {
	const router = express.Router()

	router.ws("/", (ws: WebSocket, req) => {
		ws.on("message", (msg: string) => {
			console.log(msg)
			let data = JSON.parse(msg)
			RemoteEvent.id = serverId
			if (data.id === serverId && RemoteEvent.RemoteEvents[data.target])
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

		// create uuid for user
		let userId = "user"
		for (let i = 0; i < 28; i++) {
			userId += Math.floor(Math.random() * 10)
				.toString()
				.substring(0, 1)
		}
		ws.send(userId)

		console.log("Client connected")

		let server = RemoteEvent._websockets[serverId]
		if (!server) RemoteEvent._websockets[serverId] = {}
		let user = (
			RemoteEvent._websockets[serverId] as { [key: string]: WebSocket }
		)[userId] as WebSocket
		if (!user)
			(RemoteEvent._websockets[serverId] as { [key: string]: WebSocket })[
				userId
			] = ws
	})

	console.log("Lobby created")

	sceneTree.GameId = serverId
	sceneTree._initiateReady()
	startGameLoop()

	return router
}

function startGameLoop() {
	let deltaTime = Date.now() - previousTime
	sceneTree._initiateUpdate(deltaTime)
	setTimeout(startGameLoop, 1000 / 10)
	previousTime = Date.now()
}

export { createLobby }
