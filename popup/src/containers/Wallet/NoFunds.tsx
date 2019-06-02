import React from "react"
import { IWallet } from "../../eth"
import Header from "../../components/Header"
import TextField from "../../components/TextField"
import FooterButton from "../../components/FooterButton"
import Button from "../../components/Button"
import { Buttons } from "../../components/Form"
import Dialog from "../../components/Dialog"

interface IProps {
  wallet: IWallet
  setError: (error: Error) => void
  signout: () => void
  error?: Error
  onClickSkip: () => void
}

export default ({ error, wallet, signout, onClickSkip }: IProps) => {
  return (
    <Dialog>
      <Header
        title={"Almost there!"}
        desc={
          "Your wallet doesn't have funds yet. Please deposit some $ETH to start."
        }
      />
      <TextField
        label="Your Wallet Address:"
        multiline
        disabled
        noresize
        value={`0x${wallet.address}`}
      />
      <Buttons>
        <Button onClick={onClickSkip} primary>
          Next
        </Button>
      </Buttons>
      <FooterButton>
        Want to access another wallet? {` `}
        <Button onClick={signout} minimal>
          Sign out
        </Button>
      </FooterButton>
    </Dialog>
  )
}
