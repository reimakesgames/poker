import { Node2D } from "../shared/Node2D.js"
import { Vector2 } from "../shared/Vector2.js"

class Card extends Node2D {
	public Ready(): void {}

	public Size: Vector2 = new Vector2(200, 300)
	public CornerRadius: number = 32

	Value: number = 0
	FaceDown: boolean = false

	_draw(deltaTime: number): void {
		super._draw(deltaTime)
		// draw value
		if (Card._ctx) {
			Card._ctx.fillStyle = "white"
			Card._ctx.strokeStyle = "black"
			Card._ctx.lineWidth = 2
			Card._ctx.beginPath()
			Card._ctx.roundRect(
				this.Position.X,
				this.Position.Y,
				this.Size.X,
				this.Size.Y,
				this.CornerRadius
			)
			Card._ctx.fill()
			Card._ctx.stroke()

			if (this.FaceDown) {
				Card._ctx.fillStyle = "maroon"
				Card._ctx.strokeStyle = "black"
				Card._ctx.beginPath()
				Card._ctx.roundRect(
					this.Position.X + 16,
					this.Position.Y + 16,
					this.Size.X - 32,
					this.Size.Y - 32,
					this.CornerRadius / 2
				)
				Card._ctx.fill()
				Card._ctx.stroke()
			} else {
				Card._ctx.fillStyle = "black"
				Card._ctx.font = "48px Arial"
				Card._ctx.textAlign = "center"
				Card._ctx.textBaseline = "middle"
				Card._ctx.fillText(
					this.Value.toString(),
					this.Position.X + this.Size.X / 2,
					this.Position.Y + this.Size.Y / 2
				)
			}
		}
	}
}

export { Card }
