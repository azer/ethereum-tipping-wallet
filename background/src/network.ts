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

  let transaction
  try {
    transaction = await transfer(
      context.wallet.address || "",
      to,
      context.wallet.privateKey || "",
      amount
    )
  } catch (err) {
    return callback(err)
  }

  callback(undefined, { transaction })
}

export function transfer(
  fromAddress: string,
  toAddress: string,
  privateKey: string,
  amount: string
): Promise<ITransactionResult> {
  return new Promise(async (resolve, reject) => {
    const nonce = network.utils.numberToHex(
      await network.eth.getTransactionCount(fromAddress)
    )

    const gasPrice = network.utils.numberToHex(await network.eth.getGasPrice())
    const gasLimit = network.utils.numberToHex(
      await network.eth.estimateGas({ to: toAddress, data: "" })
    )

    const value = network.utils.numberToHex(
      Number(network.utils.toWei(amount, "ether"))
    )

    console.log("from: %s to: %s pk: %s", fromAddress, toAddress, privateKey)
    console.log(
      "amount: %s gasPrice: %s gasLimit: %s",
      amount,
      gasPrice,
      gasLimit
    )

    const tx = new Tx({
      nonce,
      gasPrice,
      gasLimit,
      toAddress,
      value,
      data: ""
    })

    tx.sign(privateKey)

    let transactionHash: string
    let receipt: object
    let error: Error
    let isDone: boolean = false

    network.eth
      .sendSignedTransaction("0x" + tx.serialize().toString("hex"))
      .once("transactionHash", (_hash: string) => {
        transactionHash = _hash
        done()
      })
      .once("receipt", (_receipt: object) => {
        receipt = _receipt
        done()
      })
      .once("error", (_error: Error) => {
        error = _error
        done()
      })

    function done() {
      if (isDone) {
        return
      }

      if (error) {
        isDone = true
        reject(error)
        return
      }

      if (transactionHash && receipt) {
        isDone = true
        resolve({
          hash: transactionHash,
          receipt
        } as ITransactionResult)
      }
    }
  })
}
