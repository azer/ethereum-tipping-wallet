import * as React from "react"
import roka from "roka"

interface IProps {
  children: JSX.Element | string
  onClick: () => void
  primary?: boolean
  minimal?: boolean
  disabled?: boolean
}

const Button = roka()
  .stretch()
  .nooutline()
  .color({ bg: "#fff", fg: "#222" })
  .spacing({ inner: "0.75rem 1rem" })
  .sans({ size: "1.1rem", weight: "400", height: "1.3" })
  .round("3px")
  .pointer()
  .border({ around: "1px solid #ddd" })
  .cond(
    (props: IProps) => props.primary || false,
    roka()
      .color({ bg: "#007aff", fg: "#fff" })
      .noborders()
  )
  .cond(
    (props: IProps) => props.minimal || false,
    roka()
      .sans({ size: "1rem", weight: "500" })
      .size({ width: "auto" })
      .spacing({ inner: "0", outer: "0" })
      .inlineBlock()
      .noborders()
  )
  .element("button")

export default (props: IProps) => <Button {...props}>{props.children}</Button>
