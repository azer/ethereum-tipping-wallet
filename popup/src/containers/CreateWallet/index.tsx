import React, { useState } from "react"
import roka from "roka"
import { IWallet, createWallet } from "../../eth"
import TextField from "../../components/TextField"
import Button from "../../components/Button"
import FooterButton from "../../components/FooterButton"
import { Buttons } from "../../components/Form"
import Header from "../../components/Header"
import Callout from "../../components/Callout"

interface IProps {
  restoreWallet: () => void
  openWallet: () => void
  setWallet: (wallet: IWallet) => void
  wallet?: IWallet
  setError: (error: Error) => void
  error?: Error
}

const CreateWallet = roka()
  .spacing({ innerBottom: "3rem" })
  .element()

export default ({
  restoreWallet,
  wallet,
  setWallet,
  openWallet,
  error,
  setError
}: IProps) => {
  const [createdWallet, setCreatedWallet] = useState()
  const [password, setPassword] = useState("")
  const [inprogress, setInProgress] = useState(false)

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const onClickCreate = async () => {
    setInProgress(true)
    const [response, err] = await createWallet(password)
    setInProgress(false)

    if (err) {
      return setError(err)
    }

    if (response.wallet) {
      setCreatedWallet(response.wallet)
    }
  }

  const downloadKeystoreFile = () => {
    if (!createdWallet || !createdWallet.keystore) {
      return
    }

    const blob = new Blob(
      [JSON.stringify(createdWallet.keystore) as BlobPart],
      {
        type: "application/json"
      }
    )

    const elem = window.document.createElement("a")
    elem.href = window.URL.createObjectURL(blob)
    elem.setAttribute("download", createdWallet.filename)
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)

    setWallet(createdWallet)
  }

  if (createdWallet) {
    return (
      <CreateWallet>
        <Header
          title="Save My Keystore File"
          desc="Please save your keystore file safely. You'll need it to access your wallet."
        />
        <Callout success="Created a new wallet successfully." />
        <TextField
          label="Your wallet address:"
          value={createdWallet.address}
          noresize
          multiline
          disabled
        />
        <Buttons>
          <Button onClick={downloadKeystoreFile} primary>
            Download Keystore File
          </Button>
        </Buttons>
      </CreateWallet>
    )
  }

  return (
    <CreateWallet>
      <Header
        title="Create New Wallet"
        desc="All information is stored locally in your computer."
      />
      {error ? <Callout error={error.message} /> : null}
      <TextField
        label="Password for encryption:"
        placeholder="Enter at least 6 characters"
        value={password}
        onChange={onPasswordChange}
        type="password"
        autocomplete={false}
      />
      <Buttons>
        <Button onClick={onClickCreate} primary disabled={inprogress}>
          {inprogress ? "Please wait..." : "Next"}
        </Button>
      </Buttons>
      <FooterButton>
        Already have a wallet?{" "}
        <Button onClick={restoreWallet} minimal>
          Access My Wallet
        </Button>
      </FooterButton>
    </CreateWallet>
  )
}
