import React, { useState } from "react"
import roka from "roka"
import TextField from "../../components/TextField"
import Header from "../../components/Header"
import Callout from "../../components/Callout"
import Form, { Buttons } from "../../components/Form"
import FooterButton from "../../components/FooterButton"
import Button from "../../components/Button"
import { IWallet, restoreWalletByPK } from "../../eth"

interface IProps {
  createNewWallet: () => void
  setError: (error: Error) => void
  setWallet: (wallet: IWallet) => void
  setInProgress: (inprogress: boolean) => void
  inProgress: boolean
  error?: Error
}

const RestoreWallet = roka()
  .spacing({ innerBottom: "3rem" })
  .element()

export default ({
  createNewWallet,
  error,
  setError,
  setWallet,
  setInProgress,
  inProgress
}: IProps) => {
  const [pk, setPK] = useState("")

  const onPKChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPK(e.target.value)

  const onClickRestore = async () => {
    setInProgress(true)
    const [response, err] = await restoreWalletByPK(pk)
    setInProgress(false)

    if (err) {
      return setError(err)
    }

    if (response.wallet) {
      setWallet(response.wallet)
    }
  }

  return (
    <RestoreWallet>
      <Header
        title="Access By Private Key"
        desc="All information is stored locally in your computer."
      />
      {error ? <Callout error={error.message} /> : null}
      <Form>
        <TextField
          label="Private key:"
          placeholder="Please enter your private key"
          value={pk}
          onChange={onPKChange}
        />
      </Form>
      <Buttons>
        <Button onClick={onClickRestore} primary disabled={inProgress}>
          {inProgress ? "Please wait..." : "Continue"}
        </Button>
      </Buttons>
      <FooterButton>
        Do not have a wallet?{" "}
        <Button onClick={createNewWallet} minimal>
          Create a new wallet
        </Button>
      </FooterButton>
    </RestoreWallet>
  )
}
