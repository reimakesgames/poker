class Vector2 {
	public X: number
	public Y: number

	constructor(x?: number, y?: number) {
		this.X = x || 0
		this.Y = y || 0
	}

	add(v: Vector2) {
		return new Vector2(this.X + v.X, this.Y + v.Y)
	}

	subtract(v: Vector2) {
		return new Vector2(this.X - v.X, this.Y - v.Y)
	}

	multiply(v: Vector2) {
		return new Vector2(this.X * v.X, this.Y * v.Y)
	}

	divide(v: Vector2) {
		return new Vector2(this.X / v.X, this.Y / v.Y)
	}

	scale(scalar: number) {
		return new Vector2(this.X * scalar, this.Y * scalar)
	}

	dot(v: Vector2) {
		return this.X * v.X + this.Y * v.Y
	}

	magnitude() {
		return Math.sqrt(this.X * this.X + this.Y * this.Y)
	}

	normalize() {
		const magnitude = this.magnitude()
		return new Vector2(this.X / magnitude, this.Y / magnitude)
	}

	distance(v: Vector2) {
		return this.subtract(v).magnitude()
	}

	angle(v: Vector2) {
		return Math.acos(this.dot(v) / (this.magnitude() * v.magnitude()))
	}

	clone() {
		return new Vector2(this.X, this.Y)
	}

	toString() {
		return `(${this.X}, ${this.Y})`
	}
}

export { Vector2 }
