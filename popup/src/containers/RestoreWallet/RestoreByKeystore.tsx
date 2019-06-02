import React, { useState } from "react"
import roka from "roka"
import TextField from "../../components/TextField"
import Header from "../../components/Header"
import Callout from "../../components/Callout"
import Form, { Buttons } from "../../components/Form"
import FooterButton from "../../components/FooterButton"
import Button from "../../components/Button"
import { IWallet, restoreWalletByKeystore } from "../../eth"

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
  inProgress,
  setInProgress
}: IProps) => {
  const [ks, setKS] = useState("")
  const [password, setPassword] = useState("")

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const onKSChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKS(e.target.value)

  const onClickRestore = async () => {
    setInProgress(true)
    const [response, err] = await restoreWalletByKeystore(ks, password)
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
        title="Access By Keystore File"
        desc="All information is stored locally in your computer."
      />
      {error ? <Callout error={error.message} /> : null}
      <Form>
        <TextField
          label="Keystore File:"
          placeholder="Please copy paste the contents of your keystore file here"
          value={ks}
          onChange={onKSChange}
          multiline
        />
        <TextField
          label="Password:"
          placeholder="Optional"
          type="password"
          value={password}
          onChange={onPasswordChange}
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
