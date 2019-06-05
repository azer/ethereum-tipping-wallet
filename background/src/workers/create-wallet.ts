import { IWallet } from "../context"

const bip39 = require("bip39")
const ethwallet = require("ethereumjs-wallet")
const hdkey = require("ethereumjs-wallet/hdkey")

type IEventHandler = (event: IEvent) => void

interface IEvent {
  data: string
}

interface IWebWorker {
  addEventListener: (event: string, callback: IEventHandler) => void
  postMessage: (payload: string) => void
}

module.exports = function(self: IWebWorker) {
  self.addEventListener("message", (ev: IEvent) => {
    var options: { password: string } = JSON.parse(ev.data)

    let wallet
    try {
      wallet = createWallet(options.password)
    } catch (err) {
      self.postMessage(JSON.stringify({ error: err.message }))
      return
    }

    self.postMessage(JSON.stringify({ wallet }))
  })
}

function createWallet(password: string): IWallet {
  const mnemonic = bip39.generateMnemonic()
  const hdwallet = hdkey.fromMasterSeed(mnemonic)
  const wallet = hdwallet.getWallet()
  const address = wallet.getAddress().toString("hex")
  const keystore = wallet.toV3(password)
  const filename = wallet.getV3Filename(Date.now())
  const privateKey = wallet.getPrivateKey().toString("hex")

  return {
    address,
    privateKey,
    keystore,
    filename
  }
}
