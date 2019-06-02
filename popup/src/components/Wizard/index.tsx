import React, { useState } from "react"
import roka from "roka"
import Button from "../Button"

interface IProps {
  children: JSX.Element[]
  onComplete: () => void
}

const Container = roka().element()

export const Step = roka()
  .spacing({ outerBottom: "1.3rem" })
  .element("section")

export default ({ children, onComplete }: IProps) => {
  const [index, setIndex] = useState(0)
  const onClickNext = () => {
    if (index + 1 < children.length) {
      return onComplete()
    }

    setIndex(index + 1)
  }

  if (index + 1 === children.length) {
    return null
  }

  return (
    <Container>
      {children[index]}
      <Button onClick={onClickNext} primary>
        Next
      </Button>
    </Container>
  )
}
