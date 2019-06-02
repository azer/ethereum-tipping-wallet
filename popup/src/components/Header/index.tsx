import React from "react"
import roka from "roka"

import { Heading, Subheading } from "../Typography"

const HeadingContainer = roka()
  .grid({ columns: "auto" })
  .spacing({ row: "0.5rem", outer: "1.25rem 0" })
  .element("header")

export default function Header({
  title,
  desc
}: {
  title: string
  desc: string
}): JSX.Element {
  return (
    <HeadingContainer>
      <Heading nospacing>{title}</Heading>
      <Subheading nospacing>{desc}</Subheading>
    </HeadingContainer>
  )
}
