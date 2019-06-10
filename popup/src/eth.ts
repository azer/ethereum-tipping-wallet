import client, { background } from "./client"

export interface IWallet {
  address: string
  seed?: string
  privateKey?: string
  keystore?: string
  filename?: string
}

export function getWallet(): Promise<
  [{ wallet: IWallet | null }, Error | null]
> {
  return client.send({
    to: background,
    content: { command: "getWallet" },
    requiresReply: true
  }) as Promise<[{ wallet: IWallet | null }, Error | null]>
}

export function createWallet(
  password: string
): Promise<[{ wallet: IWallet | null }, Error | null]> {
  return client.send(
    {
      to: background,
      content: { command: "createWallet", password },
      requiresReply: true
    },
    30
  ) as Promise<[{ wallet: IWallet | null }, Error | null]>
}

export function restoreWallet(
  password: string,
  seed: string
): Promise<[{ wallet: IWallet | null }, Error | null]> {
  return client.send({
    to: background,
    content: { command: "restoreWallet", password, seed },
    requiresReply: true
  }) as Promise<[{ wallet: IWallet | null }, Error | null]>
}

export function restoreWalletByPK(
  privateKey: string
): Promise<[{ wallet: IWallet | null }, Error | null]> {
  return client.send({
    to: background,
    content: { command: "restoreWalletByPK", privateKey },
    requiresReply: true
  }) as Promise<[{ wallet: IWallet | null }, Error | null]>
}

export function restoreWalletBySeed(
  seed: string,
  password: string
): Promise<[{ wallet: IWallet | null }, Error | null]> {
  return client.send({
    to: background,
    content: { command: "restoreWalletBySeed", seed, password },
    requiresReply: true
  }) as Promise<[{ wallet: IWallet | null }, Error | null]>
}

export function restoreWalletByKeystore(
  keystore: string,
  password: string
): Promise<[{ wallet: IWallet | null }, Error | null]> {
  return client.send(
    {
      to: background,
      content: { command: "restoreWalletByKeystore", keystore, password },
      requiresReply: true
    },
    30
  ) as Promise<[{ wallet: IWallet | null }, Error | null]>
}

export function getBalance(
  address: string
): Promise<[{ balance: string | null; address: string | null }, Error | null]> {
  return client.send({
    to: background,
    content: { command: "getBalance", address },
    requiresReply: true
  }) as Promise<
    [{ balance: string | null; address: string | null }, Error | null]
  >
}

export function getGasPrice(): Promise<
  [{ gasPrice: string | null }, Error | null]
> {
  return client.send({
    to: background,
    content: { command: "getGasPrice" },
    requiresReply: true
  }) as Promise<[{ gasPrice: string | null }, Error | null]>
}

export function getGasLimit(): Promise<
  [{ gasLimit: string | null }, Error | null]
> {
  return client.send({
    to: background,
    content: { command: "getGasLimit" },
    requiresReply: true
  }) as Promise<[{ gasLimit: string | null }, Error | null]>
}

export function transferFunds(
  to: string,
  amount: string
): Promise<[{ txhash: string | null }, Error | null]> {
  return client.send({
    to: background,
    content: { command: "transferTips", amount, to },
    requiresReply: true
  }) as Promise<[{ txhash: string | null }, Error | null]>
}

export function signout(): Promise<[{ balance: string | null }, Error | null]> {
  return client.send({
    to: background,
    content: { command: "signout" }
  }) as Promise<[{ balance: string | null }, Error | null]>
}
