import roka from "roka"
import React, { useState } from "react"

interface ICopyButton {
  value: string
}

const CopyButton = roka()
  .mono({ size: "1rem", uppercase: true, weight: "500", color: "#888" })
  .pointer()
  .element("div")

export default ({ value }: ICopyButton) => {
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return <CopyButton onClick={onClick}>{copied ? "Copied" : "Copy"}</CopyButton>
}
