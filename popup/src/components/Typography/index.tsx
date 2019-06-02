import roka from "roka"

export const Heading = roka()
  .fg("#333")
  .sans({ size: "1.4rem", weight: "600", align: "center", height: "1.6rem" })
  .cond(
    ({ nospacing }: { nospacing?: boolean }) => !!nospacing,
    roka().spacing({ outer: "0" })
  )
  .element("h1")

export const Subheading = roka()
  .fg("#888")
  .sans({ size: "1.1rem", align: "center", height: "1.3rem", weight: "400" })
  .cond(
    ({ nospacing }: { nospacing?: boolean }) => !!nospacing,
    roka().spacing({ outer: "0" })
  )
  .element("h2")
