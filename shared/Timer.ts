import { Node } from "./Node.js"

class Timer extends Node {
	public TimeLeft: number = 0
	public OneShot: boolean = false

	public Update(deltaTime: number): void {
		this.TimeLeft -= deltaTime
		if (this.TimeLeft <= 0) {
			this.TimeLeft = 0
		}
		for (let i = 0; i < this._resolves.length; i++) {
			let resolve = this._resolves[i]
			if (this.TimeLeft <= 0) {
				if (resolve) {
					resolve()
				}
				this._resolves.splice(i, 1)
				i--
			}
		}
	}

	public Await(time: number): Promise<void> {
		this.TimeLeft = time
		return new Promise((resolve) => {
			this._resolves.push(resolve)
		})
	}

	_resolves: (() => void)[] = []
}

export { Timer }
