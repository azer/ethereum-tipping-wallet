import { Message, IMessageContent } from "chrome-extension-messaging"
import * as bip39 from "bip39"
import { Callback } from "./interfaces"
import context, { IWallet } from "./context"
import constants from "./constants"

// @ts-ignore
import * as ethwallet from "ethereumjs-wallet"
// @ts-ignore
import * as hdkey from "ethereumjs-wallet/hdkey"

const work = require("webworkify")

export function getWallet(msg: Message, callback: Callback) {
  callback(undefined, { wallet: context.getWallet() })
}

export function createWallet(msg: Message, callback: Callback) {
  const password: string = msg.content["password"] as string

  const w = work(require("./workers/create-wallet"))
  w.addEventListener("message", function(ev: { data: string }) {
    const parsed = JSON.parse(ev.data)
    const error = parsed.error
    if (error) {
      return callback(new Error(error))
    }

    const wallet = parsed.wallet
    context.setWallet(wallet)
    callback(undefined, {
      wallet: context.getWallet()
    })
  })

  w.postMessage(JSON.stringify({ password }))
}

export function restoreWalletByPK(msg: Message, callback: Callback) {
  const privateKey: string = msg.content["privateKey"] as string

  let wallet, address
  try {
    wallet = ethwallet.fromPrivateKey(Buffer.from(privateKey, "hex"))
    address = wallet.getAddress().toString("hex")
  } catch (err) {
    return callback(err)
  }

  context.setWallet({
    address,
    privateKey
  })

  callback(undefined, {
    wallet: context.getWallet()
  })
}

export function restoreWalletBySeed(msg: Message, callback: Callback) {
  const seed: string = msg.content["seed"] as string
  const password: string = msg.content["password"] as string

  let hdwallet, wallet
  try {
    hdwallet = hdkey.fromMasterSeed(seed, password)
    wallet = hdwallet.getWallet()
  } catch (err) {
    return callback(err)
  }

  context.setWallet({
    address: wallet.getAddress().toString("hex"),
    privateKey: wallet.getPrivateKey()
  })

  callback(undefined, {
    wallet: context.getWallet()
  })
}

export function restoreWalletByKeystore(msg: Message, callback: Callback) {
  const keystore: string = msg.content["keystore"] as string
  const password: string = msg.content["password"] as string

  const w = work(require("./workers/restore-wallet"))
  w.addEventListener("message", function(ev: { data: string }) {
    const parsed = JSON.parse(ev.data)
    const error = parsed.error
    if (error) {
      return callback(new Error(error))
    }

    const wallet = parsed.wallet
    context.setWallet(wallet)
    callback(undefined, {
      wallet: context.getWallet()
    })
  })

  w.postMessage(JSON.stringify({ password, keystore }))
}
