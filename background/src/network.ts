import { Message } from "chrome-extension-messaging"
import * as Web3 from "web3"
import context from "./context"
import { Callback } from "./interfaces"

const Tx = require("ethereumjs-tx")
const BN = require("bn.js")

// @ts-ignore
const provider = new Web3.providers.HttpProvider(context.node)
// @ts-ignore
const network = new Web3(provider)

const big = (n: unknown) => new BN(n as Buffer).toString(10)

interface ITransactionResult {
  hash: string
  receipt: object
}

export async function getBalance(msg: Message, callback: Callback) {
  const address: string = msg.content["address"] as string

  let balance
  try {
    balance = big(await network.eth.getBalance(address))
  } catch (err) {
    callback(err)
  }

  callback(undefined, { address, balance })
}

export async function getGasPrice(msg: Message, callback: Callback) {
  let gasPrice
  try {
    gasPrice = await network.eth.getGasPrice()
  } catch (err) {
    callback(err)
  }

  callback(undefined, { gasPrice })
}

export async function getGasLimit(msg: Message, callback: Callback) {
  let gasLimit
  try {
    const block = await network.eth.getBlock("pending")
    gasLimit = block.gasLimit
  } catch (err) {
    callback(err)
  }

  callback(undefined, { gasLimit })
}

export async function transferTips(msg: Message, callback: Callback) {
  const to: string = msg.content["to"] as string
  const amount: string = msg.content["amount"] as string

  if (!context.wallet) {
    return callback(new Error("Wallet is inaccessible."))
  }

  const [txhash, err] = await transferFunds(
    "0x" + (context.wallet.address || ""),
    to,
    context.wallet.privateKey || "",
    amount
  )

  if (err) {
    return callback(err)
  }

  callback(undefined, { txhash: txhash })
}

export async function transferFunds(
  fromAddress: string,
  toAddress: string,
  privateKey: string,
  amount: string
): Promise<[string | null, Error | null]> {
  const transactionCount = await network.eth.getTransactionCount(fromAddress)
  const gasLimitNumber = await network.eth.estimateGas({
    to: toAddress,
    data: ""
  })
  const gasPriceNumber = await network.eth.getGasPrice()

  const nonce = network.utils.numberToHex(transactionCount)
  const gasPrice = network.utils.numberToHex(Number(gasPriceNumber))
  const gasLimit = network.utils.numberToHex(gasLimitNumber)
  const value = network.utils.numberToHex(
    Number(network.utils.toWei(amount, "ether"))
  )

  const tx = new Tx({
    nonce,
    gasPrice,
    gasLimit,
    to: toAddress,
    value,
    data: ""
  })

  tx.sign(privateKey)

  return sendTransaction("0x" + tx.serialize().toString("hex"))
}

function sendTransaction(tx: string): Promise<[string | null, Error | null]> {
  return new Promise((resolve, reject) => {
    network.eth
      .sendSignedTransaction(tx)
      .once("transactionHash", (hash: string) => {
        resolve([hash, null])
      })
      .once("error", (err: Error) => {
        resolve([null, err])
      })
  })
}
