import React from "react"
import roka from "roka"

const Container = roka()
  .absolute({ bottom: "0px", left: "0px" })
  .size({ width: "100%" })
  .sans({ size: "1rem", align: "center" })
  .border({ top: "1px solid #eee" })
  .spacing({ inner: "1rem" })
  .fg("#666")
  .bg({ color: "#fafafa" })
  .element()

export default ({ children }: { children: Array<JSX.Element | string> }) => {
  return <Container>{children}</Container>
}
