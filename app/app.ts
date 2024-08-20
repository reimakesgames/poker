import { RemoteEvent } from "../shared/RemoteEvent.js"

const game = document.getElementById("game") as HTMLCanvasElement
const ctx = game.getContext("2d") as CanvasRenderingContext2D
let previousTime = Date.now()

function Ready() {
	let DealCards = new RemoteEvent()

	DealCards.MessageServer("Hello")
}

function Update(deltaTime: number) {
	ctx.clearRect(0, 0, game.width, game.height)
}

function Draw(deltaTime: number) {}

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
		console.log("Connected to server")

		Ready()
		GameLoop()
	}

	ws.onmessage = (msg) => {
		let message = JSON.parse(msg.data) as {
			id: string
			target: string
			data: any
		}
		console.log(message.data)
		if (message.id === lobbyId && RemoteEvent.RemoteEvents[message.target])
			(
				RemoteEvent.RemoteEvents[
					message.target as string
				] as RemoteEvent
			)._emit(message.data)
	}

	ws.onclose = () => {
		console.log("Connection closed")
	}

	RemoteEvent._websockets[lobbyId] = RemoteEvent._websockets[lobbyId] || []
	RemoteEvent._websockets[lobbyId].push(ws)

	RemoteEvent.id = lobbyId
}

function GameLoop() {
	let deltaTime = Date.now() - previousTime
	Update(deltaTime)
	Draw(deltaTime)
	requestAnimationFrame(GameLoop)
	previousTime = Date.now()
}

let urlParams = new URLSearchParams(window.location.search)
let lobbyId = urlParams.get("join")
if (lobbyId) {
	connectToLobby(lobbyId)
} else {
	createLobby()
}
