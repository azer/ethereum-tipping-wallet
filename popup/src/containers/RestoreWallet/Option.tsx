import roka from "roka"

export interface IProps {
  selected: boolean
  onClick: () => void
}

export default roka()
  .border({ around: "1.5px solid #ddd" })
  .round("3px")
  .spacing({ inner: "1rem" })
  .center()
  .pointer()
  .select(":hover", roka().border({ color: "#007aff" }))
  .cond(
    ({ selected }: IProps) => selected,
    roka()
      .border({ color: "#007aff" })
      .set("font-weight", "600")
  )
  .element("div")
