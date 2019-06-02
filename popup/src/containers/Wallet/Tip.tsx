import React, { useEffect, useState } from "react"
import roka from "roka"
import { transferTips, IWallet } from "../../eth"
import TextField from "../../components/TextField"
import Callout from "../../components/Callout"
import FooterButton from "../../components/FooterButton"
import Button from "../../components/Button"
import { Buttons } from "../../components/Form"
import CopyButton from "../../components/CopyButton"
import { IMeta } from "../../tab"

const ADDRESS_LIMIT_CHAR = 20

interface IProps {
  balance: string
  wallet: IWallet
  meta: IMeta
  signout: () => void
  error?: Error
  setError: (error: Error) => void
  gasPrice: string
  gasLimit: string
}

const Tip = roka()
  .spacing({ innerTop: "2rem", innerBottom: "3rem" })
  .element("div")

const Header = roka()
  .absolute({ top: "0", left: "0" })
  .size({ width: "100%" })
  .mono({ size: "0.8rem", align: "center", uppercase: true })
  .spacing({ inner: "0.8rem" })
  .bg({ color: "#f2f2f2" })
  .fg("#999")
  .element("header")

const Profile = roka()
  .grid({ columns: "5rem auto" })
  .spacing({ columns: "0.5rem", outerBottom: "1rem" })
  .element("div")

const ProfileText = roka().element("section")
const ProfileTitle = roka()
  .fg("#333")
  .sans({ size: "1.4rem", weight: "600", height: "1.6rem" })
  .spacing({ outer: "0" })
  .element("h1")

const ProfileDesc = roka()
  .fg("#888")
  .sans({ size: "1.1rem", height: "1.3rem", weight: "400" })
  .spacing({ outer: "0.5rem 0 0 0" })
  .element("h2")

const Image = roka()
  .border({ around: "2px solid #007aff" })
  .spacing({ inner: "0.25rem" })
  .size({ width: "100%" })
  .round("100%")
  .element("img")

const Details = roka()
  .border({ top: "1px solid #eee" })
  .spacing({
    outerTop: "1rem",
    columns: "0.5rem",
    row: "0.75rem",
    innerTop: "1rem"
  })
  .set("display", "none")
  .sans({ size: "1rem", color: "#333" })
  .cond(
    ({ visible }: { visible: boolean }) => visible,
    roka().grid({ columns: "auto auto" })
  )
  .element("div")

const DetailLabel = roka()
  .sans({ weight: "600" })
  .element()

const DetailValue = roka().element()

const CurrencyLabel = roka()
  .sans({ size: "1rem", color: "#999" })
  .absolute({ right: "1rem", top: "0.9rem" })
  .element()

const Address = roka()
  .grid({ columns: "auto 3rem" })
  .spacing({ columns: "0.25rem" })
  .element()

const AddressValue = roka()
  .sans({ color: "#333" })
  .nooverflow()
  .element()

export default ({
  wallet,
  meta,
  error,
  balance,
  gasLimit,
  gasPrice,
  setError
}: IProps) => {
  const [amount, setAmount] = useState()
  const [transaction, setTransaction] = useState()
  const [inProgress, setInProgress] = useState()
  const [showDetails, setShowDetails] = useState()

  const onClickShowDetails = () => setShowDetails(true)
  const onClickHideDetails = () => setShowDetails(false)

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value)

  const onClickTip = async () => {
    setInProgress(true)
    const [response, err] = await transferTips(meta.address || "", amount)
    setInProgress(false)

    if (err) {
      return setError(err)
    }

    if (response.transaction) {
      setTransaction(response.transaction)
    }
  }

  useEffect(() => {
    if (meta && meta.recommendedAmount) {
      setAmount(meta.recommendedAmount)
    }
  }, [])

  return (
    <Tip>
      <Header>{meta.host} accepts tips!</Header>
      {error ? <Callout error={error.message} /> : null}
      {transaction ? (
        <Callout
          success={`Done! Hash: ${transaction.hash} Receipt: ${JSON.stringify(
            transaction.receipt
          )}`}
        />
      ) : null}
      <Profile>
        <Image src={meta.image} />
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
          {inProgress ? "Please wait..." : "Tip from balance"}
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

function formatBalance(balance: string): string {
  if (!balance) {
    return ""
  }

  return balance.slice(0, balance.length - 18)
}

function formatGasPrice(gas: string): string {
  if (!gas) {
    return ""
  }

  return gas.slice(0, gas.length - 19)
}

function formatAddress(address: string): string {
  if (!address.startsWith("0x")) {
    address = "0x" + address
  }

  return trim(address, ADDRESS_LIMIT_CHAR)
}

function trim(text: string, length: number): string {
  if (text.length <= length) {
    return text
  }

  return (
    text.slice(0, length / 2 - 1) +
    "..." +
    text.slice(text.length - (length / 2 - 2))
  )
}
