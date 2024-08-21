import { Node } from "./Node.js"

class SceneTree extends Node {
	override Ready(): void {}
	override Update(deltaTime: number): void {}

	override Name = "SceneTree"

	GameId = ""
	UserId = ""
}

export { SceneTree }
