import { Node } from "./Node.js"
import { Vector2 } from "./Vector2.js"

class Node2D extends Node {
	public Ready(): void {}
	public Update(deltaTime: number): void {}
	public Draw(deltaTime: number): void {}

	public Name = "Node2D"
	public Position = new Vector2()
	public Size = new Vector2()
	public Color = "white"
	public CornerRadius = 0

	protected static _ctx: CanvasRenderingContext2D | null = null

	static _setContext(ctx: CanvasRenderingContext2D): void {
		Node2D._ctx = ctx
	}

	_draw(deltaTime: number): void {
		if (!Node2D._ctx) return
		Node2D._ctx.fillStyle = this.Color

		if (this.CornerRadius > 0) {
			Node2D._ctx.beginPath()
			Node2D._ctx.moveTo(
				this.Position.X + this.CornerRadius,
				this.Position.Y
			)
			Node2D._ctx.lineTo(
				this.Position.X + this.Size.X - this.CornerRadius,
				this.Position.Y
			)
			Node2D._ctx.quadraticCurveTo(
				this.Position.X + this.Size.X,
				this.Position.Y,
				this.Position.X + this.Size.X,
				this.Position.Y + this.CornerRadius
			)
			Node2D._ctx.lineTo(
				this.Position.X + this.Size.X,
				this.Position.Y + this.Size.Y - this.CornerRadius
			)
			Node2D._ctx.quadraticCurveTo(
				this.Position.X + this.Size.X,
				this.Position.Y + this.Size.Y,
				this.Position.X + this.Size.X - this.CornerRadius,
				this.Position.Y + this.Size.Y
			)
			Node2D._ctx.lineTo(
				this.Position.X + this.CornerRadius,
				this.Position.Y + this.Size.Y
			)
			Node2D._ctx.quadraticCurveTo(
				this.Position.X,
				this.Position.Y + this.Size.Y,
				this.Position.X,
				this.Position.Y + this.Size.Y - this.CornerRadius
			)
			Node2D._ctx.lineTo(
				this.Position.X,
				this.Position.Y + this.CornerRadius
			)
			Node2D._ctx.quadraticCurveTo(
				this.Position.X,
				this.Position.Y,
				this.Position.X + this.CornerRadius,
				this.Position.Y
			)
			Node2D._ctx.closePath()
		} else {
			// create a rectangle clipping path
			Node2D._ctx.beginPath()
			Node2D._ctx.rect(
				this.Position.X,
				this.Position.Y,
				this.Size.X,
				this.Size.Y
			)
			Node2D._ctx.closePath()
		}

		Node2D._ctx.fill()
		super._draw(deltaTime)
	}
}

export { Node2D }
