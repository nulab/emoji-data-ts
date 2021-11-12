export const multiplyPos  = (x: number, y: number, sc:number, sr: number): {x: number, y: number} => {
	const multiplyX = 100 / (sc - 1)
	const multiplyY = 100 / (sr - 1)

	return {x: x * multiplyX , y: y * multiplyY}
}
