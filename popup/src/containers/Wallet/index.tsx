import React, { useEffect, useState } from "react"
import { getBalance, getGasPrice, getGasLimit, IWallet } from "../../eth"
import { IMeta } from "../../tab"
import NoFunds from "./NoFunds"
import Tip from "./Tip"
import NotAvailable from "./NotAvailable"
import Transfer from "./Transfer"
import Dialog from "../../components/Dialog"
import Callout from "../../components/Callout"

interface IProps {
  wallet: IWallet
  meta: IMeta
  setError: (error: Error | undefined) => void
  signout: () => void
  error?: Error
}

export default ({ wallet, meta, error, setError, signout }: IProps) => {
  const [balance, setBalance] = useState()
  const [gasPrice, setGasPrice] = useState()
  const [gasLimit, setGasLimit] = useState()
  const [showDepositDialog, setShowDepositDialog] = useState(false)
  const [showTransferDialog, setShowTransferDialog] = useState(false)

  const onClickShowDepositDialog = () => setShowDepositDialog(true)
  const onClickHideDepositDialog = () => setShowDepositDialog(false)
  const onClickShowTransferDialog = () => {
    setShowTransferDialog(false)
    setShowTransferDialog(true)
    setError(undefined)
  }
  const onClickHideTransferDialog = () => setShowTransferDialog(false)

  useEffect(() => {
    fetchBalance()
    fetchGasPrice()
    fetchGasLimit()

    async function fetchBalance() {
      const [response, err] = await getBalance(wallet.address)
      if (err) {
        return setError(err)
      }

      if (response.balance && response.address === wallet.address) {
        setBalance(response.balance)
      }
    }

    async function fetchGasPrice() {
      const [response, err] = await getGasPrice()
      if (err) {
        return setError(err)
      }

      if (response.gasPrice) {
        setGasPrice(response.gasPrice)
      }
    }

    async function fetchGasLimit() {
      const [response, err] = await getGasLimit()
      if (err) {
        return setError(err)
      }

      if (response.gasLimit) {
        setGasLimit(response.gasLimit)
      }
    }
  }, [])

  if (showDepositDialog) {
    return (
      <NoFunds
        wallet={wallet}
        setError={setError}
        signout={signout}
        error={error}
        hideDepositDialog={onClickHideDepositDialog}
      />
    )
  }

  if (!meta) {
    return (
      <Dialog>
        <Callout error="Unable to read the content of the page. Please refresh." />
      </Dialog>
    )
  }

  if (showTransferDialog) {
    return (
      <Transfer
        wallet={wallet}
        balance={balance}
        error={error}
        setError={setError}
        showDepositDialog={onClickShowDepositDialog}
        showTransferDialog={onClickShowTransferDialog}
        hideTransferDialog={onClickHideTransferDialog}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
      />
    )
  }

  if (
    !meta ||
    (meta && meta.currency && meta.currency.toLowerCase() !== "eth") ||
    (meta && !meta.address) ||
    (meta && !meta.currency)
  ) {
    return (
      <NotAvailable
        wallet={wallet}
        meta={meta}
        balance={balance}
        error={error}
        setError={setError}
        showDepositDialog={onClickShowDepositDialog}
        showTransferDialog={onClickShowTransferDialog}
      />
    )
  }

  return (
    <Tip
      gasPrice={gasPrice}
      gasLimit={gasLimit}
      balance={balance}
      wallet={wallet}
      meta={meta}
      setError={setError}
      signout={signout}
      error={error}
      showDepositDialog={onClickShowDepositDialog}
    />
  )
}
