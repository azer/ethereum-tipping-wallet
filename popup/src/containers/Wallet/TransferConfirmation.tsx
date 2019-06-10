import React, { useState } from "react"
import { transferFunds, IWallet } from "../../eth"
import Dialog from "../../components/Dialog"
import Button from "../../components/Button"
import { Buttons } from "../../components/Form"
import CopyButton from "../../components/CopyButton"
import Header from "../../components/Header"
import Spinner from "../../components/Spinner"
import Callout from "../../components/Callout"
import SuccessfulTransfer from "./SuccessfulTransfer"
import {
  Details,
  DetailLabel,
  Address,
  AddressValue,
  DetailValue
} from "./views"

const ADDRESS_LIMIT_CHAR = 20

interface IProps {
  balance: string
  wallet: IWallet
  to: string
  error?: Error
  setError: (error: Error | undefined) => void
  gasPrice: string
  gasLimit: string
  showDepositDialog: () => void
  showTransferDialog: () => void
  hideTransferDialog: () => void
  onCancel: () => void
  amount: string
}

export default ({
  amount,
  wallet,
  to,
  error,
  balance,
  gasLimit,
  gasPrice,
  setError,
  showDepositDialog,
  showTransferDialog,
  hideTransferDialog,
  onCancel
}: IProps) => {
  const [transactionHash, setTransactionHash] = useState()
  const [inProgress, setInProgress] = useState()

  const onConfirm = async () => {
    setError(undefined)

    if (isEmpty(balance)) {
      showDepositDialog()
      return
    }

    setInProgress(true)
    const [response, err] = await transferFunds(to, amount)
    setInProgress(false)

    if (err) {
      return setError(err)
    }

    if (response.txhash) {
      setTransactionHash(response.txhash)
    }
  }

  if (transactionHash) {
    return (
      <SuccessfulTransfer
        balance={balance}
        error={error}
        setError={setError}
        wallet={wallet}
        showTransferDialog={showTransferDialog}
        hideTransferDialog={hideTransferDialog}
        transactionHash={transactionHash}
        amount={amount}
      />
    )
  }

  return (
    <Dialog>
      <Header
        title="Confirmation"
        desc="Please read the details and confirm the transfer"
      />
      {error ? <Callout error={error.message} /> : null}
      <Details visible={true}>
        <DetailLabel>Amount:</DetailLabel>{" "}
        <DetailValue>{amount} ETH</DetailValue>
        <DetailLabel>Balance:</DetailLabel>{" "}
        <DetailValue>{formatBalance(balance)} ETH</DetailValue>
        <DetailLabel>From:</DetailLabel>
        <DetailValue>
          <Address>
            <AddressValue title={wallet.address}>
              {formatAddress(wallet.address || "")}
            </AddressValue>
            <CopyButton value={wallet.address || ""} />
          </Address>
        </DetailValue>
        <DetailLabel>To:</DetailLabel>
        <DetailValue>
          <Address>
            <AddressValue title={to}>{formatAddress(to)}</AddressValue>
            <CopyButton value={to} />
          </Address>
        </DetailValue>
        <DetailLabel>Gas Price:</DetailLabel>
        <DetailValue>{formatGasPrice(gasPrice)} gwei</DetailValue>
        <DetailLabel>Gas Limit:</DetailLabel>
        <DetailValue>{gasLimit} gas</DetailValue>
      </Details>
      <Buttons>
        <Button onClick={onConfirm} primary>
          {inProgress ? <Spinner /> : "Confirm"}
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Buttons>
    </Dialog>
  )
}

export function formatBalance(balance: string): string {
  if (!balance) {
    return "0"
  }

  return balance.slice(0, balance.length - 18) || "0"
}

export function formatGasPrice(gas: string): string {
  if (!gas) {
    return ""
  }

  return gas.slice(0, gas.length - 19)
}

export function formatAddress(address: string): string {
  if (!address.startsWith("0x")) {
    address = "0x" + address
  }

  return trim(address, ADDRESS_LIMIT_CHAR)
}

export function trim(text: string, length: number): string {
  if (text.length <= length) {
    return text
  }

  return (
    text.slice(0, length / 2 - 1) +
    "..." +
    text.slice(text.length - (length / 2 - 2))
  )
}

export function isEmpty(balance: string): boolean {
  return Number(balance) === 0
}
