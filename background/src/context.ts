const DEFAULT_NODE =
  "https://rinkeby.infura.io/v3/904887681c6c4f2d9f4a9ad99b3fa601"

export interface IWallet {
  address: string
  seed?: string
  privateKey?: string
  keystore?: string
  filename?: string
}

export class Context {
  node: string = DEFAULT_NODE
  wallet: IWallet | null = null

  getWallet(): IWallet | null {
    return this.wallet
  }

  setWallet(wallet: IWallet | null) {
    this.wallet = wallet
  }
}

export default new Context()
