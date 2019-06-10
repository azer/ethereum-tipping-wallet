import React from "react"
import roka from "roka"
import { IWallet } from "../../eth"
import Header from "../../components/Header"
import FooterButton from "../../components/FooterButton"
import Button from "../../components/Button"
import { Buttons } from "../../components/Form"
import Dialog from "../../components/Dialog"
import Callout from "../../components/Callout"
import CopyButton from "../../components/CopyButton"
import { trim } from "./TransferConfirmation"

const HASH_LENGTH = 35

export const Transaction = roka()
  .grid({ columns: "auto 3rem" })
  .spacing({ columns: "0.25rem" })
  .element()

export const TransactionHash = roka()
  .sans({ color: "#333" })
  .nooverflow()
  .element()

export const TransactionLabel = roka()
  .sans({ color: "#333", weight: "500" })
  .spacing({ outerBottom: "0.5rem" })
  .element()

interface IProps {
  balance: string
  wallet: IWallet
  setError: (error: Error) => void
  error?: Error
  hideTransferDialog: () => void
  showTransferDialog: () => void
  transactionHash: string
  amount: string
}

export default ({
  balance,
  error,
  setError,
  wallet,
  showTransferDialog,
  hideTransferDialog,
  transactionHash,
  amount
}: IProps) => {
  return (
    <Dialog>
      <Header
        title={"Transfer Successful"}
        desc={`You've successfully transferred ${amount} from your account.`}
      />
      {error ? <Callout error={error.message} /> : null}
      <TransactionLabel>Transaction Hash:</TransactionLabel>
      <Transaction>
        <TransactionHash title={transactionHash}>
          {trim(transactionHash, HASH_LENGTH)}
        </TransactionHash>
        <CopyButton value={transactionHash} />
      </Transaction>
      <Buttons>
        <Button onClick={hideTransferDialog} primary>
          Close
        </Button>
      </Buttons>
      <FooterButton>
        Need more transfers? {` `}
        <Button onClick={showTransferDialog} minimal>
          Transfer again
        </Button>
      </FooterButton>
    </Dialog>
  )
}
