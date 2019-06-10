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

export interface IMeta {
  currency?: string
  address?: string
  title?: string
  description?: string
  image?: string
  recommendedAmount?: string
  host?: string
}

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

// @ts-ignore
chrome.tabs.onActivated.addListener(onTabActivate)

function signout(msg: Message, callback: Callback) {
  context.setWallet(null)
}

async function onTabActivate() {
  let icon = "icon-grey"
  let title = "This page does not accept tips"

  try {
    const [response, error] = await getCurrentMeta()
    if (!error && response.meta && response.meta.currency) {
      icon = "icon-blue"
      title = "This page accepts tips"
    }
  } catch (err) {
    console.error(err)
  }

  const path = "./popup/images/" + icon + "-38.png"

  // @ts-ignore
  chrome.browserAction.setIcon({ path })
  // @ts-ignore
  chrome.browserAction.setTitle({ title })
}

export function getCurrentMeta(): Promise<
  [{ meta: IMeta | null }, Error | null]
> {
  return messagingClient.send({
    to: "tips:content",
    content: { command: "readWalletInfoFromMeta" },
    requiresReply: true,
    currentTab: true
  }) as Promise<[{ meta: IMeta | null }, Error | null]>
}
