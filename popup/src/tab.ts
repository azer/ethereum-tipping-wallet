import client, { content } from "./client"

export interface IMeta {
  currency?: string
  address?: string
  title?: string
  description?: string
  image?: string
  recommendedAmount?: string
  host?: string
}

export function getCurrentMeta(): Promise<
  [{ meta: IMeta | null }, Error | null]
> {
  return client.send({
    to: content,
    content: { command: "readWalletInfoFromMeta" },
    requiresReply: true,
    currentTab: true
  }) as Promise<[{ meta: IMeta | null }, Error | null]>
}
