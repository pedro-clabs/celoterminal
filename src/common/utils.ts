import BigNumber from 'bignumber.js'

export const sleep = (milliseconds: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export class CancelPromise {
	private cancelled = false
	private p
	private resolve?: (value: void | PromiseLike<void>) => void
	constructor() {
		this.p = new Promise<void>((resolve) => {
			this.resolve = resolve
		})
	}

	cancel = (): void => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.resolve!()
		this.cancelled = true
	}

	isCancelled = (): boolean => {
		return this.cancelled
	}

	cancelPromise = (): Promise<void> => {
		return this.p
	}
}

export const fmtAmount = (v: BigNumber, decimals: number, precision?: number): string => {
	return v.shiftedBy(-decimals).toFixed(precision || 4)
}

export const fmtAddress = (address: string): string => {
	return `${address.slice(0, 6)}...${address.slice(address.length-4)}`
}