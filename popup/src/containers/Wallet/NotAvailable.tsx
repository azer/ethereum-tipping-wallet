import React from "react"
import roka from "roka"
import { IWallet } from "../../eth"
import Callout from "../../components/Callout"
import FooterButton from "../../components/FooterButton"
import Button from "../../components/Button"
import { Buttons } from "../../components/Form"
import { IMeta } from "../../tab"
import {
  Header,
  Profile,
  ProfileText,
  ProfileTitle,
  ProfileDesc,
  Image
} from "./views"

interface IProps {
  balance: string
  wallet: IWallet
  meta: IMeta
  error?: Error
  setError: (error: Error) => void
  showDepositDialog: () => void
  showTransferDialog: () => void
}

const noop = () => null

const NotAvailable = roka()
  .spacing({ innerTop: "2rem", innerBottom: "3rem" })
  .element("div")

export default ({
  wallet,
  meta,
  error,
  balance,
  setError,
  showDepositDialog,
  showTransferDialog
}: IProps) => {
  return (
    <NotAvailable>
      <Header>{meta.host} does not accept tips :(</Header>
      {error ? <Callout error={error.message} /> : null}
      <Profile>
        <Image
          enabled={false}
          src={meta.image || "./images/icon-grey-filled.png"}
        />
        <ProfileText>
          <ProfileTitle>{meta.title}</ProfileTitle>
          <ProfileDesc>{shorten(meta.description || "", 50)}</ProfileDesc>
        </ProfileText>
      </Profile>
      <Buttons>
        <Button onClick={noop} disabled>
          Tipping not enabled
        </Button>
      </Buttons>
      {Number(balance) === 0 ? (
        <FooterButton>
          You don{`'`}t have funds yet.{` `}
          <Button onClick={showDepositDialog} minimal>
            Deposit
          </Button>
        </FooterButton>
      ) : (
        <FooterButton>
          Already got the address?{` `}
          <Button onClick={showTransferDialog} minimal>
            Transfer
          </Button>
        </FooterButton>
      )}
    </NotAvailable>
  )
}

function shorten(text: string, len: number): string {
  if (text.length < len) {
    return text
  }

  return text.slice(0, len - 3) + "..."
}
