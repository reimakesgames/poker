import { Express } from "express"
import express from "express"
import { createLobby } from "./app.js"
await import("dotenv").then((dotenv) => dotenv.config())

const app = express() as Express & { ws: any }

const expressWs = await import("express-ws")
expressWs.default(app)

const PORT = process.env.PORT || 3000

app.use("/", express.static("app"))
app.use("/shared", express.static("shared"))

app.get("/games/:id", (req, res) => {
	res.redirect("/?join=" + req.params.id)
})

app.post("/api/new_lobby", (req, res) => {
	let lobbyId = ""
	for (let i = 0; i < 8; i++) {
		lobbyId += Math.abs(Math.floor(Math.random() * 10))
	}
	let lobby = createLobby(lobbyId)
	app.use(`/games/${lobbyId}`, lobby)
	res.send(lobbyId)
})

app.listen(PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`)
})
