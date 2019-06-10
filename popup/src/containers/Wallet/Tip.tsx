import React, { useEffect, useState } from "react"
import roka from "roka"
import { IWallet } from "../../eth"
import TextField from "../../components/TextField"
import Callout from "../../components/Callout"
import FooterButton from "../../components/FooterButton"
import Button from "../../components/Button"
import { Buttons } from "../../components/Form"
import CopyButton from "../../components/CopyButton"
import { IMeta } from "../../tab"
import TransferConfirmation, {
  formatBalance,
  formatAddress,
  formatGasPrice
} from "./TransferConfirmation"
import {
  Header,
  Profile,
  ProfileText,
  ProfileTitle,
  ProfileDesc,
  Image,
  Details,
  DetailLabel,
  Address,
  AddressValue,
  CurrencyLabel,
  DetailValue
} from "./views"

interface IProps {
  balance: string
  wallet: IWallet
  meta: IMeta
  signout: () => void
  error?: Error
  setError: (error: Error | undefined) => void
  gasPrice: string
  gasLimit: string
  showDepositDialog: () => void
}

const Tip = roka()
  .spacing({ innerTop: "2rem", innerBottom: "3rem" })
  .element("div")

export default ({
  wallet,
  meta,
  error,
  balance,
  gasLimit,
  gasPrice,
  setError,
  showDepositDialog
}: IProps) => {
  const [amount, setAmount] = useState()
  const [showDetails, setShowDetails] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onClickShowDetails = () => setShowDetails(true)
  const onClickHideDetails = () => setShowDetails(false)

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value)

  const onClickReset = () => {
    setError(undefined)
    setAmount(meta.recommendedAmount)
    setShowDetails(false)
    setSubmitted(false)
  }

  const onClickTip = async () => {
    setSubmitted(true)
  }

  useEffect(() => {
    if (meta && meta.recommendedAmount) {
      setAmount(meta.recommendedAmount)
    }
  }, [])

  if (submitted) {
    return (
      <TransferConfirmation
        balance={balance}
        error={error}
        setError={setError}
        wallet={wallet}
        to={meta.address || ""}
        onCancel={onClickReset}
        amount={amount}
        gasLimit={gasLimit}
        gasPrice={gasPrice}
        showDepositDialog={showDepositDialog}
        showTransferDialog={onClickReset}
        hideTransferDialog={onClickReset}
      />
    )
  }

  return (
    <Tip>
      <Header>{meta.host} accepts tips!</Header>
      {error ? <Callout error={error.message} /> : null}
      <Profile>
        <Image src={meta.image || "./images/icon-grey-filled.png"} enabled />
        <ProfileText>
          <ProfileTitle>{meta.title}</ProfileTitle>
          <ProfileDesc>{meta.description}</ProfileDesc>
        </ProfileText>
      </Profile>
      <TextField label="Amount:" value={amount} onChange={onAmountChange}>
        <CurrencyLabel>ETH</CurrencyLabel>
      </TextField>
      <Buttons>
        <Button onClick={onClickTip} primary>
          Tip from balance
        </Button>
      </Buttons>
      <Details visible={showDetails}>
        <DetailLabel>Balance:</DetailLabel>{" "}
        <DetailValue>{formatBalance(balance)} ETH</DetailValue>
        <DetailLabel>From:</DetailLabel>
        <DetailValue>
          <Address>
            <AddressValue title={wallet.address}>
              {formatAddress(wallet.address || "")}
            </AddressValue>
            <CopyButton value={wallet.address || ""} />
          </Address>
        </DetailValue>
        <DetailLabel>To:</DetailLabel>
        <DetailValue>
          <Address>
            <AddressValue title={meta.address}>
              {formatAddress(meta.address || "")}
            </AddressValue>
            <CopyButton value={meta.address || ""} />
          </Address>
        </DetailValue>
        <DetailLabel>Gas Price:</DetailLabel>
        <DetailValue>{formatGasPrice(gasPrice)} gwei</DetailValue>
        <DetailLabel>Gas Limit:</DetailLabel>
        <DetailValue>{gasLimit} gas</DetailValue>
      </Details>
      <FooterButton>
        {""}
        {showDetails ? (
          <Button onClick={onClickHideDetails} minimal>
            Hide details
          </Button>
        ) : (
          <Button onClick={onClickShowDetails} minimal>
            Show details
          </Button>
        )}
      </FooterButton>
    </Tip>
  )
}
