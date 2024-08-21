import express from "express"
import { Network } from "../shared/Network.js"
import { WebSocket } from "ws"
import { SceneTree } from "../shared/SceneTree.js"

let previousTime = Date.now()

const sceneTree = new SceneTree()

function createLobby(serverId: string) {
	const router = express.Router()

	router.ws("/", (ws: WebSocket, req) => {
		let userId = "user"
		for (let i = 0; i < 28; i++) {
			userId += Math.floor(Math.random() * 10)
				.toString()
				.substring(0, 1)
		}
		ws.send(userId)

		ws.on("message", (msg: string) => {
			console.log(msg)
			let data = JSON.parse(msg)
			Network.id = serverId
			if (data.id === serverId && Network.RemoteEvents[data.target])
				(
					Network.RemoteEvents[data.target as string] as Network
				)._emitListeners(data.data)
		})

		ws.on("close", () => {
			console.log("Client disconnected")

			let server = Network._websockets[serverId]
			if (!server) return
			delete (server as { [key: string]: WebSocket })[userId]
		})

		ws.on("error", (err: Error) => {
			console.log(err)
		})

		console.log("Client connected")

		let server = Network._websockets[serverId]
		if (!server) Network._websockets[serverId] = {}
		let user = (
			Network._websockets[serverId] as { [key: string]: WebSocket }
		)[userId] as WebSocket
		if (!user)
			(Network._websockets[serverId] as { [key: string]: WebSocket })[
				userId
			] = ws
	})

	console.log("Lobby created")

	sceneTree.GameId = serverId
	sceneTree._ready()
	startGameLoop()

	return router
}

function startGameLoop() {
	let deltaTime = Date.now() - previousTime
	sceneTree._update(deltaTime)
	setTimeout(startGameLoop, 1000 / 10)
	previousTime = Date.now()
}

export { createLobby }
