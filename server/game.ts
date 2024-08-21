import { Network } from "../shared/Network.js"
import { Node } from "../shared/Node.js"
import { Timer } from "../shared/Timer.js"

class Game extends Node {
	public DealCards = new Network()

	public async Ready(): Promise<void> {
		// the first player to connect is the screen where the game is played

		let TurnTimer = new Timer()
		TurnTimer.OneShot = true
		this.AddChild(TurnTimer)

		while (true) {
			console.log("waow")
			await TurnTimer.Await(5000)
		}
	}
	public Update(deltaTime: number): void {}
}

export { Game }
