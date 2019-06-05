import { IWallet } from "../context"
import { callbackify } from "util"

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
    var options: { password: string; keystore: string } = JSON.parse(ev.data)

    let wallet
    try {
      wallet = restoreWalletFromKeystore(options.keystore, options.password)
    } catch (err) {
      self.postMessage(JSON.stringify({ error: err.message }))
      return
    }

    self.postMessage(JSON.stringify({ wallet }))
  })
}

function restoreWalletFromKeystore(
  keystore: string,
  password: string
): IWallet {
  const wallet = ethwallet.fromV3(keystore.toLowerCase(), password)
  const address = wallet.getAddress().toString("hex")
  const privateKey = wallet.getPrivateKey()

  return {
    address,
    privateKey
  }
}
