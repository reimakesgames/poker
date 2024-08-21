import { Network } from "../shared/Network.js"
import { SceneTree } from "../shared/SceneTree.js"

const canvasElement = document.getElementById("game") as HTMLCanvasElement
const ctx = canvasElement.getContext("2d") as CanvasRenderingContext2D
let previousTime = Date.now()

const sceneTree = new SceneTree()

function createLobby() {
	fetch("/api/new_lobby", { method: "POST" })
		.then((res) => res.text())
		.then((lobbyId) => {
			window.location.href = `/games/${lobbyId}`
		})
}

function connectToLobby(lobbyId: string) {
	const ws = new WebSocket(`ws://${window.location.host}/games/${lobbyId}`)

	ws.onopen = () => {
		history.pushState({}, "", `/games/${lobbyId}`)
		console.log("Connected to server " + lobbyId)

		sceneTree.GameId = lobbyId
		sceneTree._ready()
		startGameLoop()
	}

	ws.onmessage = (msg) => {
		if (msg.data.startsWith("user")) {
			console.log(msg.data)
			sceneTree.UserId = msg.data
			return
		}
		Network._event(msg.data)
	}

	ws.onclose = () => {
		console.log("Connection closed")
	}

	let server = Network._websockets[lobbyId]
	if (!server) {
		Network._websockets[lobbyId] = {}
	}

	Network.id = lobbyId
}

function startGameLoop() {
	let deltaTime = Date.now() - previousTime
	sceneTree._update(deltaTime)
	sceneTree._draw(deltaTime)
	requestAnimationFrame(startGameLoop)
	previousTime = Date.now()
}

let lobbyId = new URLSearchParams(window.location.search).get("join")
if (lobbyId) {
	connectToLobby(lobbyId)
} else {
	createLobby()
}
