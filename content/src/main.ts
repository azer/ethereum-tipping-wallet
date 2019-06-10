import {
  Message,
  ContentClient,
  IMessageContent
} from "chrome-extension-messaging"

export type Callback = (
  error: Error | undefined,
  result?: IMessageContent
) => void

const messagingClient = new ContentClient("tips", {
  readWalletInfoFromMeta
})

export function readWalletInfoFromMeta(msg: Message, callback: Callback) {
  const currency = meta("wallet:currency")
  const address = meta("wallet:address")
  const recommendedAmount =
    meta("wallet:recommended_amount") ||
    meta("wallet:recommendedAmount") ||
    meta("wallet:recommended-amount") ||
    meta("wallet:recommendedamount")
  const title = meta("wallet:title") || meta("og:title") || document.title
  const description =
    meta("wallet:description") ||
    meta("og:description") ||
    `On ${cleanHost(document.location.host)}`
  const image = meta("wallet:image") || meta("og:image")

  return callback(undefined, {
    meta: {
      currency,
      address,
      title,
      description,
      image,
      recommendedAmount,
      host: cleanHost(document.location.host)
    }
  })
}

function meta(property: string): string | null {
  const el = findMetaElement(property)

  if (el) {
    return el.content
  }

  return null
}

function findMetaElement(property: string): HTMLMetaElement | null {
  return (
    document.querySelector(`meta[name='${property}']`) ||
    document.querySelector(`meta[property='${property}']`)
  )
}

function cleanHost(host: string): string {
  return host.replace(/^www\./, "")
}
