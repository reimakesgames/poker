import { Node } from "./Node.js"

class SceneTree extends Node {
	override Ready(): void {
		let node = new Node()
		node.Name = "First Node"
		this.AddChild(node)

		let node2 = new Node()
		node2.Name = "Second Node"
		this.AddChild(node2)
	}
	override Update(deltaTime: number): void {}

	override Name = "SceneTree"

	GameId = ""
	UserId = ""
}

export { SceneTree }
