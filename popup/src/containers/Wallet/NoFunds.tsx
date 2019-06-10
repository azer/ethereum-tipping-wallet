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
  hideDepositDialog: () => void
}

export default ({ error, hideDepositDialog, wallet, signout }: IProps) => {
  return (
    <Dialog>
      <Header
        title={"Not enough funds"}
        desc={"Please deposit some $ETH to your account."}
      />
      <TextField
        label="Your Wallet Address:"
        multiline
        disabled
        noresize
        value={`0x${wallet.address}`}
      />
      <Buttons>
        <Button onClick={hideDepositDialog} primary>
          Skip
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
