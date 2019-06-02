import { Message, BackgroundClient } from "chrome-extension-messaging"
import { Callback } from "./interfaces"
import constants from "./constants"
import context from "./context"
import { getBalance, getGasPrice, getGasLimit, transferTips } from "./network"
import {
  getWallet,
  createWallet,
  restoreWalletByPK,
  restoreWalletBySeed,
  restoreWalletByKeystore
} from "./wallet"

const messagingClient = new BackgroundClient("tips", {
  signout,
  getBalance,
  getGasPrice,
  getGasLimit,
  getWallet,
  transferTips,
  createWallet,
  restoreWalletByPK,
  restoreWalletBySeed,
  restoreWalletByKeystore
})

function signout(msg: Message, callback: Callback) {
  context.setWallet(null)
}
