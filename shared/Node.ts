class Node {
	public Ready(): void {}
	public Update(deltaTime: number): void {}
	/**
	 * @param deltaTime Time since last frame in milliseconds
	 */
	public Draw(deltaTime: number): void {}

	public Name = "Node"

	AddChild(child: Node): void {
		child._parent = this
		this._children.push(child)
		child._ready()
	}

	_children: Node[] = []
	_parent: Node | null = null

	_log(message: string): void {
		console.log(`${this.Name}: ${message}`)
	}

	_ready(): void {
		this._children.forEach((child) => {
			child._ready()
		})
		this._log("Ready")
		this.Ready()
	}

	_update(deltaTime: number): void {
		this.Update(deltaTime)
		this._children.forEach((child) => {
			child._update(deltaTime)
		})
	}

	_draw(deltaTime: number): void {
		this.Draw(deltaTime)
		this._children.forEach((child) => {
			child._draw(deltaTime)
		})
	}
}

export { Node }
