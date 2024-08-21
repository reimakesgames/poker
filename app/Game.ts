import { Network } from "../shared/Network.js"
import { Node2D } from "../shared/Node2D.js"
import { Vector2 } from "../shared/Vector2.js"
import { Card } from "./Card.js"

class Game extends Node2D {
	public DealCards = new Network()

	public Ready(): void {
		const screenWidth = 1280
		const screenHeight = 720

		this.DealCards.Connect((data: any) => {
			let cards = data.cards
			for (let i = 0; i < cards.length; i++) {
				let card = new Card()
				card.Value = cards[i]

				card.Position = new Vector2(
					screenWidth / 2 - card.Size.X / 2,
					screenHeight - card.Size.Y - 20
				)

				this.AddChild(card)
			}
		})
	}
	public Update(deltaTime: number): void {}
	public Draw(deltaTime: number): void {}
}

export { Game }
