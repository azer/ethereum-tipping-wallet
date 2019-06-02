import React, { useState } from "react"
import roka from "roka"
import Header from "../../components/Header"
import { IWallet } from "../../eth"
import Button from "../../components/Button"
import Form, { Buttons } from "../../components/Form"
import FooterButton from "../../components/FooterButton"
import Callout from "../../components/Callout"
import Option from "./Option"
import RestoreByPK from "./RestoreByPK"
import RestoreBySeed from "./RestoreBySeed"
import RestoreByKeystore from "./RestoreByKeystore"

const KEYSTORE_FILE = "keystore_file"
const SEED_PHRASE = "seed_phrase"
const PRIVATE_KEY = "private_key"

interface IProps {
  createNewWallet: () => void
  openWallet: () => void
  wallet?: IWallet
  setWallet: (wallet: IWallet) => void
  setError: (error: Error) => void
  error?: Error
}

const RestoreWallet = roka()
  .spacing({ innerBottom: "3rem" })
  .element()

export default ({
  createNewWallet,
  openWallet,
  wallet,
  setWallet,
  error,
  setError
}: IProps) => {
  const [restoreMethod, setRestoreMethod] = useState("")
  const [restoreByPK, setRestoreByPK] = useState(false)
  const [restoreBySeed, setRestoreBySeed] = useState(false)
  const [restoreByKeystore, setRestoreByKeystore] = useState(false)
  const [inprogress, setInProgress] = useState(false)

  const onToggleOption = (name: string) => {
    return () => {
      if (restoreMethod === name) {
        setRestoreMethod("")
      } else {
        setRestoreMethod(name)
      }
    }
  }

  const onClickRestore = async () => {
    if (restoreMethod === PRIVATE_KEY) {
      setRestoreBySeed(false)
      setRestoreByKeystore(false)
      return setRestoreByPK(true)
    }

    if (restoreMethod === SEED_PHRASE) {
      setRestoreByPK(false)
      setRestoreByKeystore(false)
      return setRestoreBySeed(true)
    }

    if (restoreMethod === KEYSTORE_FILE) {
      setRestoreBySeed(false)
      setRestoreByPK(false)
      return setRestoreByKeystore(true)
    }
  }

  if (restoreByKeystore) {
    return (
      <RestoreByKeystore
        createNewWallet={createNewWallet}
        error={error}
        setError={setError}
        setWallet={setWallet}
        setInProgress={setInProgress}
        inProgress={inprogress}
      />
    )
  }

  if (restoreByPK) {
    return (
      <RestoreByPK
        createNewWallet={createNewWallet}
        error={error}
        setError={setError}
        setWallet={setWallet}
        setInProgress={setInProgress}
        inProgress={inprogress}
      />
    )
  }

  if (restoreBySeed) {
    return (
      <RestoreBySeed
        createNewWallet={createNewWallet}
        error={error}
        setError={setError}
        setWallet={setWallet}
        setInProgress={setInProgress}
        inProgress={inprogress}
      />
    )
  }

  return (
    <RestoreWallet>
      <Header
        title="Access My Wallet"
        desc="All information is stored locally in your computer."
      />
      {error ? <Callout error={error.message} /> : null}
      <Form>
        <Option
          selected={restoreMethod === KEYSTORE_FILE}
          onClick={onToggleOption(KEYSTORE_FILE)}
        >
          Keystore File
        </Option>
        <Option
          selected={restoreMethod === SEED_PHRASE}
          onClick={onToggleOption(SEED_PHRASE)}
        >
          Seed Phrase
        </Option>
        <Option
          selected={restoreMethod === PRIVATE_KEY}
          onClick={onToggleOption(PRIVATE_KEY)}
        >
          Private Key
        </Option>
      </Form>
      <Buttons>
        <Button onClick={onClickRestore} primary>
          Next
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
