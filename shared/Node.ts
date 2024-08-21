class Node {
	public Ready(): void {}
	public Update(deltaTime: number): void {}
	/**
	 * @param deltaTime Time since last frame in milliseconds
	 */
	public Draw(deltaTime: number): void {}

	public Name = "Node"

	_children: Node[] = []
	_parent: Node | null = null

	_log(message: string): void {
		console.log(`${this.Name}: ${message}`)
	}

	_initiateReady(): void {
		this._children.forEach((child) => {
			child._initiateReady()
		})
		this._log("Ready")
		this.Ready()
	}

	_initiateUpdate(deltaTime: number): void {
		this.Update(deltaTime)
		this._children.forEach((child) => {
			child._initiateUpdate(deltaTime)
		})
	}

	_initiateDraw(deltaTime: number): void {
		this.Draw(deltaTime)
		this._children.forEach((child) => {
			child._initiateDraw(deltaTime)
		})
	}

	_addChild(child: Node): void {
		child._parent = this
		this._children.push(child)
		this._initiateReady()
	}
}

export { Node }
