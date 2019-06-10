import React, { useState } from "react"
import { IWallet } from "../../eth"
import Header from "../../components/Header"
import TextField from "../../components/TextField"
import FooterButton from "../../components/FooterButton"
import Button from "../../components/Button"
import Form, { Buttons } from "../../components/Form"
import Dialog from "../../components/Dialog"
import Callout from "../../components/Callout"
import { CurrencyLabel } from "./views"
import TransferConfirmation from "./TransferConfirmation"

interface IProps {
  balance: string
  wallet: IWallet
  setError: (error: Error | undefined) => void
  error?: Error
  showDepositDialog: () => void
  showTransferDialog: () => void
  hideTransferDialog: () => void
  gasPrice: string
  gasLimit: string
}

export default ({
  balance,
  error,
  setError,
  wallet,
  showDepositDialog,
  showTransferDialog,
  hideTransferDialog,
  gasLimit,
  gasPrice
}: IProps) => {
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value)

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value)

  const onClickTransfer = async () => {
    setSubmitted(true)
  }

  const onCancel = () => {
    setError(undefined)
    hideTransferDialog()
  }

  if (submitted) {
    return (
      <TransferConfirmation
        balance={balance}
        error={error}
        setError={setError}
        wallet={wallet}
        to={address}
        onCancel={onCancel}
        amount={amount}
        gasLimit={gasLimit}
        gasPrice={gasPrice}
        showDepositDialog={showDepositDialog}
        showTransferDialog={showTransferDialog}
        hideTransferDialog={hideTransferDialog}
      />
    )
  }

  return (
    <Dialog>
      <Header
        title={"Transfer"}
        desc={"Transfer $ETH from your balance to another address"}
      />
      {error ? <Callout error={error.message} /> : null}
      <Form>
        <TextField
          label="Destination Wallet:"
          placeholder="Type a valid Ethereum wallet address"
          value={`${address}`}
          onChange={onAddressChange}
        />
        <TextField label="Amount:" value={amount} onChange={onAmountChange}>
          <CurrencyLabel>ETH</CurrencyLabel>
        </TextField>
      </Form>
      <Buttons>
        <Button onClick={onClickTransfer} primary>
          Transfer from balance
        </Button>
      </Buttons>
      <FooterButton>
        Not enough funds? {` `}
        <Button onClick={showDepositDialog} minimal>
          Deposit
        </Button>
      </FooterButton>
    </Dialog>
  )
}
