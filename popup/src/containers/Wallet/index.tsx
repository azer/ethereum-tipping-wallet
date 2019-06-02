import React, { useEffect, useState } from "react"
import { getBalance, getGasPrice, getGasLimit, IWallet } from "../../eth"
import { IMeta } from "../../tab"
import NoFunds from "./NoFunds"
import Tip from "./Tip"

interface IProps {
  wallet: IWallet
  meta: IMeta
  setError: (error: Error) => void
  signout: () => void
  error?: Error
}

export default ({ wallet, meta, error, setError, signout }: IProps) => {
  const [balance, setBalance] = useState()
  const [gasPrice, setGasPrice] = useState()
  const [gasLimit, setGasLimit] = useState()
  const [skipNoFundsDialog, setSkipNoFundsDialog] = useState(false)
  const onClickSkipNoFunds = () => setSkipNoFundsDialog(true)

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

  if (isEmpty(balance) && !skipNoFundsDialog) {
    return (
      <NoFunds
        wallet={wallet}
        setError={setError}
        signout={signout}
        error={error}
        onClickSkip={onClickSkipNoFunds}
      />
    )
  }

  if (!meta) {
    return null
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
    />
  )
}

function isEmpty(balance: string): boolean {
  return Number(balance) === 0
}
