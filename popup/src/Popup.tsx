import React, { useState, useEffect } from "react"
import roka from "roka"
import Button from "./components/Button"
import CreateWallet from "./containers/CreateWallet"
import RestoreWallet from "./containers/RestoreWallet"
import Wallet from "./containers/Wallet"
import { Heading, Subheading } from "./components/Typography"
import { getWallet, signout as sendSignoutSignal } from "./eth"
import { getCurrentMeta } from "./tab"
import DONATION_META from "./donation-meta"

const Popup = roka()
  .size({ width: "20rem" })
  .spacing({ around: "1.5rem" })
  .sans({ size: "1rem" })
  .element()

const Buttons = roka()
  .grid({ columns: "auto auto" })
  .spacing({ columns: "0.5rem" })
  .element()

export default () => {
  const [creatingNewWallet, setCreateNewWallet] = useState(false)
  const [restoringWallet, setRestoreWallet] = useState(false)
  const [wallet, setWallet] = useState()
  const [meta, setMeta] = useState()
  const [error, setError] = useState<Error | undefined>()

  useEffect(() => {
    if (!wallet) {
      fetchWallet()
    }

    if (!meta) {
      fetchMeta()
    }

    async function fetchWallet() {
      const [response, err] = await getWallet()
      if (err) {
        return setError(err)
      }

      if (response.wallet) {
        return setWallet(response.wallet)
      }
    }

    async function fetchMeta() {
      const [response, err] = await getCurrentMeta()

      if (err) {
        setMeta(DONATION_META)
        console.error("Failed to fetch meta", err)
        // return setError(err)
      }

      if (response && response.meta) {
        return setMeta(response.meta)
      }
    }
  }, [wallet, meta])

  const createNewWallet = () => {
    setCreateNewWallet(true)
    setRestoreWallet(false)
  }

  const restoreWallet = () => {
    setRestoreWallet(true)
    setCreateNewWallet(false)
  }

  const openWallet = () => {
    setRestoreWallet(false)
    setCreateNewWallet(false)
  }

  const signout = () => {
    setWallet(null)
    sendSignoutSignal()
  }

  if (wallet) {
    return (
      <Popup>
        <Wallet
          meta={meta}
          wallet={wallet}
          signout={signout}
          error={error}
          setError={setError}
        />
      </Popup>
    )
  }

  if (creatingNewWallet) {
    return (
      <Popup>
        <CreateWallet
          wallet={wallet}
          setWallet={setWallet}
          error={error}
          setError={setError}
          restoreWallet={restoreWallet}
          openWallet={openWallet}
        />
      </Popup>
    )
  }

  if (restoringWallet) {
    return (
      <Popup>
        <RestoreWallet
          wallet={wallet}
          setWallet={setWallet}
          error={error}
          setError={setError}
          createNewWallet={createNewWallet}
          openWallet={openWallet}
        />
      </Popup>
    )
  }

  return (
    <Popup>
      <Heading>Hey there, let's start!</Heading>
      <Subheading>We need an Ethereum wallet to start sending tips.</Subheading>
      <Buttons>
        <Button onClick={createNewWallet} primary>
          Create New Wallet
        </Button>
        <Button onClick={restoreWallet}>Access My Wallet</Button>
      </Buttons>
    </Popup>
  )
}
